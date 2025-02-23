'use client'
import { Table, TableBody, TableCell, TableFooter, TableHeader, TableRow } from "@/components/ui/table"
import { actions, useCart, useCartDispatch } from "../../../../../components/CartContext"
import { Button } from "@/components/ui/button" 
import { Radio, Trash2Icon } from "lucide-react"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import ImageSupabase from "@/components/ImageSupabase"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState, use } from "react";
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function Page(props) {
    const params = use(props.params);

    const cart = useCart()
    const dispatch = useCartDispatch()
    const messageCart = cart.map(item => `%0A *${item.name.trim()}* x ${item.quantity}`).join(', ')
    const supabase = createClient()
    const [business, setBusiness] = useState(null)

    const handleSend = (formData) => {
        const send = document.getElementById('send')
        const message = `Hola, soy *${encodeURIComponent(formData.get('name')).trim()}*, quiero ordenar: ${messageCart} %0AMétodo de pago: *${formData.get('payment')}*  %0AMi dirección es: *${encodeURIComponent(formData.get('address')).trim()}* %0AMi teléfono es: *${formData.get('tel')}*`
        send.setAttribute('href', `https://api.whatsapp.com/send?phone=57${business.phone}&text=${message}`)
        send.click()
    }

    useEffect(() => {

        async function getData() {
            const { data, error } = await supabase.from('businesses').select('*').eq('enlace', params.negocio).single()
            if (error) {
                console.error(error)
                return
            }
            setBusiness(data)
        }
        if (params) {
            getData()
        }
    }, [params])

    return <div className="flex flex-col w-screen space-y-8 justify-center items-center mx-auto">
        {/* {business?.logo && <ImageSupabase buckets='banners' url={business?.logo ?? null} className='w-44 p-2 mx-auto' />} */}
        <Card>
            <CardContent>
                <h1 className="text-3xl font-bold text-center mt-12">Generar Orden</h1>
                <h2 className="text-xl font-bold text-center mt-4">Complete la información y revise su orden</h2>


                <form  action={handleSend} className="">
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
                        <Input
                            id='address'
                            name='address'
                            type='text'
                            pattern="[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,-]*"
                            title="Solo se permiten letras, números, espacios y algunos signos como .,-"
                            placeholder='Calle x xx - xx'
                            required

                        />
                    </div>
                    <div>
                        <fieldset className="border p-2 ">
                            <legend className="font-bold">Método de pago</legend>
                            <RadioGroup id='payment' name='payment' defaultValue='efectivo' >
                                <div className="flex items-center space-x-2 ">
                                    <RadioGroupItem id='efectivo' value='efectivo' />
                                    <Label htmlFor='efectivo' className='capitalize'>efectivo</Label>
                                </div>
                                <div className="flex items-center space-x-2 ">
                                    <RadioGroupItem id='tarjeta' value='tarjeta' />
                                    <Label htmlFor='tarjeta' className='capitalize'>Tarjeta</Label>
                                </div>
                                <div className="flex items-center space-x-2 ">
                                    <RadioGroupItem id='transferencia' value='transferencia' />
                                    <Label htmlFor='transferencia' className='capitalize'>Transferencia</Label>
                                </div>
                            </RadioGroup>
                        </fieldset>
                    </div>
                    <Table className=''>
                        <TableHeader className='font-bold text-xl'>
                            <TableRow>
                                <TableCell colSpan={5} >Resumen de la orden</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cart?.map(item => <TableRow key={item.id} >
                                {/* <TableCell><Image src={item.image} alt={item.name} width={50} height={50} className="rounded-full aspect-square object-cover" /></TableCell> */}

                                <TableCell className=" h-fit text-sm text-left w-96"><strong>{item.name}</strong> x {item.quantity}</TableCell>
                                <TableCell className="text-left font-bold">{item.price}</TableCell>
                                <TableCell className="text-left font-bold w-4"><Button className='p-1' onClick={() => {
                                    dispatch({
                                        type: actions.remove, payload: item
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
            </CardContent>
        </Card>
        <a href='#' id='send' target="_blank" className="hidden">Enviar</a>
        <div>
            <img src="/logo.svg" alt="logo" className="w-44" />
        </div>
    </div>
}