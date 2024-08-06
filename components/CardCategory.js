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
    <Link href={name} className=" group w-52 h-52 border-2 relative overflow-hidden rounded-xl ">
      <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center group-hover:justify-end items-center group-hover:bg-slate-950/30 bg-white duration-1000 z-10 text-black group-hover:text-white">
      {iconUrl ? <Image src={iconUrl} width={0} height={0} className="group-hover:hidden w-20 h-20"/>  : null}
        <h1 className="font-bold capitalize">{name} </h1>
        <p className="group-hover:block hidden text-pretty text-center">Contamos con mas de {data.businesses.length} {name}</p>
      </div>
      {imageUrl ? <Image src={imageUrl} alt="" width={0} height={0} className=" group-hover:scale-125 w-80 h-80 object-cover duration-200" /> : null}

    </Link>
  )
}

export default CardCategory