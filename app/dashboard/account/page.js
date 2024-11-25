import Link from 'next/link'
import AccountForm from '@/components/forms/account-form'
import { createClient } from '@/utils/supabase/server'

export default async function Account() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log(user)


  const { data, error } = await supabase
    .from('profiles')
    .select('*, properties(count)')
    .eq('user_id', user?.id)

  console.log(data)

  return <div className=''>
    <AccountForm user={user} />
    <div className='grid grid-cols-3 max-w-5xl'>
      {data?.name}
    </div>
  </div>
}