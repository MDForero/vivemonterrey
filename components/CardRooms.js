'use client'
import { createClient } from '@/utils/supabase/client'
import { PlusCircleIcon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import { Separator } from './ui/separator'

const CardRooms = ({ product, dispatch, action }) => {
    console.log(product)
    const supabase = createClient()
    const [urlImage, setUrlImage] = useState()
    const [loading, setLoading] = useState()

    useEffect(() => {
        async function downloadImage(path) {
            console.log(path)
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

        if (product?.images) downloadImage(product.images[0])

    }, [product, supabase])



    return (<div className='  aspect-square max-w-96 space-y-2 border-2 rounded-xl p-2'>

        <h1 className='text-xl font-bold  leading-4 title p-3 rounded-sm  mx-auto w-fit bg-gray-200  capitalize'>{product.name}</h1>
        <Separator />
        <div className='order-2 '>
            {loading ? <Skeleton className='w-full h-full aspect-square' /> : urlImage ? <Image src={urlImage} alt={product.name} width={0} height={0} className=' w-full aspect-square object-cover rounded-2xl ' /> : 'no image'}
        </div>
        <div className=''>
            <div className='flex'>
                <dl className='grid grid-cols-2 w-full place-items-end'>
                    <dt className='place-self-start'>Min. Ocupación</dt>
                    <dd>{product.min_occupancy}</dd>
                    <dt className='place-self-start'>Ocupación</dt>
                    <dd>{product.occupancy}</dd>
                </dl>
            </div>
        </div>
    </div>
    )
}

export default CardRooms