'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export default function Slider() {


    return <div className="w-full max-w-7xl mx-auto 16">
        <Carousel className="w-full max-w-7xl mx-auto" plugins={[
            Autoplay({
                delay: 2500,
            }),
        ]}>
            <CarouselContent     >
                {actividades.map(actividad => <CarouselItem className="xs:basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4 " key={actividad.name.split().join('-')} >
                    <div className="w-full aspect-[3/4] overflow-hidden ">
                        <Image loading="lazy" src={actividad.src} alt={actividad.name} width={0} height={0} className='w-full aspect-[3/4] object-cover' />
                        <p className="bg-green-700 text-pretty capitalize p-2  font-bold text-center text-xs sm:text-md md:text-lg lg:text-md text-white">{actividad.name}</p>
                    </div>
                </CarouselItem>)}
            </CarouselContent>
        </Carousel>
    </div>


}

export const actividades = [
    {
        name: 'team penning',
        src: '/assets/actividades/team-penning.webp',
    },
    {
        name: 'Senderismo',
        src: '/assets/actividades/senderismo.jpg',
    },
    {
        name: 'Paratrike',
        src: '/assets/actividades/paratrike.jpg',
    },
    {
        name: 'Espeleología',
        src: '/assets/actividades/espeleologia.webp',
    },
    {
        name: 'Cabalgatas',
        src: '/assets/actividades/cabalgatas.jpg',
    },
    {
        name: 'Avistamiento de aves',
        src: '/assets/actividades/avistamiento.jpg',
    },
    {
        name: 'Agroturismo',
        src: '/assets/actividades/agroturismo.jpg',
    },
    {
        name: 'Atracciones Naturales',
        src: '/assets/actividades/atractivos-turisticos.jpg',
    },

]