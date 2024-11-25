'use client'
import ImageSupabase from "@/components/ImageSupabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/utils/supabase/client"
import { Settings2, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"

export default function CardBusinesses({ business }) {

    const supabase = createClient()
    const router = useRouter()

    const handleDelete = async () => {

        const name = document.getElementById('name').value

        if (name !== business.name) {
            toast('El nombre no coincide con el escrito', {
                description: 'Vuelve a intentarlo',
                action: {
                    label: 'Ir a negocios',
                    onClick: () => console.log('alerta de que no escribio bien'),
                }
            }
            )
            return
        }

        try {

            const { data, error } = await supabase.from('businesses').select('*, categories(id)').eq('name', business.name).single()
            console.log(data, 'data', error)
            if (data?.banner_url) {
                try {
                    await supabase.storage.from('banners').remove([data.banner_url])
                } catch (error) {
                    console.error(error)
                }
            }
            if (data?.gallery) {
                try {
                    await supabase.storage.from('gallery').remove(data.gallery)
                }catch (error) {
                    console.error(error)
                }
            }

            await supabase.from('businesses').delete().eq('name', business.name)

            if (data) {
                toast('Negocio eliminado', {
                    description: 'El negocio ha sido eliminado con éxito',
                    action: {
                        label: 'Ir a negocios',
                        onClick: () => router.push('/dashboard/negocios'),
                    }
                }
                )
            }
        } catch (error) {
            console.error(error)
            return
        }
    }

    return <Card key={business.id} className='max-w-96'>
        <CardHeader>
            <CardTitle>{business.name}</CardTitle>
        </CardHeader>
        <CardContent>
            <ImageSupabase buckets='banners' url={business.banner_url} className='w-full aspect-video' />
        </CardContent>
        <CardFooter className='flex justify-between'>
            <Button variant='outline'>
                <a href={business.name}>
                    <Settings2 />
                </a>
            </Button>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="destructive"><Trash2 /></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Eliminar Negocio</DialogTitle>
                        <DialogDescription>
                            Estas seguro de que deseas eliminar este negocio? Esta acción no se puede deshacer.
                            Para eliminar este negocio, por favor, escribe el nombre del negocio <strong>{business.name}</strong> a continuación.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Negocio
                            </Label>
                            <Input id="name" className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant='destructive' onClick={() => handleDelete()}>Eliminar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </CardFooter>
    </Card>

}