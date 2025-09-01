'use client'
import QRCodeStyling from 'qr-code-styling'
import { use, useEffect, useRef, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { LucideDownload } from 'lucide-react'

export default function QrCodeGenerator({ code, name, size = 300 , businessId}) {
  console.log('QrCodeGenerator rendered with props:', { code, name, size, businessId })
  const ref = useRef(null)
  const [qrCode, setQrCode] = useState(null)
  const [qrCodeImage, setQrCodeImage] = useState(null)
  const [businessLogo, setBusinessLogo] = useState(null)

  const [isLoaded, setIsLoaded] = useState(false)

  const qrUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/qr/${code}`

  useEffect(() => {
    const getBusinessLogo = async () => {
      if (!businessId) return
      const supabase = createClient()
      const { data: business, error } = await supabase
        .from('businesses')
        .select('logo')
        .eq('id', businessId)
        .single()
      if (error) {
        console.log('QrCodeGenerator: Error fetching business logo:', error)
      } else if (business && business.logo) {
        setBusinessLogo(business.logo)
        console.log('QrCodeGenerator: Business logo fetched:', business.logo)
      }
    }
    getBusinessLogo()
  }, [businessId])

  useEffect(() => {
    const getImage = async () => {
      if (!businessLogo) return
      const supabase = createClient()
      const { data, error } = await supabase.storage.from('banners').download(businessLogo)
      if (error) {
        console.log('QrCodeGenerator: Error downloading logo from storage:', error)
      } else {
        setQrCodeImage(URL.createObjectURL(data))
        console.log('QrCodeGenerator: Logo image set for QR code')
      }
    }
    if (businessLogo) getImage()
  }, [businessLogo])




  useEffect(() => {
    
    if (!qrCodeImage) return

    setQrCode(new QRCodeStyling({
      width: size,
      height: size,
      type: 'svg',
      data: qrUrl,
      image: qrCodeImage,
      dotsOptions: {
        color: '#2C5F2D',
        type: 'rounded'
      },
      backgroundOptions: {
        color: '#FFFFFF',
      },
      cornersSquareOptions: {
        color: '#97BC62',
        type: 'extra-rounded'
      },
      cornersDotOptions: {
        color: '#2C5F2D'
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 10,
        imageSize: 0.4
      }
    }))
  }, [code, size, qrCodeImage])

  // useEffect(() => {
  //   const getImage = async () => {
  //     const { data, error } = await supabase.storage.from('banners').download(logo)
  //     if (error) {
  //       console.log(error)
  //     } else {
  //       setQrCodeImage(URL.createObjectURL(data))
  //     }
  //     console.log(value)
  //   }
  //   if (logo) getImage()
  // }, [])


  const downloadQR = (extension) => {
    console.log(`QrCodeGenerator: Downloading QR as ${extension}`, qrCode)
    if (qrCode) {
      qrCode?.download({
        name: `qr-${name}`,
        extension: extension
      })
      console.log('QrCodeGenerator: Download initiated')
    }
  }
  if (qrCode && ref.current && !isLoaded) {
    qrCode.append(ref.current)
    setIsLoaded(true)
    console.log('QrCodeGenerator: QR code appended to DOM')
  }

  if (!code) {
    return <div className="text-red-500">Error: No se proporcionó ningún código para generar el QR.</div>
  } else {

    return (
      <div className="flex flex-col items-center gap-3">
        <div ref={ref} className='mx-auto w-fit' />
        <div className="flex gap-2">
          <button
            onClick={() => downloadQR('svg')}
            className="px-2 py-1 flex gap-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >  <LucideDownload /> SVG

          </button>
          <button
            onClick={() => downloadQR('png')}
            className="px-2 py-1 flex gap-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            <LucideDownload /> PNG
          </button>
          <button
            onClick={() => downloadQR('jpeg')}
            className="px-2 py-1 flex gap-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            <LucideDownload /> JPEG
          </button>
        </div>
      </div>
    )
  }
}