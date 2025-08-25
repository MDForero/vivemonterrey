'use client'
import { useEffect, useState } from 'react'

export default function PWAInstallPrompt() {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Detectar si ya está instalada la PWA
    const checkIfInstalled = () => {
      // Método 1: Verificar si está en modo standalone
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      
      // Método 2: Verificar propiedades específicas del navegador
      const isIOSStandalone = window.navigator?.standalone === true
      
      // Método 3: Verificar user agent para apps instaladas
      const isAndroidApp = window.navigator?.userAgent?.includes('wv')
      
      return isStandalone || isIOSStandalone || isAndroidApp
    }

    const installed = checkIfInstalled()
    setIsInstalled(installed)

    // Si no está instalada, configurar el prompt
    if (!installed) {
      // Escuchar el evento beforeinstallprompt
      const handleBeforeInstallPrompt = (e) => {
        e.preventDefault()
        setDeferredPrompt(e)
        
        // Esperar un poco antes de mostrar el prompt para mejor UX
        setTimeout(() => {
          setShowInstallPrompt(true)
        }, 3000)
      }

      // Verificar si el dispositivo soporta PWA
      if ('serviceWorker' in navigator && 'beforeinstallprompt' in window) {
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      }

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
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
    setShowInstallPrompt(false)
    // Opcional: guardar en localStorage que el usuario rechazó para no mostrar de nuevo
    localStorage.setItem('pwa-install-dismissed', Date.now().toString())
  }

  // No mostrar nada si ya está instalada o no hay prompt disponible
  if (isInstalled || !showInstallPrompt) {
    return null
  }

  return (
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
                onClick={handleInstallClick}
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
  )
}