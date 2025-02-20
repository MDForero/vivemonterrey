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
    const {data:dataProduct, error} = await supabase.from('products').update(data).eq('id', formData.get('id'))
    toast.success('Producto actualizado')
  } catch (error) {
    console.log('Error updating product: ', error)
  }

}

export async function deleteProduct(id) {
  const supabase = createClient()
  try {
    const {data, error} = await supabase.from('products').delete().eq('id', id)
    toast('Producto eliminado', {
      description: 'El producto ha sido eliminado con éxito',
      action: {
        label: 'Aceptar',
        onClick: () => window.location.reload()
      }
    })
  } catch (error) {
    console.log('Error deleting product: ', error)
  }
}