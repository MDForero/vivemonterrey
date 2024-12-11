'use client'
import { createClient } from "@/utils/supabase/client"
import { useState } from "react";
import { toast } from "sonner";

const supabase = createClient()

export async function productRegister(formData) {
    try {
        const data = {}
        const { data: businessName } = await supabase.from('businesses').select('name, id, categories_restaurant').eq('name', decodeURI(formData.get('negocio'))).single()
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


        const images = formData.getAll('image')
        const arrayImages = []

        try {
            await Promise.all(images.map(async (image, index) => {
                try {
                    const fileExt = image.name.split('.').pop()
                    const pathImage = `${folder}/habitacion/${name}/${Date.now()}-${index}.${fileExt}`
                    const { data: dataImage, error } = await supabase.storage.from('banners').upload(pathImage, image, { contentType: `image/${fileExt}` })
                    if (dataImage) {
                        arrayImages.push(pathImage)
                    }
                } catch (error) {
                    console.error(error)
                }
            }))
        } catch (error) {
            console.error(error)
        }

        formData.entries().forEach(([key, value]) => ['image', 'negocio'].includes(key) ? null : data[key] = value)
        data['images'] = arrayImages
        data['business_id'] = businessName.id
        console.log(data)

        const { data: dataProduct, error: errorProduct } = await supabase.from('rooms').insert(data).select()

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
    }
}