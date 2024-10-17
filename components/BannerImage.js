'use client'
import { createClient } from "@/utils/supabase/client"
import Image from "next/image"
import { useEffect, useState } from "react"

const BannerImage = ({ path, buckets }) => {
    
    const supabase = createClient()
    const [banner, setBanner] = useState(null)

    useEffect(() => {
        async function downloadImage(path) {
            try {
                const { data, error } = await supabase.storage.from(buckets).download(path)
                if (error) {
                    throw error
                }
                const url = URL.createObjectURL(data)
                setBanner(url)
            } catch (error) {
                console.log('Error downloading image: ', error)
            }
        }
        if (path) downloadImage(path)

    }, [path])
    
    return (banner && <Image src={banner} width={0} height={0} loading="lazy" className={'w-full h-[600px] object-cover hidden md:block'} alt={banner} />
    )
}

export default BannerImage