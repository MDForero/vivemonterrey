'use client'
import { usePathname } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import CardProducts from "@/components/CardProducts"
import ImageSupabase from "@/components/ImageSupabase"
import { actions, useCart, useCartDispatch } from "./CartContext"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarInset, SidebarMenu, SidebarRail, useSidebar } from "@/components/ui/sidebar"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { ShoppingCart, Trash2Icon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"


export default function Page() {

    const supabase = createClient()

    const dispatch = useCartDispatch()
    const path = usePathname()
    const businessName = decodeURI(path.split('/')[2]).split('-').join(' ')

    const [products, setProducts] = useState()
    const [business, setBusiness] = useState()


    const getPoducts = async () => {
        const { data, error } = await supabase.from('businesses').select('* ,  products(*)').eq('name', businessName).single()
        return { data, error }
    }

    useEffect(() => {
        getPoducts().then(({ data, error }) => {
            if (error) {
                console.error(error)
                return
            }
            setProducts(data.products)
            setBusiness(data)
            console.log(data)
        })
    }, [])

    return <>
        <TriggerShopping />
        <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4"> 

                {business && <ImageSupabase buckets='banners' url={business?.image_restaurant} className='w-full h-[400px] aspect-video object-cover ' />}
                <h1 className="text-3xl font-bold text-center mt-12">{businessName}</h1>
                <section className="flex mx-auto justify-center items-center gap-12" >{
                    products?.map(product => <CardProducts key={product.id} product={product} dispatch={dispatch} action={actions.add} />)
                }</section>
            </div>
        </SidebarInset>
        <AppSidebar />

    </>
}

const AppSidebar = () => {
    const { state } = useSidebar()
    const dispatch = useCartDispatch()
    const cart = useCart()
    useEffect(() => {

    }, [cart])
    return <Sidebar side='right' collapsible='offcanvas' variant='icon' className={(state === 'collapsed' ? 'h-0 w-0 ' : 'h-fit ') + 'absolute'} >
        <SidebarHeader>
            {!(cart.length === 0) ? <SidebarGroup className='font-bold'>Subtotal: {cart.map(item => item.quantity * item.price).reduce((acc, value) => acc + value, 0)} COP</SidebarGroup> : <></>}
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarMenu>
                    <div className={(state === 'collapsed' ? 'hidden' : '')}>
                        <div className="space-y-2">
                            {!(cart.length === 0) ? <></> : <SidebarGroup className='font-bold'>El carrito esta vacio</SidebarGroup>}
                            <Table>
                                <TableHeader>
                                    <TableRow className='font-bold'>
                                        <TableCell>Imagen</TableCell>
                                        <TableCell>Productos</TableCell>
                                            <TableCell>Precio</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>

                                    {cart?.map(item => <TableRow key={item.id} >
                                        <TableCell><Image src={item.image} alt={item.name} width={50} height={50} className="rounded-full aspect-square object-cover" /></TableCell>
                                        <TableCell className=" h-fit text-sm text-left w-36"><strong>{item.name.split(' ')[0].slice(0, 1) + ' ' + item.name.split(' ').slice(1, -1).join(' ')}</strong> x{item.quantity}</TableCell>
                                        <TableCell className="text-left font-bold">{item.price * item.quantity}</TableCell>
                                        <TableCell className="text-left font-bold w-4"><Button className='p-1' onClick={() => {
                                            dispatch({
                                                type: actions.remove, payload: { id: item.id }
                                            })
                                        }}><Trash2Icon /></Button></TableCell>
                                    </TableRow>)}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </SidebarMenu>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <div className={(state === 'collapsed' ? 'hidden' : '')}>
                {!(cart.length === 0) ? <Link href='ordenar' asChild><Button className="btn btn-primary float-right" >Pagar</Button></Link> : <></>}
                {!(cart.length === 0) ? <Button onClick={() => dispatch({ type: actions.clear })} className="float-left" variant='outline'>Limpiar orden</Button> : <></>}
            </div>
        </SidebarFooter>
        <SidebarRail />
    </Sidebar>
}

const TriggerShopping = () => {
    const { toggleSidebar } = useSidebar()
    return <Button onClick={toggleSidebar} className='absolute right-0 z-50'> <ShoppingCart /> Carrito</Button>
}
