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

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        return { error }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard/') 

}

export async function signup(formData) {
    const supabase = createClient()
  
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
      full_name: formData.get('full_name'),
      username: formData.get('username'),
    }
  
    const { error } = await supabase.auth.signUp(data)
  
    if (error) {
      redirect('/error')
    }
  
    revalidatePath('/', 'layout')
    redirect('/confirmacion-registro/')
  }