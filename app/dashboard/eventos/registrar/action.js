import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner"
export async function  registerEvent(formData) {

    const supabase = createClient()

    const data = {}
    const image = formData.get('image')
    const fileExt = image.name.split('.').pop()
    const name = formData.get('name')
        .split(' ')
        .join('-')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ñ/g, 'n')
    const fileName = `eventos/${name}/${Date.now()}.${fileExt}`
    formData.forEach((value, key) => key !== 'image' ? data[key] = value : data[key] = fileName)

    const { data: storage, error: errorStorage } = await supabase.storage.from('banners').upload(fileName, image)
    const { data: events, error: errorEvents } = await supabase.from('events').insert(data)

    if (errorStorage || errorEvents) {
        console.log(errorStorage, errorEvents)
        return
    }
   

    toast('Evento registrado exitosamente', {
        description: 'El evento ha sido registrado con éxito',
        action: {
            label: 'Ir a eventos',
            onClick: () => window.location.href = '/dashboard/eventos'
        }
    })
}