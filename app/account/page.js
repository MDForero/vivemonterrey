import Link from 'next/link'
import AccountForm from '../../components/forms/account-form'
import { createClient } from '@/utils/supabase/server'

export default async function Account() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const businesses = await supabase.from('businesses').select('*')
  console.log(businesses)
  return <div className=''>
    <AccountForm user={user} />
    <div className='grid grid-cols-3 max-w-5xl'>
      {businesses.data.map((business, index) => <div key={index}>
        <h1>{business.name}</h1>
        <Link href={`/account/${business.id}`}>Editar</Link>
      </div>)}
    </div>
  </div>
}