'use client'
import React, { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Image from 'next/image'
import { set } from 'date-fns'


export default function ImageSupabase({ buckets, url, className, alt }) {
    const [imageUrl, setImageUrl] = useState(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()
    console.log(url)
    useEffect(() => {
        async function downloadImage() {
            try {

                const { data, error } = await supabase.storage.from(buckets).download(url)
                if (error) {
                    console.log('Error downloading image: ', error)
                    throw error
                }
                const image = URL.createObjectURL(data)
                setImageUrl(image)
                setLoading(false)
            } catch (error) {
                console.log('Error downloading image: ', error)
            }
        }
        downloadImage()
    }, [supabase])

    return (<> 
            {!loading ? <Image src={imageUrl ?? url} width={0} alt={alt ?? 'Imagen de vive monterrey'} height={0} className={className} /> : <div className={className + ' bg-gray-50 flex justify-center items-center'}>Loading...</div>}
            {imageUrl}
    </>
    )
}

