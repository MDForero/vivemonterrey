'use client'
import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'
import Image from 'next/image'
import { Skeleton } from './ui/skeleton'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export default function LazyImageSupabase({ buckets, url, className, alt, priority = false }) {
    const [imageUrl, setImageUrl] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const supabase = createClient()
    
    // Solo cargar la imagen cuando esté visible, a menos que sea prioritaria
    const { elementRef, hasIntersected } = useIntersectionObserver({
        threshold: 0.1,
        rootMargin: '100px'
    })

    const shouldLoad = priority || hasIntersected

    useEffect(() => {
        if (!shouldLoad || !url) return

        async function downloadImage() {
            try {
                setLoading(true)
                const { data, error } = await supabase.storage.from(buckets).download(url)
                if (error) {
                    console.log('Error downloading image: ', error)
                    setError(true)
                    setLoading(false)
                    return
                }
                const image = URL.createObjectURL(data)
                setImageUrl(image)
                setLoading(false)
            } catch (error) {
                console.log('Error downloading image: ', error)
                setError(true)
                setLoading(false)
            }
        }
        
        downloadImage()

        // Cleanup function
        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl)
            }
        }
    }, [shouldLoad, url, buckets, supabase])

    // Skeleton mientras carga
    if (loading && shouldLoad) {
        return <Skeleton className={className} />
    }

    // Error state
    if (error) {
        return (
            <div className={`${className} bg-gray-200 flex items-center justify-center`}>
                <span className="text-gray-500 text-sm">Error al cargar imagen</span>
            </div>
        )
    }

    // Placeholder antes de que sea visible (si no es prioritaria)
    if (!shouldLoad) {
        return (
            <div ref={elementRef} className={className}>
                <Skeleton className="w-full h-full" />
            </div>
        )
    }

    // Imagen cargada
    if (imageUrl) {
        return (
            <div ref={elementRef}>
                <Image 
                    src={imageUrl} 
                    alt={alt || 'Imagen'} 
                    className={className}
                    width={0}
                    height={0}
                    loading={priority ? "eager" : "lazy"}
                    priority={priority}
                />
            </div>
        )
    }

    return <Skeleton className={className} />
}