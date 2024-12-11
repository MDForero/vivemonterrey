'use client'
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

export async function updateProduct(formData) {

  const supabase = createClient()
  const data = {}

  formData.entries().filter(([key, value]) => !['image', 'id'].includes(key)).forEach(element => {
    data[element[0]] = element[1]
  });

  try {
    const { data: dataProduct, error } = await supabase.from('rooms').update(data).eq('id', formData.get('id'))
    console.log(dataProduct)
  } catch (error) {
    console.log('Error updating product: ', error)
  }

}

export async function deleteRoom(id) {
  const supabase = createClient()
  try {

    const { data, error } = await supabase.from('rooms').delete().eq('id', id).select()
    const {data:imageDelete } = await supabase.storage.from('banners').remove(data[0].images)

    if (data) {
      toast('Producto eliminado', {
        description: 'El producto ha sido eliminado con éxito',
        action: {
          label: 'Aceptar',
          onClick: () => window.location.reload()
        }
      })
    }else{
      console.log('Error deleting product: ', error)
    }

  } catch (error) {
    console.log('Error deleting product: ', error)
  }
}