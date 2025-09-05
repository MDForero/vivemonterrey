import Link from 'next/link'
import AccountForm from '@/components/forms/account-form'
import { getCurrentUser } from '@/utils/auth/permissions'
import { redirect } from 'next/navigation'

export default async function Account() {
  const { user, profile, role, error } = await getCurrentUser()
  
  if (!user) {
    redirect('/login')
  }

  // Si hay error de sesión, redirigir al login
  if (error === 'No session found' || error === 'User not found') {
    redirect('/login')
  }

  return (
    <div className='flex flex-col items-center'>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Configuración del Perfil</h1>
        {!profile ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-blue-800 mb-2">¡Bienvenido!</h3>
            <p className="text-blue-700">
              Parece que es tu primera vez aquí. Completa tu perfil para acceder a todas las funciones.
            </p>
          </div>
        ) : (
          <p className="text-gray-600">Actualiza tu información personal</p>
        )}
      </div>
      
      <AccountForm user={user} />
      
      <div className="mt-6">
        <Link 
          href="/dashboard" 
          className="inline-flex items-center px-4 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 transition-colors"
        >
          ← Volver al Dashboard
        </Link>
      </div>
    </div>
  )
}