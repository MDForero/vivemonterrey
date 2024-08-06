'use server'
import { createClient } from "@/utils/supabase/server"


export async function registerBusiness(formData) {
  const supabase = createClient()
  
  const file = formData.get('banner')
  const fileExt = file?.name.split('.').pop()
  const filePath = `${formData.get("name").split(' ').join('')}-${Math.random()}.${fileExt}`
  const { data: dataImage, error: errorImage } = await supabase.storage.from('banners').upload(filePath, file)
  
  if (errorImage) {
    console.log(errorImage, dataImage)
  } else {
    console.log('imagen subida')
  }

  const dates = {
    profile_id: formData.get('profile_id'),
    name: formData.get('name'),
    description: formData.get('description'),
    address: formData.get('address'),
    phone: formData.get('phone'),
    website: formData.get('website'),
    banner_url: filePath,
    socials_account: formData.get('socials_account'),
  }

  const { data, error } = await supabase.from('businesses').insert(dates).select()
  console.log(data, error)
  const { data: dataCategories } = await supabase.from('categories').select('id, name')
  const businessesCategories = dataCategories?.filter(category => category.id === formData.get(category.name))
  businessesCategories.forEach(async category => await supabase.from('businesses_categories').insert({ business_id: data[0].id, category_id: category.id }))


  if (error) {
    console.log(error, data)
  } else {
    console.log('negocio registrado')
    // redirect('/dashboard')
  }

}