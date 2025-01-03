'use client'
import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner";

const supabase = createClient()

export async function productRegister(formData) {
    try {
        const data = {}

        const { data: businessName } = await supabase.from('businesses').select('name, id, categories_restaurant').eq('name', decodeURI(formData.get('negocio'))).single()
        data['business_id'] = businessName.id
        const folder = businessName.name.split(' ').join('-')
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/ñ/g, "n")
            .replace(/Ñ/g, "N");

        const name = formData.get('name').split(' ').join('-')
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/ñ/g, "n")
            .replace(/Ñ/g, "N");

        const fileExt = formData.get('image').name.split('.').pop()
        const pathImage = `${folder}/productos/${name}-${Date.now()}.${fileExt}`
        const image = formData.get('image')

        const other_category = formData.get('other_category')
        if (businessName.categories_restaurant === null) {
            data['category'] = other_category
            const { data: updateBusinesses, error: errorBusinesses } = await supabase.from('businesses').update({ categories_restaurant: [other_category] }).eq('id', businessName.id)

        } else if (!businessName.categories_restaurant.includes(other_category)) {
            data['category'] = other_category
            const { data: updateBusinesses, error: errorBusinesses } = await supabase.from('businesses').update({ categories_restaurant: [...businessName.categories_restaurant, other_category] }).eq('id', businessName.id)
        }


        const { data: dataImage, error } = await supabase.storage.from('banners').upload(pathImage, image, { contentType: `image/${fileExt}` })
        if (dataImage) {
            formData.delete('image')
            formData.set('image', pathImage)
        }

        formData.entries().forEach(([key, value]) => !['negocio', 'other_category'].includes(key) ? data[key] = value : null)

        const { data: dataProduct, error: errorProduct } = await supabase.from('products').insert(data).select()

        if (dataProduct) {
            console.log(dataProduct)
            toast('Producto registrado', {
                description: 'El producto ha sido registrado con éxito',
                action: {
                    label: 'Ir a productos',
                    onClick: () => window.location.href = `/dashboard/negocios/${businessName.name}/menu`
                }
            }
            )
        }
    }
    catch (error) {
        console.error(error)
        // formData.delete('image')

        // formData.forEach((value, key) => data[key] = value)
        // console.log(data)

        // try { 
        //     await supabase.from('products').insert(data)
        // } catch (error) {
        //     console.error(error)
        // }
    }
}