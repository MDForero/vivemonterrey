'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { singOut } from '../../app/account/action'
import Avatar from '@/components/Avatar'

export default function AccountForm({ user }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState(null)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({ username, website, avatar_url }) {
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
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget container space-y-2 flex flex-col  items-center w-96 gap-2 border-4 py-2 m-2 rounded-lg shadow-lg">
      <Avatar
        uid={user?.id}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({ fullname, username, website, avatar_url: url })
        }}
      />
      <div className='space-y-3'>
        <div>
          <label htmlFor="fullName" className='font-bold '>Nombre completo: </label>
          <br />
          <input
            id="fullName"
            className='font-semibold border p-1.5'
            type="text"
            value={fullname || ''}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email" className='font-bold '>Email: </label>
          <br />
          <input
            id="email"
            className='font-semibold border p-1.5'
            type="text"
            value={user?.email}
            disabled />
        </div>
        <div>
          <label htmlFor="username" className='font-bold '>Nombre de usuario: </label>
          <br />
          <input
            id="username"
            className='font-semibold border p-1.5'
            type="text"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="website" className='font-bold '>Website: </label>
          <br />
          <input
            id="website"
            className='font-semibold border p-1.5'
            type="url"
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div className='flex items-end gap-2'>
          <button
            className="bg-green-600 text-white rounded-md px-3 py-1.5 font-semibold border-2"
            onClick={() => updateProfile({ fullname, username, website, avatar_url })}
            disabled={loading}
          >
            {loading ? 'Actualizando ...' : 'Actualizar'}
          </button>

          <form>
            <button className="text-red-500 font-semibold" formAction={singOut} type="submit">
              Cerrar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}