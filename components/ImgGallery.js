"use client"
import { createClient } from "@/utils/supabase/client"
import Image from "next/image"
import { useEffect, useState } from "react"

const ImgGallery = ( props ) => {
    const{ path, className } = props
    const supabase = createClient()
    const [image, setImage] = useState(null)
    useEffect(() => {
        async function downloadImage(path) {
            try {
                const { data, error } = await supabase.storage.from('banners').download(path)
                if (error) {
                    throw error
                }
                const url = URL.createObjectURL(data)
                setImage(url)
            } catch (error) {
            }
        }
        if (path) downloadImage(path)
    }, [path, supabase])
    return (image && <Image src={image} width={0} height={0} loading="lazy" className={className} alt={image} />)
}


export default ImgGallery