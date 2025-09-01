import { createClient } from '@/utils/supabase/server'
import { jwtDecode } from 'jwt-decode'
import { redirect } from 'next/navigation'

export const ROLES = {
  ADMIN: 'admin',
  CLIENT: 'client', // Antes era 'businessman' 
  USER: 'user'
}

export const PERMISSIONS = {
  // Permisos generales
  ACCESS_DASHBOARD: 'access_dashboard',
  VIEW_ALL_BUSINESSES: 'view_all_businesses',
  CREATE_BUSINESS: 'create_business',
  
  // Permisos específicos de negocio
  VIEW_BUSINESS: 'view_business',
  EDIT_BUSINESS: 'edit_business',
  DELETE_BUSINESS: 'delete_business',
  
  // Permisos de productos/habitaciones
  VIEW_PRODUCTS: 'view_products',
  CREATE_PRODUCTS: 'create_products',
  EDIT_PRODUCTS: 'edit_products',
  DELETE_PRODUCTS: 'delete_products',
  
  // Permisos de códigos QR
  VIEW_QR_CODES: 'view_qr_codes',
  GENERATE_QR_CODES: 'generate_qr_codes',
  EDIT_QR_CODES: 'edit_qr_codes',
  
  // Permisos de gestión de usuarios
  MANAGE_USERS: 'manage_users'
}

// Definición de permisos por rol
export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    PERMISSIONS.ACCESS_DASHBOARD,
    PERMISSIONS.VIEW_ALL_BUSINESSES,
    PERMISSIONS.CREATE_BUSINESS,
    PERMISSIONS.VIEW_BUSINESS,
    PERMISSIONS.EDIT_BUSINESS,
    PERMISSIONS.DELETE_BUSINESS,
    PERMISSIONS.VIEW_PRODUCTS,
    PERMISSIONS.CREATE_PRODUCTS,
    PERMISSIONS.EDIT_PRODUCTS,
    PERMISSIONS.DELETE_PRODUCTS,
    PERMISSIONS.VIEW_QR_CODES,
    PERMISSIONS.GENERATE_QR_CODES,
    PERMISSIONS.EDIT_QR_CODES,
    PERMISSIONS.MANAGE_USERS
  ],
  [ROLES.CLIENT]: [
    PERMISSIONS.ACCESS_DASHBOARD,
    PERMISSIONS.VIEW_BUSINESS,
    PERMISSIONS.EDIT_BUSINESS,
    PERMISSIONS.VIEW_PRODUCTS,
    PERMISSIONS.CREATE_PRODUCTS,
    PERMISSIONS.EDIT_PRODUCTS,
    PERMISSIONS.DELETE_PRODUCTS,
    PERMISSIONS.VIEW_QR_CODES,
    PERMISSIONS.GENERATE_QR_CODES,
    PERMISSIONS.EDIT_QR_CODES
  ],
  [ROLES.USER]: [
    // Permisos básicos para usuarios regulares (futura implementación)
  ]
}

/**
 * Obtiene el usuario actual y su información del perfil
 */
export async function getCurrentUser() {
  const supabase = createClient()
  
  try {
    const { data: session, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError || !session?.session) {
      return { user: null, profile: null, error: 'No session found' }
    }

    const jwt = jwtDecode(session.session.access_token)
    const userRole = jwt.user_role

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
        error: 'Profile not found' 
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
 * Verifica si un usuario tiene un permiso específico
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