'use client'
import { Button } from "@/components/ui/button";
import { useUserCurrent } from "../../../layout";
import { productRegister } from "./action";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState, use } from "react";
import { Separator } from "@/components/ui/separator";
import { object } from "zod";
import { PlusCircle, PlusCircleIcon } from "lucide-react";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createClient } from "@/utils/supabase/client";

export default function Page(props) {
    const params = use(props.params);

    const supabase = createClient()
    const { user } = useUserCurrent()
    const [dataProduct, setDataProduct] = useState()
    const [dataBusiness, setDataBusiness] = useState()

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'image') {
            const file = e.target.files[0]
            const url = URL.createObjectURL(file)
            setDataProduct((prevData) => ({ ...prevData, [name]: url }))
            return
        }

        setDataProduct((prevData) => ({ ...prevData, [name]: value }))
    }


    useEffect(() => {
        async function getData() {
            const { data, error } = await supabase.from('businesses').select('*').eq('name', decodeURI(params.negocio).split('-').join(' ')).single()
            if (error) {
                console.error(error)
                return
            }
            setDataBusiness(data)
        }
        if (params) {
            getData()
        }
    }, [params.negocio])

    return <section className="flex">
        <form action='#' method="POST">
            {dataBusiness && <input type="hidden" name="negocio" value={dataBusiness.name} />}
            <Card className='max-w-2xl'>
                <CardHeader>
                    <CardTitle>Registrar Producto</CardTitle>
                </CardHeader>
                <CardContent className='space-y-2'>
                    <div>
                        <Label htmlFor='name'>Nombre</Label>
                        <Input name='name' id='name' onChange={handleChange} />
                    </div>

                    <div>
                        <Label htmlFor='description'>Descripción</Label>
                        <Textarea name='description' id='description' onChange={handleChange} />
                    </div>
                    <div>
                        <Label htmlFor='price'>Precio</Label>
                        <Input type='number' step='500' name='price' id='price' onChange={handleChange} />
                    </div>
                    {/* <div>
            <Label htmlFor='categories'>Categoría</Label>
            <Input name='categories' id='categories' />
            </div> */}
                    <div className=" flex gap-8">
                        <div className="flex gap-1 items-center">
                            <Input name='isoutstanding' className='w-4 h-4' id='isoutstanding' type='checkbox' value='true' onChange={handleChange} />
                            <Label htmlFor='isOutStanding'>Destacado</Label>
                        </div>
                        <div className="flex gap-1 items-center">
                            <Input name='isvegetarian' className='w-4 h-4' id='isvegetarian' type='checkbox' value='true' onChange={handleChange} />
                            <Label htmlFor='isVegetarian'>Vegetariano</Label>
                        </div>
                        <div className="flex gap-1 items-center">
                            <Input name='isdrink' className='w-4 h-4' id='isdrink' type='checkbox' value='true' onChange={handleChange} />
                            <Label htmlFor='isDrink'>Bebida</Label>
                        </div>
                    </div>
                    <fieldset className="border p-2 ">
                        <legend className="font-bold">Categoría</legend>
                        {dataBusiness?.categories_restaurant !== null &&
                            <RadioGroup id='category' name='category' >
                                {dataBusiness?.categories_restaurant?.map(category => <div key={category} className="flex items-center space-x-2 ">
                                    <RadioGroupItem id={category.split(' ').join('-')} value={category} />
                                    <Label htmlFor={category.split(' ').join('-')} className='capitalize'>{category}</Label>
                                </div>)}
                            </RadioGroup>
                        }
                    <Input name='other_category' id='other_category' placeholder='' />
                    </fieldset>
                    <div>
                        <Label htmlFor='image'>Imagen</Label>
                        <Input name='image' id='image' type='file' onChange={handleChange} />
                    </div>
                    <Input name='profile_id' id='profile_id' value={user?.id} className='hidden' />
                </CardContent>
                <CardFooter>
                    <Button formAction={productRegister}>
                        Registrar
                    </Button>
                </CardFooter>
            </Card>
        </form >
        <Card className='max-w-2xl'>
            <CardHeader>
                <CardTitle>Vista en escritorio</CardTitle>
                <CardDescription>Este es el aspecto que tendrá tu producto en la web.</CardDescription>
                <Separator />
            </CardHeader>
            <CardContent>
                <article className="">
                    <Card className='flex max-w-96 px-0 items-center'>
                        <div className="w-3/5 flex flex-col h-full justify-center gap-4 py-3">

                            <CardHeader className='py-0'>

                                <CardTitle className='line-clamp-1 hover:line-clamp-none'>{dataProduct?.name ?? 'Hamburguesa Mexicana 500g'} </CardTitle>
                            </CardHeader>
                            <CardContent className='py-0'>

                                <p className=" tracking-tighter  text-pretty text-sm font-light line-clamp-2">{dataProduct?.description ?? 'La hamburguesa mexicana es una deliciosa fusión de sabores que combina la suculencia de la carne con ingredientes típicos de la gastronomía nacional. Desde el uso de tortillas en lugar de pan, hasta la incorporación de guacamole, jalapeños y salsas picantes, cada bocado es una explosión de tradición y creatividad.'} </p>
                                {/* <div className="flex">
                                    {dataProduct?.isoutstanding && <p>{dataProduct.isoutstanding} </p>}
                                    {dataProduct?.isvegetarian && <p>{dataProduct.isvegetarian} </p>}
                                    {dataProduct?.isdrink && <p>{dataProduct.isdrink} </p>}
                                </div> */}
                            </CardContent>
                            <CardFooter className='py-0'>
                                <CardTitle>{dataProduct?.price ?? 50000} </CardTitle>
                            </CardFooter>
                        </div>
                        <div className="w-2/5 relative">
                            <img src={dataProduct?.image ?? '/assets/AdobeStock_233702538.jpg'} width={0} height={0} className="w-full h-full object-cover aspect-square rounded-xl" />
                            <div className="absolute bottom-0 right-0 h-16 w-16 bg-white/90 flex justify-center items-center rounded-tl-3xl rounded-br-xl"><PlusCircleIcon className="fill-black w-8 h-8 stroke-white" /></div>
                        </div>
                    </Card>
                </article>
                <article>

                    <Card>
                        <CardHeader>
                            <CardTitle>Vista Movil</CardTitle>
                            <CardDescription>Este es el aspecto que tendrá tu producto en la web.</CardDescription>
                            <Separator />
                        </CardHeader>
                        <CardContent>
                            <div className="w-32 border-2 p-1 place-items-center rounded-xl shadow-xl">
                                <img src={dataProduct?.image ?? '/assets/AdobeStock_233702538.jpg'} className="w-full aspect-square object-cover rounded-xl" />
                                <p className="font-bold font-englebert tracking-wider text-sm text-center">{dataProduct?.name ?? 'Hamburguesa Mexicana 500g'} </p>
                                <div className=" bg-white/90 flex justify-between w-full items-center rounded-tl-3xl rounded-br-xl">
                                    <p>{dataProduct?.price ?? 25000} </p>
                                    <PlusCircleIcon className="fill-black w-8 h-8 stroke-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </article>
            </CardContent>
        </Card>
    </section>
}
