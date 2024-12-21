'use client'
import React, { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Image from 'next/image'


export default function  ImageSupabase({buckets, url, className, alt}) {
    const [imageUrl, setImageUrl] = useState(null)
    const supabase = createClient()
    console.log(url)
    useEffect(() => {
       async function downloadImage (){
            try {
                const { data, error } = await supabase.storage.from(buckets).download(url)
                if (error) {
                    throw error
                }
                const image = URL.createObjectURL(data)
                setImageUrl(image)
            } catch (error) {
                console.log('Error downloading image: ', error)
            }
        }
        downloadImage()
    }, [supabase])

    return (<>
        <Image src={imageUrl ?? url} width={0} alt={alt ?? 'Imagen de vive monterrey'} height={0} className={className} />
    </>
    )
}

