import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

// Función para detectar tipo de dispositivo
function getDeviceType(userAgent) {
  if (!userAgent) return 'unknown'
  
  const ua = userAgent.toLowerCase()
  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
    return 'mobile'
  } else if (ua.includes('tablet') || ua.includes('ipad')) {
    return 'tablet'
  }
  return 'desktop'
}

// Función para extraer navegador
function getBrowser(userAgent) {
  if (!userAgent) return 'unknown'
  
  const ua = userAgent.toLowerCase()
  if (ua.includes('chrome')) return 'Chrome'
  if (ua.includes('firefox')) return 'Firefox'
  if (ua.includes('safari')) return 'Safari'
  if (ua.includes('edge')) return 'Edge'
  if (ua.includes('opera')) return 'Opera'
  return 'Other'
}

// Función simple para obtener geolocalización por IP (opcional)
async function getLocationByIP(ip) {
  try {
    // Usando un servicio gratuito como ipapi.co o ip-api.com
    const response = await fetch(`https://ipapi.co/${ip}/json/`)
    if (response.ok) {
      const data = await response.json()
      return {
        country: data.country_code || null,
        city: data.city || null
      }
    }
  } catch (error) {
    console.error('Error getting location:', error)
  }
  return { country: null, city: null }
}

// Función para generar fingerprint simple
function generateFingerprint(ip, userAgent) {
  const crypto = require('crypto')
  return crypto.createHash('sha256').update(`${ip}${userAgent}`).digest('hex').substring(0, 32)
}

export async function GET(request, { params }) {
  const supabase = createClient()
  const { code } = params
  
  try {
    // Obtener información del QR
    const { data: qrCode, error: qrError } = await supabase
      .from('qr_codes')
      .select('*')
      .eq('code', code)
      .eq('is_active', true)
      .single()

    if (qrError || !qrCode) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Obtener información del request
    const headersList = headers()
    const userAgent = headersList.get('user-agent') || ''
    const referer = headersList.get('referer') || ''
    const forwarded = headersList.get('x-forwarded-for')
    const realIp = headersList.get('x-real-ip')
    
    // Extraer IP del cliente
    let clientIp = forwarded?.split(',')[0] || realIp || '127.0.0.1'
    clientIp = clientIp.trim()

    // Obtener parámetros UTM de la URL
    const url = new URL(request.url)
    const utmSource = url.searchParams.get('utm_source')
    const utmMedium = url.searchParams.get('utm_medium') 
    const utmCampaign = url.searchParams.get('utm_campaign')

    // Detectar información del dispositivo
    const deviceType = getDeviceType(userAgent)
    const browser = getBrowser(userAgent)
    const fingerprint = generateFingerprint(clientIp, userAgent)

    // Obtener geolocalización (opcional y asíncrono)
    let location = { country: null, city: null }
    try {
      location = await getLocationByIP(clientIp)
    } catch (error) {
      console.error('Location detection failed:', error)
    }

    // Registrar el escaneo en la base de datos
    const scanData = {
      qr_code_id: qrCode.id,
      ip_address: clientIp,
      user_agent: userAgent,
      referer: referer || null,
      device_type: deviceType,
      browser: browser,
      country: location.country,
      city: location.city,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      fingerprint: fingerprint,
      metadata: {
        full_url: request.url,
        timestamp: new Date().toISOString()
      }
    }

    // Insertar escaneo (el trigger actualizará automáticamente el contador en qr_codes)
    const { error: scanError } = await supabase
      .from('qr_scans')
      .insert(scanData)


    if (scanError ) {
      console.error('Error inserting scan:', scanError)
      // Continuar con la redirección aunque falle el tracking
    }
    if (addNewScanError) {
      console.error('Error updating scan count:', addNewScanError)
    }

    // Construir URL de destino con parámetros UTM si existen
    let targetUrl = qrCode.target_url
    
    // Agregar parámetros UTM a la URL de destino si no los tiene
    if (utmSource || utmMedium || utmCampaign) {
      const targetUrlObj = new URL(targetUrl)
      
      if (utmSource && !targetUrlObj.searchParams.has('utm_source')) {
        targetUrlObj.searchParams.set('utm_source', utmSource)
      }
      if (utmMedium && !targetUrlObj.searchParams.has('utm_medium')) {
        targetUrlObj.searchParams.set('utm_medium', utmMedium)
      }
      if (utmCampaign && !targetUrlObj.searchParams.has('utm_campaign')) {
        targetUrlObj.searchParams.set('utm_campaign', utmCampaign)
      }
      
      targetUrl = targetUrlObj.toString()
    }

    // Redireccionar al destino final
    return NextResponse.redirect(targetUrl)

  } catch (error) {
    console.error('QR redirect error:', error)
    // En caso de error, redireccionar al home
    return NextResponse.redirect(new URL('/', request.url))
  }
}

// También manejar POST para casos específicos
export async function POST(request, { params }) {
  // Redirigir POST requests como GET
  return GET(request, { params })
}