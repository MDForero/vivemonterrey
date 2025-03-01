'use client'
import { useState, useEffect, use } from 'react';
import { createClient } from '@/utils/supabase/client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ImageSupabase from '@/components/ImageSupabase'
import ImageDelete from '@/components/layouts/dashboard/ImageDelete'
import UploadImage from '@/components/forms/UploadImage'
import InputAmenities from '@/components/inputs/InputAmenities'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { actionAmenities, actionContact, actionSchedule, actionSocialsAccount, actionUpdateData, actionUpdateImage } from './action'
import ClosedOrTwentyFour from '@/components/ClosedOrTwentyFour'
import { Separator } from '@/components/ui/separator'


export default function Page(props) {
    const params = use(props.params);
    const [businessData, setBusinessData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [categories, setCategories] = useState(null)
    const supabase = createClient()
    const [logo, setLogo] = useState(null)
    const [banner, setBanner] = useState(null)

    useEffect(() => {
        async function fetchData() {

            const { data, error } = await supabase
                .from('businesses')
                .select('* , categories(name, id)')
                .eq('enlace', params.negocio)
                .single()
            const { data: categoriesData, error: errorCategories } = await supabase
                .from('categories')
                .select('name, id')

            console.log(data, 'data', error, 'error')

            if (error || errorCategories) {
                console.error('Error fetching business data:', error)
            } else {
                setBusinessData(data)
                setCategories(categoriesData)
            }
            setIsLoading(false)


        }

        fetchData()
    }, [params?.negocio])

    if (!params?.negocio) {
        return <div>Loading...</div>
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!businessData || !categories) {
        return <div>Business not found</div>
    }

    const hours = [
        {
            type: 'time',
            name: "lunes",
            label: "Lunes",
            placeholder: "Lunes",
            required: true
        },
        {
            type: 'time',
            name: "martes",
            label: "Martes",
            placeholder: "Martes",
            required: true
        },
        {
            type: 'time',
            name: "miercoles",
            label: "Miercoles",
            placeholder: "Miercoles",
            required: true
        },
        {
            type: 'time',
            name: "jueves",
            label: "Jueves",
            placeholder: "Jueves",
            required: true
        },
        {
            type: 'time',
            name: "viernes",
            label: "Viernes",
            placeholder: "Viernes",
            required: true
        },
        {
            type: 'time',
            name: "sabado",
            label: "Sabado",
            placeholder: "Sabado",
            required: true
        },
        {
            type: 'time',
            name: "domingo",
            label: "Domingo",
            placeholder: "Domingo",
            required: true
        },
    ]
    const schedule = JSON.parse(businessData?.schedule)

    const handleLogoUpload = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        const url = URL.createObjectURL(file)
        setLogo(<img src={url} alt='logo' className='w-44 object-cover' />)
    }

    const handleImageUpload = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        const url = URL.createObjectURL(file)
        setBanner(<img src={url} alt='logo' className='w-44 object-cover' />)
    }

    return (
        <div className='container mx-auto space-y-4'>


            <form action='POST' method='#' className='flex flex-col items-center border p-2'>
                {/* <Input defaultValue={businessData?.banner_url} name='banner_url' id='banner_url' type='file'/> */}
                <main className="relative w-full h-[400px] md:h-[600px] overflow-hidden rounded-lg">
                    <Label htmlFor='banner_url' className='flex w-full h-full'>
                        {!banner ? <ImageSupabase url={businessData?.banner_url} buckets={'banners'} className='w-full object-cover aspect-video' /> : banner}
                    </Label>
                </main>
                <Input className='hidden' onChange={handleImageUpload} name={businessData?.banner_url} id='banner_url' type='file' />
                <Button formAction={actionUpdateImage} >Actualizar</Button>
            </form>
            <form action='POST' method='#' className='flex flex-col items-center border p-2'>
                <Label htmlFor='logo' className='flex justify-center items-center'>
                    {logo === null && <ImageSupabase url={businessData?.logo} buckets={'banners'} className='w-44 object-cover' />}
                    {logo !== null && logo}
                </Label>
                <Input className='hidden' onChange={handleLogoUpload} name={businessData?.logo} id='logo' type='file' />
                <Button formAction={actionUpdateImage}>Actualizar</Button>
            </form>

            <form method='POST' action='#'>
                <Card className='max-w-6xl mx-auto'>
                    <CardHeader>
                        <CardTitle className='text-2xl'>Información del negocio</CardTitle>
                        <CardDescription>Actualiza la información de tu negocio</CardDescription>
                    </CardHeader>
                    <CardContent >

                        <Input value={businessData?.id} readOnly name='id' id='id' className=' hidden' />
                        <div className='min-w-80 max-w-xl'>
                            <Label htmlFor='name'> Nombre del negocio </Label>
                            <Input defaultValue={businessData?.name} name='name' id='name' />
                        </div>
                        <div className='grid grid-cols-2'>
                            <div className='min-w-80 max-w-2xl '>
                                <Label htmlFor='address'> Ubicación </Label>
                                <Input defaultValue={businessData?.address} name='address' id='address' placeholder='Calle xx # xx - xx' />
                            </div>

                            <div className='min-w-80 max-w-2xl '>
                                <Label htmlFor='phone'> Teléfono </Label>
                                <Input defaultValue={businessData?.phone} name='phone' id='phone' type='tel' placeholder='310XXXXXXX' />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor='iframe_maps'> Url Google Maps </Label>
                            <Input defaultValue={businessData?.iframe_maps} name='iframe_maps' id='iframe_maps' />
                        </div>
                        <div>
                            <Label htmlFor='website'> Sitio Web </Label>
                            <Input defaultValue={businessData?.website} name='website' id='website' placeholder='unsitioincreible.com' />
                        </div>
                    </CardContent>
                    <CardFooter >
                        <Button formAction={actionContact} className='ml-auto'> Guardar</Button>
                    </CardFooter>
                </Card>
            </form>
            <form>
                <Card className='max-w-6xl mx-auto'>
                    <CardHeader>
                        <CardTitle className='text-2xl'>Descripción</CardTitle>
                        <CardDescription>Actualiza la descripción de tu negocio</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Input value={businessData?.id} name='id' id='id' className=' hidden' readOnly />
                        <Label htmlFor='description'>Descripción</Label>
                        <textarea defaultValue={businessData?.description} name='description' id='description' className='w-full h-40 border border-input bg-background px-2 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'></textarea>
                    </CardContent>
                    <CardFooter>
                        <Button formAction={actionUpdateData} className='ml-auto'>Guardar</Button>
                    </CardFooter>
                </Card>
            </form>
            <form>

                <Card className='max-w-6xl mx-auto'>
                    <CardHeader>
                        <CardTitle className='text-2xl'>Categorías y servicios</CardTitle>
                        <CardDescription>Actualiza las categorías y servicios</CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <Input readOnly value={businessData?.id} name='id' id='id' className=' hidden' />
                        <Card>
                            <CardHeader>
                                <CardTitle className='text-xl'>Categorías registradas</CardTitle>
                            </CardHeader>
                            <CardContent className='space-y-2'>
                                <ul className='flex flex-wrap gap-2'>
                                    {businessData?.categories?.map((category, index) => <li key={index} className='bg-green-700 text-white px-2 py-1 rounded-md'>{category.name}</li>)}
                                </ul>
                                <Separator />
                                <fieldset>
                                    <legend className='font-semibold'>Categorías</legend>
                                    <div className='space-y-2'>
                                        {categories?.map((category, index) => {
                                            const {name , id} = category
                                            const categoriesName = businessData?.categories?.map(category => category.name)
                                            console.log(categoriesName.includes(category.name), 'businessData?.categories?.includes(category.name)')  
                                            return (<div key={index} className='flex  items-center gap-2'>
                                                <Input type='checkbox' id={id} name={id} defaultChecked={businessData?.categories?.includes(category.name)} className='w-6 h-6' />
                                                <Label htmlFor={id}>{name}</Label>
                                            </div>)
                                        })}

                                    </div>
                                </fieldset>
                            </CardContent>

                        </Card>
                        <InputAmenities amenities={businessData?.amenities} />
                    </CardContent>
                    <CardFooter>
                        <Button formAction={actionAmenities} className='ml-auto'>Guardar</Button>
                    </CardFooter>
                </Card>
            </form>

            <form method='POST' action='#'>
                <Card className='max-w-6xl mx-auto'>
                    <CardHeader>
                        <CardTitle className='text-2xl'>Redes sociales</CardTitle>
                        <CardDescription>Actualiza las redes sociales</CardDescription>
                    </CardHeader>
                    <CardContent >
                        <Input value={businessData?.id} name='id' id='id' readOnly className=' hidden' />
                        <div>
                            <Label htmlFor='instagram'> Instagram</Label>
                            <Input defaultValue={businessData?.socials_account.filter(item => item.includes('instagram'))} name='instagram' id='instagram' placeholder='https://www.instagram.com/xxxxxxxxx' />
                        </div>
                        <div>
                            <Label htmlFor='facebook'> Facebook</Label>
                            <Input defaultValue={businessData?.socials_account.filter(item => item.includes('facebook'))} name='facebook' id='facebook' placeholder='https://www.facebook.com/xxxxxxxxx' />
                        </div>
                        <div>
                            <Label htmlFor='TikTok'>TikTok</Label>
                            <Input defaultValue={businessData?.socials_account.filter(item => item.includes('tiktok'))} name='TikTok' id='TikTok' placeholder='https://www.tiktok.com/xxxxxxxxx' />
                        </div>
                        <div>
                            <Label htmlFor='YouTube'> YouTube</Label>
                            <Input defaultValue={businessData?.socials_account.filter(item => item.includes('youtube'))} name='YouTube' id='YouTube' placeholder='https://www.youtube.com/xxxxxxxxx' />
                        </div>
                    </CardContent>
                    <CardFooter >
                        <Button formAction={actionSocialsAccount} className='ml-auto'> Guardar</Button>
                    </CardFooter>
                </Card>
            </form>

            <form action='#' method='POST'>
                <Card className='max-w-6xl mx-auto'>
                    <CardHeader>
                        <CardTitle className='text-2xl'>Horario</CardTitle>
                        <CardDescription>Actualiza el horario de atención</CardDescription>
                    </CardHeader>
                    <CardContent className='flex flex-wrap gap-2 items-center lg:justify-start justify-center'>
                        <Input value={businessData?.id} name='id' id='id' className=' hidden' readOnly />
                        {hours?.map((hour, index) => <fieldset htmlFor={hour.name} key={index} className='w-fit border leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 '>
                            <legend className="text-md font-semibold">{hour.label}</legend>
                            <div className="text-sm font-medium">

                                <div className='grid gap-2 p-2 '>
                                    <div className="flex gap-4">
                                        <div>
                                            <label>Apertura</label>
                                            <input
                                                id={hour.name + '-open'}
                                                name={hour.name + '-open'}
                                                className='flex h-10 w-full rounded-md border border-input bg-background px-2 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                                                type={hour.type}
                                                placeholder={hour?.placeholder ?? 'aun no hay un placeholder se debe configurar'}
                                                defaultValue={schedule[hour.name]?.open ?? ''}
                                            />
                                        </div>
                                        <div>
                                            <label>Cierre</label>
                                            <input
                                                id={hour.name + '-close'}
                                                name={hour.name + '-close'}
                                                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                                                type={hour.type}
                                                placeholder={hour?.placeholder ?? 'aun no hay un placeholder se debe configurar'}
                                                defaultValue={schedule[hour.name]?.close ?? ''}
                                            />
                                        </div>
                                    </div>
                                    <ClosedOrTwentyFour hour={hour} schedule={schedule} />
                                </div>
                            </div>
                        </fieldset>)}
                    </CardContent>
                    <CardFooter>
                        <Button className='ml-auto' formAction={actionSchedule}>Guardar</Button>
                    </CardFooter>
                </Card>
            </form>
            <div className='flex flex-wrap justify-center items-center gap-5'>
                {businessData?.gallery?.map((image, index) => <ImageDelete bucket={'banners'} url={image} key={index} id={businessData?.id} gallery={businessData?.gallery} />)}
                <UploadImage businesses={businessData} bucket={"banners"} />
            </div>

        </div >
    )
}