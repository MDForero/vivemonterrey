'use server'
import { createClient } from "@/utils/supabase/server"
import sharp from "sharp"

export async function registerBusiness(formData) {
  const supabase = createClient()

  // Subir imagen de banner
  const file = formData.get('banner')
  const fileBuffer = await file.arrayBuffer()
  const image = await sharp(fileBuffer)
    .keepExif()
    .jpeg({ quality: 40 })
    .toBuffer()
  const filePath = `${formData.get("name").split(' ').join('').length}-${Date.now()}.jpeg`
  const { data: dataImage, error: errorImage } = await supabase.storage.from('banners').upload(filePath, image, { contentType: 'image/jpeg' })
  if (errorImage) {
    console.log(errorImage, dataImage)
    return // Salir si hay error al subir el banner
  } else {
    console.log('Banner subido')
  }

  // Subir imágenes de galería
  const gallery = formData.getAll('gallery')
  const galleryArray = []

  try {
    await Promise.all(gallery.map(async (file, index) => {
      const fileBuffer = await file.arrayBuffer()
      const image = await sharp(fileBuffer)
        .keepExif()
        .jpeg({ quality: 40, })
        .toBuffer()
      const filePath = `${formData.get("name").split(' ').join('').length}-gallery-${Date.now()}.jpeg`
      const { data: dataImage, error: errorImage } = await supabase.storage.from('banners').upload(filePath, image, { contentType: 'image/jpeg' })

      if (errorImage) {
        console.log('Error al subir imagen de galería:', errorImage)
        
      } else {
        console.log('Imagen de galería subida')
        galleryArray.push(filePath)
      }
    }))
  } catch (error) {
    console.log('Error al subir imágenes de galería:', error)
  }

  // Insertar datos del negocio
  const dates = {
    profile_id: formData.get('profile_id'),
    name: formData.get('name'),
    description: formData.get('description'),
    address: formData.get('address'),
    phone: formData.get('phone'),
    website: formData.get('website'),
    banner_url: filePath,
    socials_account: formData.get('socials_account').split(',').map(social => social.trim()),
    gallery: galleryArray,
  }

  const { data, error } = await supabase.from('businesses').insert(dates).select()
  if (error) {
    console.log('Error al registrar negocio:', error)
    return
  }

  const { data: dataCategories } = await supabase.from('categories').select('id, name')
  const businessesCategories = dataCategories?.filter(category => formData.get(category.name))

  try {
    await Promise.all(businessesCategories.map(async category =>
      await supabase.from('businesses_categories').insert({ business_id: data[0].id, category_id: category.id })
    ))
    console.log('Negocio registrado con éxito')
  } catch (error) {
    console.log('Error al registrar categorías:', error)
  }
}