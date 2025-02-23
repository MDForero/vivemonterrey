'use client'
import { createClient } from "@/utils/supabase/client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const CardCategory = (data) => {
  const supabase = createClient()
  const [imageUrl, setImageUrl] = useState(null)
  const [iconUrl, setIconUrl] = useState(null)
  const { name, image_url, icon_category } = data


  useEffect(() => {
    async function downloadImage(path) {
      try {
        const { data, error } = await supabase.storage.from('categories_image').download(path)
        if (error) {
          throw error
        }
        const url = URL.createObjectURL(data)
        console.log(url, data)
        setImageUrl(url)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }
    if (image_url) downloadImage(image_url)

  }, [image_url, supabase])

  useEffect(() => {
    async function downloadIcon(path) {
      try {
        const { data, error } = await supabase.storage.from('categories_image').download(path)
        if (error) {
          throw error
        }
        const url = URL.createObjectURL(data)
        setIconUrl(url)      
      } catch (error) {
        console.log('Error downloading icon: ', error)
      }
    }
    if (icon_category) downloadIcon(icon_category)
  }, [icon_category, supabase])

  console.log(data)

  return (
    <Link href={name.split(' ').join('-')} className=" group w-80 aspect-video border-2 relative overflow-hidden rounded-xl ">
      <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center group-hover:justify-end items-center bg-slate-950/40 duration-1000 z-10 text-white">
      {/* {iconUrl ? <Image loading='lazy' alt={`Icono que representa la categoría ${name}`} src={iconUrl} width={0} height={0} className="group-hover:hidden w-20 h-20"/>  : null} */}
        <h1 className="font-bold capitalize text-xl">{name} </h1>
      </div>
      {imageUrl ? <Image loading='lazy' src={imageUrl} alt={`imagen que representa la categoría ${name}`}  width={0} height={0} className=" group-hover:scale-125 w-full object-cover duration-200" /> : null}

    </Link>
  )
}

export default CardCategory