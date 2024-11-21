'use client'
import { createClient } from '@/utils/supabase/client'
import { PlusCircleIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { set } from 'react-hook-form'
import { Button } from './ui/button'

const CardProducts = ({ product }) => {
    const supabase = createClient()
    const [urlImage, setUrlImage] = useState()
    const [loading, setLoading] = useState()

    useEffect(() => {
        async function downloadImage(path) {
            setLoading(true)
            try {

                const { data, error } = await supabase.storage.from('banners').download(path, {
                    quality: 20
                })
                if (error) {
                    throw error
                }

                const url = URL.createObjectURL(data)
                setUrlImage(url)
            } catch (error) {
                console.log('Error downloading image: ', error)
            }
            setLoading(false)
        }

        if (product?.image) downloadImage(product.image)

    }, [product, supabase])

    return (
        <div className='md:max-w-96 flex flex-col md:block border rounded-2xl pl-2 space-y-2 relative w-44 md:w-full'>
            {urlImage ? <Image src={urlImage} alt={product.name} width={0} height={0} className='float float-right w-full md:w-1/3 aspect-square rounded-2xl ' /> : <div className='w-20 h-20 bg-gray-200'>No Image</div>}
                <h1 className='text-xl font-bold px-1 leading-4 title'>{product.name}</h1>
                <p className='text-sm font-light line-clamp-1 md:line-clamp-3 px-1'>{product.description}</p>
                <div className='flex md:block font-bold justify-between items-center px-1 pb-1'>
                    {product.price}
                    <PlusCircleIcon className='md:hidden' />
                </div>
                <a href='#' className='hidden absolute bottom-0 right-0 rounded-2xl rounded-tl-3xl w-1/6 h-1/2 md:flex justify-center items-center bg-white '><PlusCircleIcon className=' w-8 h-8' /></a>
        </div>
    )
}

export default CardProducts