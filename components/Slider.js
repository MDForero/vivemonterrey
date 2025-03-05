'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"

export default function Slider() {


    return <div className="w-full max-w-7xl mx-auto px-16">
        <Carousel className="w-full max-w-7xl mx-auto">
            <CarouselContent     >
                {actividades.map(actividad => <CarouselItem className="basis-1/3 lg:basis-1/5 " key={actividad.name.split().join('-')} >
                    <Image loading="lazy" src={actividad.src} alt={actividad.name} width={0} height={0} className='w-full aspect-[3/4] object-cover' />
                    <p className="bg-green-700 text-pretty p-2 font-bold text-center text-xs text-white">{actividad.name}</p>
                </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
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