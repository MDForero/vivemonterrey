'use client'
import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import ImageSupabase from './ImageSupabase'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import Image from 'next/image'
import { updateProduct } from '@/app/dashboard/negocios/[negocio]/menu/action'
import { Pencil } from 'lucide-react'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const DialogUpdateProduct = ({ product, businessLink, categories_restaurant }) => {
  console.log(businessLink)

  const supabase = createClient()

  const [loading, setLoading] = useState(false)


  const [image, setImage] = useState('')
  const [fileImage, setFileImage] = useState('')


  const handleImage = async (e) => {
    const file = e.target.files[0]
    setImage(URL.createObjectURL(file))
    setFileImage(file)
  }

  const updateImage = async () => {
    setLoading(true)

    if (product.image.endsWith('.') || !product.image) {
      const fileExt = fileImage.name.split('.').pop()
      const pathFile = `${businessLink}/productos/${product.name.split(' ').join('-')}.${fileExt}`

      const { data, error } = await supabase.from('products').update({ image: pathFile }).eq('id', product.id)

      if (error) {
        toast.error('Error al actualizar la imagen')
        return
      } else {
        await supabase.storage.from('banners').upload(pathFile, fileImage)
      }
      toast.success('Imagen actualizada')
      setLoading(false)
      return
    }
    const { data, error } = await supabase.storage.from('banners').update(product.image, fileImage, { upsert: true })
    if (error) {
      toast.error('Error al actualizar la imagen')
      return
    }
    toast.success('Imagen actualizada')
    setLoading(false)
  }



  return (

    <Dialog>
      <DialogTrigger asChild className='cursor-pointer'>
        <Pencil />
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
                {image ? <Image src={image} className='mx-auto w-44 object-cover aspect-square rounded-full' alt={`imagen de ${product?.name}`} width={0} height={0} /> : <ImageSupabase buckets='banners' url={product.image} className='mx-auto w-44 object-cover aspect-square rounded-full' />}
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
                <Input type='number' step='50' name='price' id='price' defaultValue={product.price} />
              </div>

              {/* <div>
            <Label htmlFor='categories'>Categoría</Label>
            <Input name='categories' id='categories' defaultValue={product.categories} />
            </div> */}
              <fieldset className="border p-2 space-y-2 ">
                <legend className="font-bold">Categoría</legend>
                {categories_restaurant !== null &&
                  <Select name="category" id="category" defaultValue={product.category}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent >
                      {categories_restaurant?.map(category => <SelectItem value={category} key={category}>{category}</SelectItem>)}
                    </SelectContent>
                  </Select>
                }
              </fieldset>
              <div className=" flex gap-8">
                <Checkbox name='isoutstanding' className='w-4 h-4' id='isoutstanding' label='Destacado' checked={product.isoutstanding} />
                <Checkbox name='isvegetarian' className='w-4 h-4' id='isvegetarian' label='Vegetariano' checked={product.isvegetarian} />
                <Checkbox label='Bebida' name='isdrink' className='w-4 h-4' id='isdrink' checked={product.isdrink} />
              </div>
              <div>
                <Input name='image' id='image' type='file' onChange={handleImage} className='hidden' />
              </div>
              <Input name='id' id='id' value={product?.id} readOnly className='hidden' />

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