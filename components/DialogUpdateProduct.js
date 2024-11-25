'use client'
import { useUserCurrent } from '@/app/dashboard/layout'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import ImageSupabase from './ImageSupabase'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import Image from 'next/image'
import { updateProduct } from '@/app/dashboard/negocios/[negocio]/menu/action'
import { set } from 'react-hook-form'
import { toast } from 'sonner'

const DialogUpdateProduct = ({ product }) => {

  const { user } = useUserCurrent()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  const [image, setImage] = useState()
  const [fileImage, setFileImage] = useState()
  const [data, setData] = useState({})


  const handleImage = async (e) => {
    const file = e.target.files[0]
    setImage(URL.createObjectURL(file))
    setFileImage(file)
  }

  const updateImage = async () => {
    setLoading(true)
    try {
      await supabase.storage.from('banners').update(product.image, fileImage, { upsert: true })
      toast('Imagen actualizada', {
        description: 'La imagen ha sido actualizada con éxito',
        action: {
          label: 'Aceptar',
          onClick: () => window.location.reload()
        }
      })

    } catch (error) {
      console.log('Error uploading image: ', error)
    }
    setLoading(false)
  }


  return (

    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Actualizar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
          <Label htmlFor=''>Nombre</Label>
        <form action='#' method='POST'>
          <DialogHeader>
            <DialogTitle>Actualizar Producto</DialogTitle>
          </DialogHeader>
          <Card className='max-w-2xl'>
            <CardHeader>
              <CardTitle>Actualizar Producto</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              <Label htmlFor='image' className='relative'>
                {image ? <Image src={image} className='mx-auto w-44 object-cover aspect-square rounded-full' width={0} height={0} /> : <ImageSupabase buckets='banners' url={product.image} className='mx-auto w-44 object-cover aspect-square rounded-full' />}
                {image && <Button type='button' onClick={updateImage}>Cambiar</Button>}
                {loading && <span>Cargando...</span>}
              </Label>
              <div>
                <Label htmlFor='name'>Nombre</Label>
                <Input name='name' id='name' defaultValue={product.name} type='text' />
              </div>

              <div>
                <Label htmlFor='description'>Descripción</Label>
                <Textarea name='description' id='description' defaultValue={product.description} />
              </div>
              <div>
                <Label htmlFor='price'>Precio</Label>
                <Input type='number' step='500' name='price' id='price' defaultValue={product.price} />
              </div>
              {/* <div>
            <Label htmlFor='categories'>Categoría</Label>
            <Input name='categories' id='categories' defaultValue={product.categories} />
            </div> */}
              <div className=" flex gap-8">
                <Checkbox name='isoutstanding' className='w-4 h-4' id='isoutstanding' label='Destacado' checked={product.isoutstanding} />
                <Checkbox name='isvegetarian' className='w-4 h-4' id='isvegetarian' label='Vegetariano' checked={product.isvegetarian} />
                <Checkbox label='Bebida' name='isdrink' className='w-4 h-4' id='isdrink' checked={product.isdrink} />
              </div>
              <div>
                <Input name='image' id='image' type='file' onChange={handleImage} className='hidden' />
              </div>

              <Input name='profile_id' id='profile_id' value={user?.id} className='hidden' />
              <Input name='id' id='id' value={product?.id} className='hidden' />

            </CardContent>
          </Card>
          <DialogFooter>
            <Button type='submit' formAction={updateProduct}>Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


const Checkbox = ({ name, label, checked }) => {
  const [check, setCheck] = useState(checked)
  return (
    <div className="flex gap-1 items-center">
      <Input name={name} className='w-4 h-4' id={name} checked={check} type='checkbox' value={check} onChange={() => setCheck(!check)} />
      <Label htmlFor={name}>{label}</Label>
    </div>
  )
}


export default DialogUpdateProduct