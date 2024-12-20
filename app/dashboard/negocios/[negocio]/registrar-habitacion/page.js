'use client'
import { Button } from "@/components/ui/button";
import { useUserCurrent } from "../../../layout";
import { productRegister } from "./action";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { use, useEffect, useState } from "react";
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
    const [images, setImages] = useState([])
    const [dataProduct, setDataProduct] = useState()
    const [dataBusiness, setDataBusiness] = useState()

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'image') {
            [...e.target.files].forEach(file => {
                console.log(URL.createObjectURL(file))
                setImages((prevImages) => [...prevImages, URL.createObjectURL(file)])
            })
        } else {
            setDataProduct((prevData) => ({ ...prevData, [name]: value }))
        }
    }

    useEffect(() => {
        console.log(images)
    }, [images])

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

    return <section className="flex justify-center ">
        <form action='#' method="POST" className="max-w-2xl w-full">
            {dataBusiness && <input type="hidden" name="negocio" value={dataBusiness.name} />}
            <Card className='max-w-xl '>
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
                        <Label htmlFor='min_occupancy'>Ocupación minima</Label>
                        <Input type='number' name='min_occupancy' id='min_occupancy' onChange={handleChange} />
                    </div>
                    <div>
                        <Label htmlFor='occupancy'>Ocupación</Label>

                        <Input type='number' name='occupancy' id='occupancy' onChange={handleChange} />
                    </div>
                    {/* <div>
            <Label htmlFor='categories'>Categoría</Label>
            <Input name='categories' id='categories' />
            </div> */}
                    
                    <fieldset>
                        <legend className="font-bold">Imagenes</legend>
                        <div className='grid grid-cols-3 gap-2'>
                            {images.map((image, index) => <img key={index} src={image} className='h-44 w-44 object-cover' />)}
                            <div>
                                <Label htmlFor='image' className='h-44 w-44 bg-gray-100  flex justify-center items-center'><PlusCircledIcon className="w-20 h-20" /></Label>
                                <Input name='image' id='image' type='file' multiple className='hidden' onChange={handleChange} />
                            </div>
                        </div>
                    </fieldset>
                    <Input name='profile_id' id='profile_id' value={user?.id} className='hidden' />
                </CardContent>
                <CardFooter>
                    <Button formAction={productRegister}>
                        Registrar
                    </Button>
                </CardFooter>
            </Card>
        </form >

    </section>
}
