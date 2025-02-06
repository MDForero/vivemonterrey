'use client'
import { usePathname } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState, use } from "react";
import CardProducts from "@/components/CardProducts"
import ImageSupabase from "@/components/ImageSupabase"
import { actions, useCart, useCartDispatch } from "./CartContext"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Trash2Icon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"


export default function Menu({ params }) {

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
            console.log(products, data.categories_restaurant)
        })
    }, [params])


    return <><div>
        {business && <ImageSupabase buckets={'banners'} url={business.logo} className='w-20 h-20 lg:w-44 lg:h-44  aspect-video object-cover rounded-full' />}
        <div className="container">

            {business?.categories_restaurant && <Tabs defaultValue={business?.categories_restaurant[0]}>
                <ScrollArea className='w-full py-3'>
                    <TabsList className=' gap-2 bg-white z-0'>
                        {business?.categories_restaurant.map(category => <TabsTrigger className='data-[state=active]:text-white data-[state=active]:bg-[#b91c1c] border bg-blue-100' key={category} value={category}>{category}</TabsTrigger>)}
                    </TabsList>
                    <ScrollBar orientation='horizontal' />
                </ScrollArea>
                {business?.categories_restaurant.map(category => <TabsContent key={category} value={category}>
                    <div className="grid grid-cols-1  md:grid-cols-2 gap-4 mx-auto w-fit md:gap-12 pb-16">
                        {products?.filter(product => product.category === category).map(product => <CardProducts key={product.id} product={product} dispatch={dispatch} action={actions.add} />)}
                    </div>
                </TabsContent>)}
            </Tabs>}
        </div>
        <AppSheet />

    </div>
    </>
}

const AppSheet = () => {
    const dispatch = useCartDispatch()
    const cart = useCart()
    return <Sheet >
        <TriggerShopping />
        <SheetContent className="w-[90%] md:w-[540px]">
            <SheetHeader>
                {!(cart.length === 0) ? <SheetTitle className='font-bold'>Subtotal: {cart.map(item => item.quantity * item.price).reduce((acc, value) => acc + value, 0)} COP</SheetTitle> : <></>}
                                        {(cart.length === 0) && <SheetTitle className=' w-full h-screen flex justify-center items-center font-bold'>El carrito esta vacio</SheetTitle>}
            </SheetHeader>
                <div >
                    <div className="space-y-2" >
                        {!(cart.length === 0) && <>
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
                        </>}
                    </div>
                </div>
            <SheetFooter>
                <div >
                    {!(cart.length === 0) ? <Link href='ordenar' asChild><Button className="btn btn-primary float-right" >Pagar</Button></Link> : <></>}
                    {!(cart.length === 0) ? <Button onClick={() => dispatch({ type: actions.clear })} className="float-left" variant='outline'>Limpiar orden</Button> : <></>}
                </div>
            </SheetFooter>
        </SheetContent>
    </Sheet >
}

const TriggerShopping = () => {
    const cart = useCart()
    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        if (cart.length > 0) {
            setAnimate(true)
            setTimeout(() => {
                setAnimate(false)
            }, 1000)
        }
    }, [cart])
    return <>
        <SheetTrigger asChild>
            <Button className='hidden md:block md:absolute top-0  right-0 z-50 '>
                <p className="relative ">  <ShoppingCart className="hidden md:block" />
                    <span className={(animate ? 'animate-ping text-2xl duration-1000' : ' ') + " md:absolute md:-top-3 md:-left-3 font-bold  "}>{cart.reduce((acc, value) => acc + value.quantity, 0)}</span>
                </p>
            </Button>
        </SheetTrigger>
        <SheetTrigger asChild>
            <div className='fixed bottom-0 w-full   md:hidden z-50 '>
                <p className="md:relative m-2 rounded-md bg-blue-200 p-2 text-center text-lg">
                    <span className={(animate ? 'animate-ping text-2xl duration-1000' : ' ') + " md:absolute md:-top-3 md:-left-3 font-bold  "}>{cart.reduce((acc, value) => acc + value.quantity, 0)}</span>

                    <strong className='md:hidden'> Ordenar </strong>
                    <span className="md:hidden font-bold">{cart.reduce((acc, value) => acc + (value.quantity * value.price), 0)}</span>
                </p>
            </div>
        </SheetTrigger>
    </>
}