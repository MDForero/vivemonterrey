'use server'
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function registerBusiness(formData) {
  const supabase = createClient()
  const data = {
    profile_id: formData.get('profile_id'),
    name: formData.get('name'),
    description: formData.get('description'),
    categories: [formData.get('restaurante'), formData.get('bar'), formData.get('actividad'), formData.get('tienda'), formData.get('alojamiento')].filter(item => item !== null),
    address: formData.get('address'),
    phone: formData.get('phone'),
    website: formData.get('website'),
  }
  console.log(data)

  const { error } = await supabase.from('businesses').insert(data)

  if (error) {
    console.log(error, data)
  } else {
    redirect('/account')
  }

}