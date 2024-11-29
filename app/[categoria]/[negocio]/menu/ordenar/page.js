'use client'
import { Table, TableBody, TableCell, TableFooter, TableHeader, TableRow } from "@/components/ui/table"
import { actions, useCart, useCartDispatch } from "../CartContext"
import { Button } from "@/components/ui/button"
import { Trash2Icon } from "lucide-react"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { usePathname } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import ImageSupabase from "@/components/ImageSupabase"

export default async function Page({ params }) {

    const supabase = createClient()
    const cart = useCart()
    const dispatch = useCartDispatch()

    const handleSend = (formData) => {
        console.log(formData.get('name'))
        const send = document.getElementById('send')
        const message = `Hola, soy ${formData.get('name')}, quiero ordenar: ${cart.map(item => `%0A${item.name} x ${item.quantity}`).join('')} %0ADirección: ${formData.get('address')}`
        send.setAttribute('href', `https://api.whatsapp.com/send?phone=573108854737&text=${message}`)
        send.click()
    }
    const { negocio } = params
    const {data:business, error} = await supabase.from('businesses').select('name, logo').eq('name', decodeURI(negocio).split('-').join(' ')).single()
    console.log(business)

    return <div className="flex flex-col w-screen justify-center items-center">
        {business && <ImageSupabase buckets='banners' url={business?.logo} className='w-44 p-2 mx-auto'/>}
        <h1 className="text-3xl font-bold text-center mt-12">Generar Orden</h1>
        <h2 className="text-xl font-bold text-center mt-4">Complete la información y revise su orden</h2>
        <form method="POST" action="#">
            <div>
                <Label htmlFor='name'>Nombre</Label>
                <Input id='name' name='name' type='text' placeholder='Juan Perez' />
            </div>
            <div>
                <Label htmlFor='tel'>Teléfono</Label>
                <Input
                    id='tel'
                    name='tel'
                    type='tel'
                    pattern='3\d{2}\s?\d{3}\s?\d{4}'
                    title='Ingresa un número móvil válido con el formato +57 300 123 4567'
                    placeholder='300 123 4567'
                    required
                />
            </div>
            <div>
                <Label htmlFor='address'>Dirección</Label>
                <Input id='address' name='address' placeholder='Calle x xx - xx' />
            </div>
            <div>
                <Label htmlFor='payment'>Modalidad de pago</Label>

            </div>
            <Table className=''>
                <TableHeader className='font-bold text-xl'>
                    <TableRow>
                        <TableCell colSpan={5} >Resumen de la orden</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cart?.map(item => <TableRow key={item.id} >
                        <TableCell><Image src={item.image} alt={item.name} width={50} height={50} className="rounded-full aspect-square object-cover" /></TableCell>

                        <TableCell className=" h-fit text-sm text-left w-96"><strong>{item.name}</strong> x {item.quantity}</TableCell>
                        <TableCell className="text-left font-bold">{item.price}</TableCell>
                        <TableCell className="text-left font-bold w-4"><Button className='p-1' onClick={() => {
                            dispatch({
                                type: actions.remove, payload: { id: item.id }
                            })
                        }}><Trash2Icon /></Button></TableCell>
                    </TableRow>)}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={5} className='text-right font-bold'>Subtotal: {cart.map(item => item.quantity * item.price).reduce((acc, value) => acc + value, 0)} COP</TableCell>
                    </TableRow>

                </TableFooter>
            </Table>
            <Button formAction={handleSend} className='w-full'>Generar orden</Button>
        </form>
        <a href='#' id='send' target="_blank" className="hidden">Enviar</a>
        <div>
            <img src="/logo.svg" alt="logo" className="w-44"/>
        </div>
    </div>
}