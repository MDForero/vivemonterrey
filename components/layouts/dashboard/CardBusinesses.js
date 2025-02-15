'use client'
import ImageSupabase from "@/components/ImageSupabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableCell, TableRow, } from "@/components/ui/table"
import { createClient } from "@/utils/supabase/client"
import { set } from "date-fns"
import { Settings2, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function CardBusinesses({ business }) {

    const supabase = createClient()
    const router = useRouter()
    const [name, setName] = useState('')

    console.log(business, 'business_admin')

    const handleDelete = async () => {
        const name = document.getElementById('name').value

        if (name !== business?.name) {
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

            const { data, error } = await supabase.from('businesses').select('*, categories(id)').eq('name', business?.name).single()
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
                } catch (error) {
                    console.error(error)
                }
            }

            await supabase.from('businesses').delete().eq('name', business?.name)

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
    useEffect(() => {
        const getProfile = async () => {
            const { data: profile, error } = await supabase.from('profiles').select('full_name').eq('id', business?.profile_id).single()
            if (error) {
                console.error(error)
                return
            }
            setName(profile?.full_name)
        }
        getProfile()
    }, [business.name])


    return <TableRow key={business?.id}>
        <TableCell className='flex justify-center'>
            <ImageSupabase url={business?.logo} buckets='banners' alt={business?.name} className='h-20 w-20 object-contain' />
        </TableCell>
        <TableCell>
            {business?.name}
        </TableCell>
        <TableCell>
            {name}
        </TableCell>
        <TableCell>
            {business?.categories.map((category) => <p key={category?.name}>{category?.name}</p>)}
        </TableCell>
        <TableCell className=''>
            <Button variant='outline'>
                <a href={business?.enlace}>
                    <Settings2 />
                </a>
            </Button>
        </TableCell>
        <Dialog>
            <TableCell className=''>
                <DialogTrigger asChild>
                    <Button variant="destructive"><Trash2 /></Button>
                </DialogTrigger>
            </TableCell>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Eliminar Negocio</DialogTitle>
                    <DialogDescription>
                        Estas seguro de que deseas eliminar este negocio? Esta acción no se puede deshacer.
                        Para eliminar este negocio, por favor, escribe el nombre del negocio <strong>{business?.name}</strong> a continuación.
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
    </TableRow>

}