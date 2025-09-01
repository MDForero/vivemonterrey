'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import QrCodeGenerator from '@/components/QrCodeGenerator'
import { getCurrentUserClient, ROLES, hasPermission, PERMISSIONS, getAccessibleBusinesses } from '@/utils/auth/permissions-client'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function QRAdminPanel() {
  const [qrCodes, setQrCodes] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [newUrl, setNewUrl] = useState('')
  const [showGenerator, setShowGenerator] = useState({})
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    target_url: '',
    business_id: '',
    business_name: '',
    metadata: {}
  })

  // Estados para autenticación y permisos
  const [currentUser, setCurrentUser] = useState(null)
  const [userBusinesses, setUserBusinesses] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Estados para búsqueda de negocios (solo para admins)
  const [businessQuery, setBusinessQuery] = useState('')
  const [businessResults, setBusinessResults] = useState([])
  const [showBusinessResults, setShowBusinessResults] = useState(false)
  const [selectedBusiness, setSelectedBusiness] = useState(null)

  const supabase = createClient()
  const router = useRouter()
  const searchParams = useSearchParams()
  const businessParam = searchParams.get('business')

  // Verificar autenticación y permisos al cargar
  useEffect(() => {
    checkAuthAndPermissions()
  }, [])

  // Cargar QR codes cuando el usuario está verificado
  useEffect(() => {
    if (currentUser && !loading) {
      fetchQRCodes()
    }
  }, [currentUser, loading])

  // Efecto para manejar el parámetro de negocio en la URL
  useEffect(() => {
    if (businessParam && currentUser?.role === ROLES.CLIENT) {
      // Verificar que el cliente tenga acceso a este negocio
      const hasAccess = userBusinesses.some(b => b.id === businessParam)
      if (hasAccess) {
        const business = userBusinesses.find(b => b.id === businessParam)
        if (business) {
          setSelectedBusiness(business)
          setFormData(prev => ({
            ...prev,
            business_id: business.id,
            business_name: business.name
          }))
          setBusinessQuery(business.name)
        }
      }
    }
  }, [businessParam, currentUser, userBusinesses])

  const checkAuthAndPermissions = async () => {
    try {
      const { user, profile, role, error } = await getCurrentUserClient()
      
      if (error || !user) {
        router.push('/login')
        return
      }

      // Verificar permisos para ver códigos QR
      if (!hasPermission(role, PERMISSIONS.VIEW_QR_CODES)) {
        router.push('/unauthorized')
        return
      }

      setCurrentUser({ user, profile, role })
      
      // Para clientes, establecer sus negocios
      if (role === ROLES.CLIENT) {
        setUserBusinesses(profile.businesses || [])
        // Si solo tienen un negocio, seleccionarlo automáticamente
        if (profile.businesses?.length === 1) {
          const business = profile.businesses[0]
          setSelectedBusiness(business)
          setFormData(prev => ({
            ...prev,
            business_id: business.id,
            business_name: business.name
          }))
          setBusinessQuery(business.name)
        }
      }
      
      setLoading(false)
    } catch (error) {
      console.error('Error checking auth:', error)
      router.push('/login')
    }
  }

  // Cerrar resultados cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = () => {
      setShowBusinessResults(false)
    }

    if (showBusinessResults) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [showBusinessResults])

  const fetchQRCodes = async () => {
    if (!currentUser) return

    let query = supabase
      .from('qr_codes')
      .select(`
        *,
        businesses(id, name, categories(name)),
        qr_scan_counts(scan_count)
      `)

    // Filtrar por negocio según el rol del usuario
    if (currentUser.role === ROLES.CLIENT) {
      // Los clientes solo ven QRs de sus negocios
      const businessIds = userBusinesses.map(b => b.id)
      if (businessIds.length > 0) {
        query = query.in('business_id', businessIds)
      } else {
        // Si no tienen negocios, no mostrar nada
        setQrCodes([])
        return
      }
    }else if (currentUser.role === ROLES.ADMIN) {
      // Los administradores ven todos los QRs
      // (opcionalmente se podría filtrar por un negocio específico si se desea)
      const businessIds = userBusinesses.map(b => b.id)
      if (businessIds.length > 0) {
        query = query.in('business_id', businessIds)
      }
    }else{
      // Los usuarios normales no ven ningún QR
      setQrCodes([])
      return
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (data) {
      setQrCodes(data)
    }
    if (error) {
      console.error('Error:', error)
    }
  }

  // Función para buscar negocios (solo para admins)
  const searchBusinesses = async (query) => {
    if (!query || query.trim().length < 2 || currentUser?.role !== ROLES.ADMIN) {
      setBusinessResults([])
      setShowBusinessResults(false)
      return
    }

    const { data, error } = await supabase
      .from('businesses')
      .select('id, name, categories(name)')
      .ilike('name', `%${query}%`)
      .order('name', { ascending: true })
      .limit(10)

    if (data) {
      setBusinessResults(data)
      setShowBusinessResults(true)
    }
    if (error) {
      console.error('Error searching businesses:', error)
    }
  }

  // Manejar cambios en el input de búsqueda de negocios
  const handleBusinessQueryChange = (value) => {
    setBusinessQuery(value)
    setSelectedBusiness(null)
    setFormData({ ...formData, business_id: '', business_name: '' })

    // Debounce la búsqueda
    clearTimeout(window.businessSearchTimeout)
    window.businessSearchTimeout = setTimeout(() => {
      searchBusinesses(value)
    }, 300)
  }

  // Seleccionar un negocio de los resultados
  const selectBusiness = (business) => {
    setSelectedBusiness(business)
    setBusinessQuery(business.name)
    setFormData({
      ...formData,
      business_id: business.id,
      business_name: business.name
    })
    setShowBusinessResults(false)
  }

  const updateQRUrl = async (id) => {
    const { error } = await supabase
      .from('qr_codes')
      .update({ target_url: newUrl })
      .eq('id', id)

    if (!error) {
      fetchQRCodes()
      setEditingId(null)
      setNewUrl('')
      alert('URL actualizada correctamente')
    } else {
      alert('Error al actualizar URL')
    }
  }

  const createNewQR = async (e) => {
    e.preventDefault()

    // Validar que se haya seleccionado un negocio
    if (!formData.business_id) {
      alert('Por favor selecciona un negocio válido')
      return
    }

    // Generar código único si no se proporciona
    const finalCode = formData.code ||
      formData.business_name.toLowerCase().replace(/\s+/g, '-') +
      '-' + Date.now().toString(36)

    const { error } = await supabase
      .from('qr_codes')
      .insert({
        code: finalCode.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
        name: formData.name,
        target_url: formData.target_url,
        business_id: formData.business_id,
        metadata: formData.metadata
      })

    if (!error) {
      fetchQRCodes()
      setFormData({
        code: '',
        name: '',
        target_url: '',
        business_id: '',
        business_name: '',
        metadata: {}
      })
      setBusinessQuery('')
      setSelectedBusiness(null)
      setShowBusinessResults(false)
      alert('QR creado exitosamente')
    } else {
      alert('Error al crear QR: ' + error.message)
    }
  }

  const toggleQRStatus = async (id, currentStatus) => {
    const { error } = await supabase
      .from('qr_codes')
      .update({ is_active: !currentStatus })
      .eq('id', id)

    if (!error) {
      fetchQRCodes()
    }
  }

  const deleteQR = async (id) => {
    if (confirm('¿Estás seguro de eliminar este QR?')) {
      const { error } = await supabase
        .from('qr_codes')
        .delete()
        .eq('id', id)

      if (!error) {
        fetchQRCodes()
      }
    }
  }

  console.log(qrCodes)

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Gestión de QR Dinámicos - Vive Monterrey
      </h1>

      {/* Formulario para nuevo QR */}
      <form
        onSubmit={createNewQR}
        className="bg-white p-6 rounded-lg shadow-lg mb-8"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Crear Nuevo QR
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Nombre descriptivo"
            className="border border-gray-300 p-3 rounded focus:outline-none focus:border-green-500"
            required
          />

          {/* Buscador de negocios */}
          <div className="relative md:col-span-2" onClick={(e) => e.stopPropagation()}>
            <input
              value={businessQuery}
              onChange={(e) => handleBusinessQueryChange(e.target.value)}
              placeholder="Buscar negocio..."
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-green-500"
              required
            />
            {selectedBusiness && (
              <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                <span className="text-green-800 font-medium">
                  ✓ Seleccionado: {selectedBusiness.name}
                  {selectedBusiness.categories && (
                    <span className="text-green-600 text-sm ml-2">
                      ({selectedBusiness.categories.name})
                    </span>
                  )}
                </span>
              </div>
            )}

            {/* Resultados de búsqueda */}
            {showBusinessResults && businessResults.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {businessResults.map((business) => (
                  <div
                    key={business.id}
                    onClick={() => selectBusiness(business)}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <div className="font-medium text-gray-900">{business.name}</div>
                    {business.categories && (
                      <div className="text-sm text-gray-500">{business.categories.name}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <input
            value={formData.target_url}
            onChange={(e) => setFormData({ ...formData, target_url: e.target.value })}
            placeholder="URL de destino"
            className="border border-gray-300 p-3 rounded focus:outline-none focus:border-green-500 md:col-span-2"
            type="url"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
        >
          Crear QR
        </button>
      </form>

      {/* Lista de QRs existentes */}
      <div className="grid gap-6">
        {qrCodes.map((qr) => (
          <div
            key={qr.id}
            className={`bg-white p-6 rounded-lg shadow-lg ${!qr.is_active ? 'opacity-60' : ''}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Información del QR */}
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {qr.name}
                </h3>
                <p className="text-gray-600">
                  {qr.businesses ? qr.businesses.name : 'Negocio no encontrado'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Código: <code className="bg-gray-100 px-2 py-1 rounded">{qr.code}</code>
                </p>
                <p className="text-sm text-gray-500">
                  Categoría: {qr.businesses?.categories[0].name || 'Sin categoría'}
                </p>
                <div className="mt-3 space-y-1">
                  <p className="text-sm font-medium">
                    📊 Escaneos: <span className="text-green-600">{qr.qr_scan_counts?.scan_count|| 0}</span>
                  </p>
                  <p className="text-sm">
                    Estado:
                    <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${qr.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                      {qr.is_active ? 'Activo' : 'Inactivo'}
                    </span>
                  </p>
                </div>
              </div>

              {/* URL y Edición */}
              <div>
                {editingId === qr.id ? (
                  <div className="space-y-2">
                    <input
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      placeholder="Nueva URL"
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateQRUrl(qr.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null)
                          setNewUrl('')
                        }}
                        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-700 break-all bg-gray-50 p-2 rounded">
                      {qr.target_url}
                    </p>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(qr.id)
                          setNewUrl(qr.target_url)
                        }}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        ✏️ Editar URL
                      </button>
                      <button
                        onClick={() => toggleQRStatus(qr.id, qr.is_active)}
                        className={`text-sm ${qr.is_active ? 'text-orange-600' : 'text-green-600'
                          } hover:underline`}
                      >
                        {qr.is_active ? '⏸️ Pausar' : '▶️ Activar'}
                      </button>
                      <button
                        onClick={() => deleteQR(qr.id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Generador QR */}
              <div className="flex flex-col items-center">
                  
                    <QrCodeGenerator
                      code={qr.code}
                      name={qr.name}
                      size={200}
                      businessId={qr.business_id}
                    />

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 
