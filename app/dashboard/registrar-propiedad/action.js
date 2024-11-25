'use server'
import { createClient } from "@/utils/supabase/server"
import sharp from "sharp"
import { redirect } from "next/navigation"


export async function insertProperty(formData) {
    const supabase = createClient()

    

    // Subir imagen de las categorias
    // const file = formData.get('image_url')
    // const arrayBuffer = await file.arrayBuffer()
    // const buffer = await sharp(arrayBuffer)
    //     .webp({ quality: 80 })
    //     .toBuffer()

    // const fileExt = file.name.split('.').pop()
    // const filePath = `prueba/${formData.get('name').split(' ').join('')}-${Date.now()}.webp`
    // const { error: uploadError } = await supabase.storage.from('categories_image').upload(filePath, buffer, {contentType: 'image/webp'})

    // Subir iconos de las categorias
    // const icon = formData.get('icon_category')
    // const iconExt = icon.name.split('.').pop()
    // const iconPath = `${formData.get('name').split(' ').join('')}-icon-${Date.now()}.${iconExt}`
    // const { error: uploadIconError } = await supabase.storage.from('categories_image').upload(iconPath, icon)
    // if (uploadError) {
    //     console.log(uploadError)
    //     throw uploadError
    // } else {
    //     console.log('imagen subida')
    // }

    const data = {
        price: formData.get('price'),
        location_name: formData.get('location_name'),
        property_type: formData.get('property_type'),
        profile_id: formData.get('profile_id'),
    }

    console.log(data)

    const { error } = await supabase.from('properties').insert(data)

    if (error) {
        console.log(error)
    } else {
        console.log('porpiedad insertada')
        redirect('/dashboard')

    }
}