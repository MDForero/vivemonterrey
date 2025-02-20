'use client'
import { createClient } from "@/utils/supabase/client"
import { PlusCircleIcon } from "lucide-react"
import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { useRouter, usePathname } from "next/navigation"
import { set } from "react-hook-form"

export default function UploadImage({ bucket, businesses }) {
    const supabase = createClient()
    const [image, setImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleUpload = async () => { 
        setIsLoading(true)
        const file = document.getElementById('file').files[0]

        if (!file) {
            toast('Upload Image', {
                variant: "destructive",
                title: "No has seleccionado una imagen",
                description: "Por favor selecciona una imagen para subir",
                action: {
                    label: "Cerrar",
                    onClick: () => console.log('cerrar toast'),
                }
            })
            return
        }


        const gallery = [...businesses.gallery]
        const fileExt = file.name.split('.').pop()
        const nameDate = Date.now()
        const path = `${businesses.enlace}/gallery/${nameDate}+ '.' + fileExt`

        gallery.push(path)

        try {
            const { data, error } = await supabase.storage.from(bucket).upload(path, file)
            if (data) {
                await supabase.from('businesses').update({ gallery: gallery }).eq('id', businesses.id)
            }

        } catch (error) {
            console.error(error)
        }finally{
            file.value = ''
            setImage(null)
            setIsLoading(false)
            window.location.reload()
        }

        // const { data, error } = await supabase.storage.from(bucket).upload( businesses.name.split(' ').join('-') + Date.now() + fileExt, file)
    }
    return <Card>
        <CardHeader>
        </CardHeader>
        <CardContent className='flex justify-center items-center flex-col '>


            <label htmlFor="file" className={`relative w-64 aspect-square flex justify-center items-center ${image === null ? 'bg-gray-600/70' : ''}`}>
                {image === null ? <PlusCircleIcon width={50} height={50} /> : <img src={URL.createObjectURL(image)} alt='imagen' className="w-64 aspect-square object-cover" />}
            <div className={isLoading? "absolute inset-0 flex justify-center items-center bg-gray-900/80" : "hidden" }>Loading...</div>
            </label>
            <input type='file' id='file' hidden onChange={(e) => setImage(e.target.files[0])} />
        </CardContent>
        <CardFooter>
            <Button onClick={() => handleUpload()} variant={image === null ? "ghost" : 'outline'}>Subir Imagen</Button>
        </CardFooter>
    </Card>

}