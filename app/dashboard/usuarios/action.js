'use server'

import { createClient } from '@/utils/supabase/server'
import { getCurrentUser, hasPermission, PERMISSIONS } from '@/utils/auth/permissions'
import { revalidatePath } from 'next/cache'

export async function updateUserRole(userId, newRole) {
  try {
    // Verificar que el usuario actual tiene permisos para gestionar usuarios
    const { user, role, error } = await getCurrentUser()
    
    if (error || !user) {
      return { error: 'No autorizado' }
    }

    if (!hasPermission(role, PERMISSIONS.USERS_UPDATE)) {
      return { error: 'No tienes permisos para gestionar usuarios' }
    }

    const supabase = createClient()

    // Usar la función de la base de datos para cambiar el rol
    const { data, error: roleError } = await supabase.rpc('change_user_role', {
      target_user_id: userId,
      new_role: newRole
    })

    if (roleError) {
      console.error('Error changing user role:', roleError)
      return { error: roleError.message || 'Error al cambiar rol' }
    }

    // Revalidar la página para actualizar los datos
    revalidatePath('/dashboard/usuarios')
    
    return { success: true, message: `Rol ${newRole} asignado correctamente` }
  } catch (error) {
    console.error('Unexpected error in updateUserRole:', error)
    return { error: 'Error inesperado al actualizar rol' }
  }
}

export async function getAllUsers() {
  try {
    // Verificar permisos
    const { user, role, error } = await getCurrentUser()
    
    if (error || !user) {
      return { error: 'No autorizado' }
    }

    if (!hasPermission(role, PERMISSIONS.USERS_READ)) {
      console.log(role, PERMISSIONS.USERS_READ, !hasPermission(role, PERMISSIONS.USERS_READ))
      return { error: 'No tienes permisos para ver todos los usuarios' }
    }

    const supabase = createClient()

    // Usar la función de la base de datos para obtener usuarios con roles
    const { data: users, error: usersError } = await supabase.rpc('get_users_with_roles')

    if (usersError) {
      console.error('Error fetching users with roles:', usersError)
      return { error: usersError.message || 'Error al obtener usuarios' }
    }

    // Mapear los datos para que coincidan con el formato esperado por el frontend
    const formattedUsers = users.map(user => ({
      id: user.user_id,
      email: user.email,
      full_name: user.full_name || user.email,
      username: user.email?.split('@')[0] || 'usuario',
      role: user.role,
      created_at: user.created_at,
      last_sign_in_at: user.last_sign_in_at,
      avatar: null // Los avatares se manejarán posteriormente si es necesario
    }))

    return { users: formattedUsers, error: null }
  } catch (error) {
    console.error('Unexpected error in getAllUsers:', error)
    return { error: 'Error inesperado al obtener usuarios' }
  }
}

export async function deleteUser(userId) {
  try {
    // Verificar permisos
    const { user, role, error } = await getCurrentUser()
    
    if (error || !user) {
      return { error: 'No autorizado' }
    }

    if (!hasPermission(role, PERMISSIONS.USERS_DELETE)) {
      return { error: 'No tienes permisos para eliminar usuarios' }
    }

    const supabase = createClient()

    // Usar la función de la base de datos para eliminar usuario
    const { data, error: deleteError } = await supabase.rpc('delete_user_account', {
      target_user_id: userId
    })

    if (deleteError) {
      console.error('Error deleting user:', deleteError)
      return { error: deleteError.message || 'Error al eliminar usuario' }
    }
    
    revalidatePath('/dashboard/usuarios')
    
    return { success: true, message: 'Usuario eliminado correctamente' }
  } catch (error) {
    console.error('Unexpected error in deleteUser:', error)
    return { error: 'Error inesperado al eliminar usuario' }
  }
}