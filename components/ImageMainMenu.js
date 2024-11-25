'use client'
import React from 'react'
import ImageSupabase from './ImageSupabase'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'sonner'


const ImageMainMenu = ({ data, label, action, name, params, ...props }) => {

    const supabase = createClient()

    const handleUpload = async (e) => {
        const file = e.target.files[0]
        const fileExt = file.name.split('.').pop()
        const folder = decodeURI(params.negocio).split(' ').join('-').normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ñ/g, "n").replace(/Ñ/g, "N")
        const pathImage = `${folder}/menu/${name}-${Date.now()}.${fileExt}`
        if (!data) {
            try {

                const { data: dataImage, error } = await supabase.storage.from('banners').upload(pathImage, file, { contentType: `image/${fileExt}` })
                if (dataImage) {
                    const { data: dataUpdate, error } = await supabase.from('businesses').update({ [name]: pathImage }).eq('name', decodeURI(params.negocio).split('-').join(' '))

                    if (dataUpdate) {
                        console.log(dataUpdate)
                        toast('Imagen actualizada', {
                            description: 'La imagen ha sido actualizada con éxito',
                            action: {
                                label: 'Aceptar',
                                onClick: () => window.location.reload()
                            }
                        })
                    }
                }

            } catch (error) {
                console.log('Error uploading image: ', error)

            }
        } else {
            try {
                console.log(data)
                const { data: dataImage, error } = await supabase.storage.from('banners').update(data, file, {
                    cacheControl: '3600',
                    upsert: true
                })
                if (dataImage) {
                    console.log(dataImage)
                    toast('Imagen actualizada', {
                        description: 'La imagen ha sido actualizada con éxito',
                        action: {
                            label: 'Aceptar',
                            onClick: () => window.location.reload()
                        }
                    })
                }
            } catch (error) {
                console.log('Error uploading image: ', error)

            }
        }
    }
    return (
        <div className='relative'>
            <label htmlFor={name} className='absolute bottom-0  right-0 w-16 h-16 flex justify-center items-center bg-white rounded-full'><PlusCircledIcon className='w-7 h-7' /></label>
            <input type='file' name={name} id={name} className='hidden' onChange={handleUpload} />
            {data ? <ImageSupabase buckets='banners' url={data} className='h-[400px] w-full object-cover' /> : <div className='w-full h-[400px] bg-gray-200'>{label}</div>}
        </div>
    )
}


export default ImageMainMenu