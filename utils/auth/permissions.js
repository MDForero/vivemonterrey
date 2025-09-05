import { createClient } from '@/utils/supabase/server'
import { jwtDecode } from 'jwt-decode'
import { redirect } from 'next/navigation'

export const ROLES = {
  ADMIN: 'admin',
  CLIENT: 'client', // Antes era 'businessman' 
  USER: 'user'
}

export const PERMISSIONS = {
  // Permisos de negocios (coinciden con DB)
  BUSINESSES_CREATE: 'businesses.create',
  BUSINESSES_READ: 'businesses.read',
  BUSINESSES_UPDATE: 'businesses.update',
  BUSINESSES_DELETE: 'businesses.delete',
  
  // Permisos de usuarios
  USERS_CREATE: 'users.create',
  USERS_READ: 'users.read',
  USERS_UPDATE: 'users.update',
  USERS_DELETE: 'users.delete',
  
  // Permisos de productos
  PRODUCTS_CREATE: 'products.create',
  PRODUCTS_READ: 'products.read',
  PRODUCTS_UPDATE: 'products.update',
  PRODUCTS_DELETE: 'products.delete',
  
  // Permisos de habitaciones
  ROOMS_CREATE: 'rooms.create',
  ROOMS_READ: 'rooms.read',
  ROOMS_UPDATE: 'rooms.update',
  ROOMS_DELETE: 'rooms.delete',
  
  // Permisos de propiedades
  PROPERTIES_CREATE: 'properties.create',
  PROPERTIES_READ: 'properties.read',
  PROPERTIES_UPDATE: 'properties.update',
  PROPERTIES_DELETE: 'properties.delete',
  
  // Permisos de eventos
  EVENTS_CREATE: 'events.create',
  EVENTS_READ: 'events.read',
  EVENTS_UPDATE: 'events.update',
  EVENTS_DELETE: 'events.delete'
}

// Definición de permisos por rol (coincide con DB)
export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    // Negocios
    PERMISSIONS.BUSINESSES_CREATE,
    PERMISSIONS.BUSINESSES_READ,
    PERMISSIONS.BUSINESSES_UPDATE,
    PERMISSIONS.BUSINESSES_DELETE,
    // Usuarios
    PERMISSIONS.USERS_CREATE,
    PERMISSIONS.USERS_READ,
    PERMISSIONS.USERS_UPDATE,
    PERMISSIONS.USERS_DELETE,
    // Productos
    PERMISSIONS.PRODUCTS_CREATE,
    PERMISSIONS.PRODUCTS_READ,
    PERMISSIONS.PRODUCTS_UPDATE,
    PERMISSIONS.PRODUCTS_DELETE,
    // Habitaciones
    PERMISSIONS.ROOMS_CREATE,
    PERMISSIONS.ROOMS_READ,
    PERMISSIONS.ROOMS_UPDATE,
    PERMISSIONS.ROOMS_DELETE,
    // Propiedades
    PERMISSIONS.PROPERTIES_CREATE,
    PERMISSIONS.PROPERTIES_READ,
    PERMISSIONS.PROPERTIES_UPDATE,
    PERMISSIONS.PROPERTIES_DELETE,
    // Eventos
    PERMISSIONS.EVENTS_CREATE,
    PERMISSIONS.EVENTS_READ,
    PERMISSIONS.EVENTS_UPDATE,
    PERMISSIONS.EVENTS_DELETE
  ],
  [ROLES.CLIENT]: [
    // Negocios (solo leer y actualizar)
    PERMISSIONS.BUSINESSES_READ,
    PERMISSIONS.BUSINESSES_UPDATE,
    // Productos
    PERMISSIONS.PRODUCTS_CREATE,
    PERMISSIONS.PRODUCTS_READ,
    PERMISSIONS.PRODUCTS_UPDATE,
    PERMISSIONS.PRODUCTS_DELETE,
    // Habitaciones
    PERMISSIONS.ROOMS_CREATE,
    PERMISSIONS.ROOMS_READ,
    PERMISSIONS.ROOMS_UPDATE,
    PERMISSIONS.ROOMS_DELETE,
    // Propiedades (solo leer y actualizar)
    PERMISSIONS.PROPERTIES_READ,
    PERMISSIONS.PROPERTIES_UPDATE,
    // Eventos
    PERMISSIONS.EVENTS_CREATE,
    PERMISSIONS.EVENTS_READ,
    PERMISSIONS.EVENTS_UPDATE,
    PERMISSIONS.EVENTS_DELETE
  ],
  [ROLES.USER]: [
    // Solo permisos de lectura
    PERMISSIONS.BUSINESSES_READ,
    PERMISSIONS.PRODUCTS_READ,
    PERMISSIONS.ROOMS_READ,
    PERMISSIONS.PROPERTIES_READ,
    PERMISSIONS.EVENTS_READ
  ]
}

/**
 * Obtiene el usuario actual y su información del perfil
 */
export async function getCurrentUser() {
  const supabase = await createClient()
  
  try {
    const { data: session, error: sessionError } = await supabase.auth.getSession()
    const { data: userData, error: userErrorC } = await supabase.auth.getUser()
    const { data: profileData, error: profileErrorC } = await supabase.from('user_roles').select('*').eq('user_id', userData?.user?.id).single()
    console.log(userData.user.id, 'user data',  profileErrorC, 'user data en getCurrentUser')

    if (sessionError || !session?.session) {
      return { user: null, profile: null, error: 'No session found' }
    }

    if(profileErrorC){
      console.log(profileErrorC, 'error al traer el perfil en getCurrentUser')
    }

    const jwt = jwtDecode(session.session.access_token)
    const userRole = jwt.user_role
    console.log(jwt , userRole, 'verificando que devuelve')

    const { data: user, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user?.user) {
      return { user: null, profile: null, error: 'User not found' }
    }
    
    // Obtener el perfil con relaciones de negocios
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select(`
        *,
        businesses(*),
        properties(*)
      `)
      .eq('id', user.user.id)
      .single()

    if (profileError) {
      return { 
        user: user.user, 
        profile: null, 
        role: userRole,
        error: null // No consideramos error el no tener perfil, solo que sea null
      }
    }

    return {
      user: user.user,
      profile,
      role: userRole,
      error: null
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return { user: null, profile: null, error: error.message }
  }
}

/**
 * Verifica si un usuario tiene un permiso específico (usando BD)
 */
export async function hasPermissionDB(permission) {
  const supabase = await createClient()
  
  try {
    const { data, error } = await supabase.rpc('authorize', {
      requested_permission: permission
    })
    
    if (error) {
      console.error('Error checking permission:', error)
      return false
    }
    
    return data === true
  } catch (error) {
    console.error('Error in hasPermissionDB:', error)
    return false
  }
}

/**
 * Verifica si un usuario tiene un permiso específico (usando roles locales)
 */
export function hasPermission(userRole, permission) {
  if (!userRole || !permission) return false
  
  const rolePermissions = ROLE_PERMISSIONS[userRole] || []
  return rolePermissions.includes(permission)
}

/**
 * Verifica si un cliente tiene acceso a un negocio específico
 */
export function hasBusinessAccess(userProfile, businessId) {
  if (!userProfile || !businessId) return false
  
  // Los admins tienen acceso a todos los negocios
  if (userProfile.role === ROLES.ADMIN) return true
  
  // Los clientes solo tienen acceso a sus propios negocios
  if (userProfile.role === ROLES.CLIENT) {
    return userProfile.businesses?.some(business => business.id === businessId)
  }
  
  return false
}

/**
 * Middleware para verificar autenticación y permisos
 */
export async function requireAuth(requiredPermissions = [], businessId = null) {
  const { user, profile, role, error } = await getCurrentUser()
  
  if (error || !user) {
    redirect('/login')
  }
  
  // Verificar permisos requeridos
  if (requiredPermissions.length > 0) {
    const hasAllPermissions = requiredPermissions.every(permission => 
      hasPermission(role, permission)
    )
    
    if (!hasAllPermissions) {
      redirect('/unauthorized')
    }
  }
  
  // Verificar acceso al negocio específico si se proporciona
  if (businessId && !hasBusinessAccess({ ...profile, role }, businessId)) {
    redirect('/unauthorized')
  }
  
  return { user, profile, role }
}

/**
 * Filtra los negocios a los que el usuario tiene acceso
 */
export function getAccessibleBusinesses(userProfile, allBusinesses) {
  if (!userProfile) return []
  
  // Los admins ven todos los negocios
  if (userProfile.role === ROLES.ADMIN) {
    return allBusinesses
  }
  
  // Los clientes solo ven sus propios negocios
  if (userProfile.role === ROLES.CLIENT) {
    const userBusinessIds = userProfile.businesses?.map(b => b.id) || []
    return allBusinesses.filter(business => userBusinessIds.includes(business.id))
  }
  
  return []
}

/**
 * Hook para verificar permisos en el lado del cliente
 */
export function checkClientPermission(userRole, permission) {
  return hasPermission(userRole, permission)
}