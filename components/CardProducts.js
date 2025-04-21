'use client'
import { createClient } from '@/utils/supabase/client'
import { PlusCircleIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { set } from 'react-hook-form'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'

const CardProducts = ({ product, dispatch, action }) => {
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



    return (<div className='border rounded-2xl grid grid-cols-3 justify-between max-w-lg w-full relative '>

        <div className='order-2 '>
            {loading ? <Skeleton className='w-full h-full' /> : urlImage ? <Image src={urlImage} alt={product.name} width={0} height={0} className=' w-full aspect-square rounded-2xl object-cover' /> : 'no image'}
        </div>
        <div className='col-span-2 flex flex-col justify-between p-2'>
            <h1 className='text-xl font-bold px-1 leading-4 title capitalize'>{product.name}</h1>
            <p className='text-sm font-light line-clamp-3 px-1'>{product.description}</p>
            <div className='flex  font-bold justify-between items-center px-1 pb-1'>
                {dispatch ?
                    <button onClick={() => dispatch({ type: action, payload: { id: product.id, name: product.name, category:product.category, price: product.price, image: urlImage } })} className='  rounded-md  flex justify-center items-center bg-[#EC5228] text-white w-fit py-1 px-2 font-semibold'>Agregar al carrito</button> :
                    <button className=' hidden absolute bottom-0 right-0 rounded-2xl rounded-tl-3xl w-1/6 h-1/2 md:flex justify-center items-center bg-white '><PlusCircleIcon className=' w-8 h-8' /></button>
                }
                <p>
                    {product.price}
                </p>
            </div>
        </div>
    </div>
    )
}

export default CardProducts