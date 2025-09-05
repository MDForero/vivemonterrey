'use client'

import { useEffect, useState } from 'react'
import { createClient } from "@/utils/supabase/client"
import { useRouter } from 'next/navigation'
import { 
  getCurrentUserClient, 
  hasPermission, 
  ROLES, 
  PERMISSIONS 
} from '@/utils/auth/permissions-client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Users, Shield, UserPlus, Edit3, Trash2 } from "lucide-react"
import { updateUserRole, getAllUsers, deleteUser } from './action'

const AVAILABLE_ROLES = [
  { value: ROLES.ADMIN, label: 'Administrador', description: 'Acceso completo al sistema' },
  { value: ROLES.CLIENT, label: 'Cliente', description: 'Gestión de negocios propios' },
  { value: ROLES.USER, label: 'Usuario', description: 'Acceso básico' }
]

export default function UsuariosPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedRole, setSelectedRole] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkAuthorization()
  }, [])

  useEffect(() => {
    if (isAuthorized) {
      fetchUsers()
    }
  }, [isAuthorized])

  const checkAuthorization = async () => {
    try {
      const { user, profile, role, error } = await getCurrentUserClient()
      
      if (error || !user) {
        router.push('/login')
        return
      }

      // Verificar si el usuario tiene permiso para gestionar usuarios
      if (!hasPermission(role, PERMISSIONS.USERS_READ)) {
        router.push('/dashboard')
        toast.error('No tienes permisos para acceder a esta sección')
        return
      }

      setCurrentUser(user)
      setUserRole(role)
      setIsAuthorized(true)
    } catch (error) {
      console.error('Error checking authorization:', error)
      router.push('/dashboard')
    }
  }

  const fetchUsers = async () => {
    try {
      setLoading(true)
      
      const result = await getAllUsers()
      
      if (result.error) {
        toast.error(result.error)
        return
      }

      setUsers(result.users)
    } catch (error) {
      console.error('Error fetching users:', error)
      toast.error('Error al cargar usuarios')
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = async () => {
    if (!selectedUser || !selectedRole) return

    try {
      const result = await updateUserRole(selectedUser.id, selectedRole)
      
      if (result.error) {
        toast.error(result.error)
        return
      }

      toast.success(result.message)
      setIsDialogOpen(false)
      setSelectedUser(null)
      setSelectedRole('')
      fetchUsers()
    } catch (error) {
      console.error('Error changing role:', error)
      toast.error('Error al cambiar rol')
    }
  }

  const handleDeleteUser = async () => {
    if (!selectedUser) return
    
    // Verificar que se escribió el nombre correcto
    if (deleteConfirmText !== selectedUser.full_name) {
      toast.error('El nombre no coincide. Por favor, escribe el nombre exacto del usuario.')
      return
    }

    try {
      const result = await deleteUser(selectedUser.id)
      
      if (result.error) {
        toast.error(result.error)
        return
      }

      toast.success(result.message)
      setIsDeleteDialogOpen(false)
      setSelectedUser(null)
      setDeleteConfirmText('')
      fetchUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Error al eliminar usuario')
    }
  }

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case ROLES.ADMIN: return 'destructive'
      case ROLES.CLIENT: return 'secondary'
      case ROLES.USER: return 'outline'
      default: return 'default'
    }
  }

  const getRoleLabel = (role) => {
    const roleData = AVAILABLE_ROLES.find(r => r.value === role)
    return roleData?.label || role
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
        </div>
        <Button onClick={fetchUsers} variant="outline">
          Actualizar
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableCaption>
            Lista de todos los usuarios registrados en el sistema
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Fecha de Registro</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    {user.avatar && (
                      <img 
                        src={user.avatar} 
                        alt={user.full_name}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <div>
                      <div className="font-semibold">{user.full_name}</div>
                      <div className="text-sm text-gray-500">@{user.username}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={getRoleBadgeVariant(user.role)}>
                    {getRoleLabel(user.role)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleDateString('es-ES')}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedUser(user)
                        setSelectedRole(user.role)
                        setIsDialogOpen(true)
                      }}
                      disabled={user.id === currentUser?.id}
                      title="Editar rol"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    
                    {hasPermission(userRole, PERMISSIONS.USERS_DELETE) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedUser(user)
                          setDeleteConfirmText('')
                          setIsDeleteDialogOpen(true)
                        }}
                        disabled={user.id === currentUser?.id}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        title="Eliminar usuario"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Cambiar Rol de Usuario
            </DialogTitle>
            <DialogDescription>
              Cambiar el rol de {selectedUser?.full_name} ({selectedUser?.email})
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar rol" />
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_ROLES.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={getRoleBadgeVariant(role.value)}>
                          {role.label}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {role.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleRoleChange}>
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmación para eliminar usuario */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-5 w-5" />
              Eliminar Usuario
            </DialogTitle>
            <DialogDescription>
              Esta acción eliminará permanentemente la cuenta de{' '}
              <strong>{selectedUser?.full_name}</strong> ({selectedUser?.email}).
              <br />
              <br />
              <span className="text-red-600 font-medium">
                Esta acción no se puede deshacer.
              </span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Label htmlFor="confirm-delete" className="text-sm font-medium">
              Para confirmar, escribe <span className="font-bold text-red-600">{selectedUser?.full_name}</span>:
            </Label>
            <Input
              id="confirm-delete"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder="Escribe el nombre del usuario"
              className="mt-2"
              autoComplete="off"
            />
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsDeleteDialogOpen(false)
                setDeleteConfirmText('')
              }}
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteUser}
              disabled={deleteConfirmText !== selectedUser?.full_name}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar Usuario
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}