'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { singOut } from '@/app/dashboard/account/action'
import Avatar from '@/components/Avatar'

export default function AccountForm({ user }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState(null)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [properties, setProperties] = useState(null)

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url, businesses(count)`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        // Si es error 406, significa que no hay perfil, lo cual es normal para usuarios nuevos
        if (status !== 406) {
          throw error
        }
      }
      
      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      console.error('Error loading user data:', error)
      // No mostrar alert para usuarios nuevos sin perfil
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({fullname, username, website, avatar_url }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      
      // Mostrar mensaje de éxito más amigable
      const isNewProfile = !fullname && !username // Si no había datos previos, es un perfil nuevo
      alert(isNewProfile ? '¡Perfil creado exitosamente!' : '¡Perfil actualizado correctamente!')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error al guardar los datos. Por favor intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget container space-y-2 flex flex-col items-center w-96 gap-2 border-4 py-2 m-2 rounded-lg shadow-lg">
      <Avatar
        uid={user?.id}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({ fullname, username, website, avatar_url: url })
        }}
      />
      <div className='space-y-3 w-full'>
        <div>
          <label htmlFor="fullName" className='font-bold'>
            Nombre completo <span className="text-red-500">*</span>
          </label>
          <br />
          <input
            id="fullName"
            className='font-semibold border p-1.5 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500'
            type="text"
            placeholder="Ingresa tu nombre completo"
            value={fullname || ''}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className='font-bold'>Email:</label>
          <br />
          <input
            id="email"
            className='font-semibold border p-1.5 w-full rounded bg-gray-100'
            type="text"
            value={user?.email}
            disabled 
          />
        </div>
        
        <div>
          <label htmlFor="username" className='font-bold'>Nombre de usuario:</label>
          <br />
          <input
            id="username"
            className='font-semibold border p-1.5 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500'
            type="text"
            placeholder="Nombre único para tu perfil"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="website" className='font-bold'>Website:</label>
          <br />
          <input
            id="website"
            className='font-semibold border p-1.5 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500'
            type="url"
            placeholder="https://tu-sitio-web.com (opcional)"
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        
        <div className='flex flex-col gap-2 pt-4'>
          <button
            className="bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-2 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => updateProfile({ fullname, username, website, avatar_url })}
            disabled={loading || !fullname}
          >
            {loading ? 'Guardando...' : (fullname && username ? 'Actualizar Perfil' : 'Crear Perfil')}
          </button>

          <form className="text-center">
            <button 
              className="text-red-500 hover:text-red-700 font-semibold transition-colors" 
              formAction={singOut} 
              type="submit"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}