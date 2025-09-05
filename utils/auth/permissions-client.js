import { createClient } from '@/utils/supabase/client'
import { jwtDecode } from 'jwt-decode'

export const ROLES = {
  ADMIN: 'admin',
  CLIENT: 'client', 
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
 * Obtiene el usuario actual del lado del cliente
 */
export async function getCurrentUserClient() {
  const supabase = createClient()
  
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError || !session) {
      return { user: null, profile: null, role: null, error: 'No session found' }
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return { user: null, profile: null, role: null, error: 'User not found' }
    }

    // Obtener el perfil con relaciones de negocios
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select(`
        *,
        businesses(*),
        properties(*)
      `)
      .eq('id', user.id)
      .single()

    if (profileError) {
      return { 
        user: user, 
        profile: null, 
        role: null,
        error: 'Profile not found' 
      }
    }

    let userRole

    try {
      const jwt = jwtDecode(session.access_token)
      userRole = jwt.user_role || ROLES.USER
    } catch (jwtError) {
      console.warn('Could not decode JWT, using default role')
    }

    return {
      user: user,
      profile,
      role: userRole,
      error: null
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return { user: null, profile: null, role: null, error: error.message }
  }
}

/**
 * Verifica si un usuario tiene un permiso específico
 */
export function hasPermission(userRole, permission) {
  if (!userRole || !permission) return false
  
  const rolePermissions = ROLE_PERMISSIONS[userRole] || []
  return rolePermissions.includes(permission)
}

/**
 * Verifica si un usuario tiene un permiso específico usando BD
 */
export async function hasPermissionDB(permission) {
  const supabase = createClient()
  
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
 * Verifica si un cliente tiene acceso a un negocio específico
 */
export function hasBusinessAccess(userProfile, userRole, businessId) {
  if (!userProfile || !businessId) return false
  
  // Los admins tienen acceso a todos los negocios
  if (userRole === ROLES.ADMIN) return true
  
  // Los clientes solo tienen acceso a sus propios negocios
  if (userRole === ROLES.CLIENT) {
    return userProfile.businesses?.some(business => business.id === businessId)
  }
  
  return false
}

/**
 * Filtra los negocios a los que el usuario tiene acceso
 */
export function getAccessibleBusinesses(userProfile, userRole, allBusinesses) {
  if (!userProfile) return []
  
  // Los admins ven todos los negocios
  if (userRole === ROLES.ADMIN) {
    return allBusinesses
  }
  
  // Los clientes solo ven sus propios negocios
  if (userRole === ROLES.CLIENT) {
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