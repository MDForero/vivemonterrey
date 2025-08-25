'use client'
import { useEffect, useState } from 'react'

export default function PWAInstallPrompt() {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [debugInfo, setDebugInfo] = useState('')
  const [show, setShow] = useState(true)

  useEffect(() => {
    // Detectar si ya está instalada la PWA
    const checkIfInstalled = () => {
      // Método 1: Verificar si está en modo standalone
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      
      // Método 2: Verificar propiedades específicas del navegador
      const isIOSStandalone = window.navigator?.standalone === true
      
      // Método 3: Verificar user agent para apps instaladas
      const isAndroidApp = window.navigator?.userAgent?.includes('wv')
      
      console.log('PWA Debug:', { isStandalone, isIOSStandalone, isAndroidApp })
      
      return isStandalone || isIOSStandalone || isAndroidApp
    }

    const installed = checkIfInstalled()
    setIsInstalled(installed)
    console.log('PWA ya instalada:', installed)

    // Si no está instalada, configurar el prompt
    if (!installed) {
      // Verificar si ya fue rechazado recientemente
      const dismissed = localStorage.getItem('pwa-install-dismissed')
      const now = Date.now()
      const oneDayAgo = now - (24 * 60 * 60 * 1000) // 24 horas
      
      if (dismissed && parseInt(dismissed) > oneDayAgo) {
        console.log('PWA prompt ya fue rechazado recientemente')
        setDebugInfo('Prompt rechazado recientemente')
        return
      }

      // Escuchar el evento beforeinstallprompt
      const handleBeforeInstallPrompt = (e) => {
        console.log('beforeinstallprompt event triggered', e)
        e.preventDefault()
        setDeferredPrompt(e)
        setDebugInfo('Evento beforeinstallprompt detectado')
        
        // Esperar un poco antes de mostrar el prompt para mejor UX
        setTimeout(() => {
          console.log('Mostrando prompt PWA')
          setShowInstallPrompt(true)
        }, 3000)
      }

      // Debug info
      const hasServiceWorker = 'serviceWorker' in navigator
      const hasBeforeInstallPrompt = 'beforeinstallprompt' in window
      const userAgent = navigator.userAgent
      
      console.log('PWA Capabilities:', {
        hasServiceWorker,
        hasBeforeInstallPrompt,
        userAgent: userAgent.substring(0, 50) + '...'
      })
      
      setDebugInfo(`SW: ${hasServiceWorker}, BIP: ${hasBeforeInstallPrompt}`)

      // Agregar listener para el evento
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      
      // También mostrar prompt manual después de 5 segundos si no hay evento automático
      const fallbackTimer = setTimeout(() => {
        if (!deferredPrompt && hasServiceWorker) {
          console.log('Mostrando prompt manual (fallback)')
          setDebugInfo('Usando fallback - no se detectó evento automático')
          setShowInstallPrompt(true)
        }
      }, 5000)

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        clearTimeout(fallbackTimer)
      }
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    try {
      // Mostrar el prompt de instalación
      deferredPrompt.prompt()
      
      // Esperar la respuesta del usuario
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        console.log('Usuario aceptó instalar la PWA')
      } else {
        console.log('Usuario rechazó instalar la PWA')
      }
      
      // Limpiar el prompt diferido
      setDeferredPrompt(null)
      setShowInstallPrompt(false)
    } catch (error) {
      console.error('Error al mostrar prompt de instalación:', error)
    }
  }

  const handleDismiss = () => {
    setShow(false)
    setShowInstallPrompt(true)

    // Guardar en localStorage que el usuario rechazó para no mostrar de nuevo
    localStorage.setItem('pwa-install-dismissed', Date.now().toString())
  }

  const handleManualInstall = () => {
    // Para navegadores que no soportan el evento automático
    if (deferredPrompt) {
      handleInstallClick()
    } else {
      // Instrucciones manuales
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
      const isAndroid = /Android/.test(navigator.userAgent)
      
      let instructions = ''
      if (isIOS) {
        instructions = 'En Safari: toca el botón "Compartir" y luego "Añadir a pantalla de inicio"'
      } else if (isAndroid) {
        instructions = 'En Chrome: toca el menú (⋮) y selecciona "Instalar app" o "Añadir a pantalla de inicio"'
      } else {
        instructions = 'En tu navegador: busca la opción "Instalar" o "Añadir a pantalla de inicio" en el menú'
      }
      
      alert(`Para instalar la app:\n\n${instructions}`)
    }
  }

  // Mostrar información de debug en desarrollo
  const isDev = process.env.NODE_ENV === 'development'
  console.log(isDev, 'isDev', showInstallPrompt, 'showInstallPrompt', isInstalled, 'isInstalled') 

  // No mostrar nada si ya está instalada
  if (isInstalled) {
    return null
  }

  // Mostrar prompt si está disponible O como fallback
    if (!showInstallPrompt && !isDev) {
      return null
    }

  if(!show){
    return null
  } else
  {  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:max-w-sm">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900">
              ¡Instala Vive Monterrey!
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              Accede más rápido desde tu pantalla de inicio y disfruta de una mejor experiencia.
            </p>
            
            <div className="flex space-x-2 mt-3">
              <button
                onClick={handleManualInstall}
                className="bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-3 py-1.5 rounded transition-colors"
              >
                Instalar
              </button>
              <button
                onClick={handleDismiss}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded transition-colors"
              >
                Ahora no
              </button>
            </div>
            {isDev && (
              <div className="mt-2 text-xs text-gray-500">
                Debug: {debugInfo}
              </div>
            )}
          </div>
          
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )}
}