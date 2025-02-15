'use server'
import { createClient } from "@/utils/supabase/server"


export async function registerBusiness(formData) {

  const shcedule = {
    lunes: {
      open: formData.get('lunes-open'),
      close: formData.get('lunes-close'),
      closed: formData.get('lunes-closed'),
      twentyFour: formData.get('lunes-fourty-four')
    },
    martes: {
      open: formData.get('martes-open'),
      close: formData.get('martes-close'),
      closed: formData.get('martes-closed'),
      twentyFour: formData.get('martes-fourty-four')
    },
    miercoles: {
      open: formData.get('miercoles-open'),
      close: formData.get('miercoles-close'),
      closed: formData.get('miercoles-closed'),
      twentyFour: formData.get('miercoles-fourty-four')
    },
    jueves: {
      open: formData.get('jueves-open'),
      close: formData.get('jueves-close'),
      closed: formData.get('jueves-closed'),
      twentyFour: formData.get('jueves-fourty-four')
    },
    viernes: {
      open: formData.get('viernes-open'),
      close: formData.get('viernes-close'),
      closed: formData.get('viernes-closed'),
      twentyFour: formData.get('viernes-fourty-four')
    },
    sabado: {
      open: formData.get('sabado-open'),
      close: formData.get('sabado-close'),
      closed: formData.get('sabado-closed'),
      twentyFour: formData.get('sabado-fourty-four')
    },
    domingo: {
      open: formData.get('domingo-open'),
      close: formData.get('domingo-close'),
      closed: formData.get('domingo-closed'),
      twentyFour: formData.get('domingo-fourty-four')
    }
  }

  const supabase = createClient()

  const folder = formData.get("name")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/g, "n")
    .replace(/Ñ/g, "N")
    .split(' ')
    .join('-');

  console.log(folder)
  // Subir imagen de banner
  const file = formData.get('banner_url')
  const fileExtension = file.name.split('.').pop()

  const filePath = `${folder}/banner-${Date.now()}.${fileExtension}`
  const { data: dataImage, error: errorImage } = await supabase.storage.from('banners').upload(filePath, file, { contentType: 'image/jpeg' })
  if (errorImage) {
    console.log(errorImage, dataImage)
    return // Salir si hay error al subir el banner
  } else {
    console.log('Banner cargado')
  }
  const logo = formData.get('logo')
  const logoExtension = logo.name.split('.').pop()

  const logoPath = `${folder}/logo-${Date.now()}.${logoExtension}`
  const { data: dataLogo, error: errorLogo } = await supabase.storage.from('banners').upload(logoPath, logo, { contentType: 'image/png' })
  if (errorLogo) {
    console.log(errorLogo)
    return // Salir si hay error al subir el banner
  } else {
    console.log('Logo cargado')
  }

  // Subir imágenes de galería
  const gallery = formData.getAll('gallery')
  const galleryArray = []

  try {
    await Promise.all(gallery.map(async (file, index) => {
      const fileExtension = file.name.split('.').pop()

      const filePath = `${folder}/gallery/${Date.now()}.${fileExtension}`
      const { data: dataImage, error: errorImage } = await supabase.storage.from('banners').upload(filePath, file, { contentType: 'image/jpeg' })

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
  const datas = {
    profile_id: formData.get('profile_id'),
    name: formData.get('name'),
    description: formData.get('description'),
    amenities: formData.get('amenities').split(','),
    address: formData.get('address'),
    phone: formData.get('phone'),
    website: formData.get('website'),
    banner_url: filePath,
    logo: logoPath,
    socials_account: formData.get('socials_account').split(',').map(social => social.trim()),
    gallery: galleryArray,
    enlace: formData.get('name').toLowerCase().replace(/ /g, '-').replace(/ñ/g, 'n').replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u'),
    schedule: JSON.stringify(shcedule),
  }

  console.log(datas)

  const { data, error } = await supabase.from('businesses').insert(datas).select()
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