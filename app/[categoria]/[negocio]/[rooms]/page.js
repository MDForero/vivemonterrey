'use client'
import ImageSupabase from "@/components/ImageSupabase"
import InputCalendar from "@/components/inputs/InputCalendar"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { createClient } from "@/utils/supabase/client"
import Autoplay from "embla-carousel-autoplay"
import Fade from "embla-carousel-fade"
import { useEffect, useState } from "react"

export default  function Page({ params }) {

    const supabase = createClient()
    const [data, setData] = useState(null)
    const [selected, setSelected] = useState(new Date())
    const [selectedOut, setSelectedOut] = useState(new Date())
    const [hosts, setHosts] = useState()
    console.log(selected)


    useEffect(() => {
        async function fetch() {
            const { data: room, error } = await supabase.from('rooms').select('*').eq('id', params.rooms).single()
            if (room) {
                setData(room)
            }
        }
        fetch()
    }, [params])

    return <div>
        <Carousel duration={20} loop={true} plugins={[
            Autoplay({
                delay: 2000,
            }),

        ]}>
            <CarouselContent>
                {data?.images.map(img => <CarouselItem key={img} className='basis-full md:basis-1/2 lg:basis-1/3 '>
                    <Card className={'w-full h-96'} >
                        <ImageSupabase key={img} url={img} buckets={'banners'} className={'w-full h-full object-cover'} />
                    </Card>
                </CarouselItem>
                )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel >
        <h1>{data?.name}</h1>
        <p>{data?.description}</p>
        <div className="mx-auto w-fit border-1 rounded-md p-2 bg-gray-100 mt-4 space-x-4">
            <Popover>
                <PopoverTrigger className="border-2 p-2 rounded-md">
                    Huéspedes { }
                </PopoverTrigger>
                <PopoverContent>
                    <div className='flex justify-around items-center'>
                        <Label htmlFor='adult' >Adultos</Label>
                        <Input type='number' className='w-16 text-center' defaultValue={0} id='adult' name='adult' />
                    </div>
                    <div className='flex justify-around items-center'>
                        <Label htmlFor='children' >Adultos</Label>
                        <Input type='number' className='w-16 text-center' defaultValue={0} id='children' name='children' />
                    </div>
                </PopoverContent>
            </Popover>
            <InputCalendar name='Check-in' />
            <a href='#'>Reservar</a>
        </div>
    </div>
} 