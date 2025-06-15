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
    const businessName = decodeURI(path.split('/')[2])
    const [loading, setLoading] = useState(true)

    const [products, setProducts] = useState()
    const [business, setBusiness] = useState()

    useEffect(() => {
        const getPoducts = async () => {
            console.log(businessName, 'businessName')
            const { data, error } = await supabase.from('businesses').select('* ,  products(*)').eq('enlace', businessName).single()
            console.log(data, error, 'data')
            if (data) {
                setBusiness(data)
                setProducts(data.products)
                console.log(data, 'data business')
                setLoading(false)
            } else {
                console.log('Error fetching products:', error)
            }
        }
        getPoducts()
        console.log('useEffect', businessName, 'businessName')
    }, [loading])

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <Image src='/loading.gif' alt='Loading' width={100} height={100} />
        </div>
    } else if (products.length === 0) {
        return <div className="flex flex-col justify-center items-center h-screen ">
            <h1 className="text-2xl font-bold">No hay productos disponibles</h1>
            <Link href={path.split('/').slice(0,-2).join('/')} className="btn btn-primary  bg-green-700 text-white font-semibold float-right py-2 px-4 rounded-md " ></Link>
        </div>
    } else {

        return <>
            {business && <ImageSupabase buckets={'banners'} url={business.logo} className='w-36 md:w-40 lg:w-56 xl:w-80 aspect-video object-contain' />}
            <div className="container">

                {business?.categories_restaurant && <Tabs defaultValue={business?.categories_restaurant[0]}>
                    <ScrollArea className='w-full py-3'>
                        <TabsList className=' gap-2 bg-white z-0'>
                            {business?.categories_restaurant.map(category => <TabsTrigger className='data-[state=active]:text-white data-[state=active]:bg-[#3F7D58] border bg-blue-100' key={category} value={category}>{category}</TabsTrigger>)}
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

        </>
    }
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
                                    <TableCell>Productos</TableCell>
                                    <TableCell>Precio</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>

                                {cart?.map(item => <TableRow key={item.id} >
                                    <TableCell className=" h-fit text-xs text-left w-36"> {item.quantity} x {item.category} {item.name} </TableCell>
                                    <TableCell className="text-left font-semibold">{item.price * item.quantity}</TableCell>
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
                <div className="w-full">
                    {!(cart.length === 0) ? <Link href='ordenar' className="btn btn-primary bg-primary text-white font-semibold float-right py-2 px-4 rounded-md">Ordenar</Link> : <></>}
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
            <div className='fixed bottom-0  inset-x-0 max-w-96 mx-auto w-full p-2 cursor-pointer '>
                <p className="md:relative m-2 rounded-md bg-[#3F7D58] p-2 text-center text-white text-lg">
                    <span className={(animate ? 'animate-ping text-2xl duration-1000' : ' ') + " font-bold  "}>{cart.reduce((acc, value) => acc + value.quantity, 0)}</span>

                    <strong className=''> Ordenar </strong>
                    <span className=" font-bold">{cart.reduce((acc, value) => acc + (value.quantity * value.price), 0)}</span>
                </p>
            </div>
        </SheetTrigger>
    </>
}