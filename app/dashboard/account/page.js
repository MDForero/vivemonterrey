import Link from 'next/link'
import AccountForm from '@/components/forms/account-form'
import { createClient } from '@/utils/supabase/server'

export default async function Account() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

 
  
  const { data: dataSesion, errorSesion } = supabase.auth.getSession()

  console.log(dataSesion)

  return <div className=''>
    <AccountForm user={user} />
    <div className='grid grid-cols-3 max-w-5xl'>
      {dataSesion}
    </div>
  </div>
}