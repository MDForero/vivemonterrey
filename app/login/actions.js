'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  console.log(data);

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error }
  } else {
    revalidatePath('/', 'layout')
    redirect('/dashboard/')
  }

}

export async function signup(formData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }


  const { error, data: user } = await supabase.auth.signUp(data)

  if (error) {
    redirect('error')
  } else {
    revalidatePath('/', 'layout')
    redirect('/confirmacion-registro/')
  }
}