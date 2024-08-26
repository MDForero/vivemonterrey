'use client'

import Image from "next/image"
import { useEffect, useState } from "react"

export default function Slider() {
    const [direction, setDirection] = useState(0)

    useEffect(() => {
        const slider = document.getElementById('slider')
        const contentSlider = document.getElementById('content-slider')
        contentSlider.scrollWidth < direction + 1100 && setDirection(0)
        slider.scroll({
            left: direction,
            behavior: 'smooth'
        })



    }, [direction])

    return <div className="relative">
        <div className="overflow-hidden overflow-x-scroll bg-scroll flex w-full h-[600px]  items-center" id="slider">
            <div className="flex flex-nowrap gap-10 p-2" id="content-slider" >
                {actividades.map(actividad => <figure className=" aspect-[9/16] h-[440px] w-fit object-cover"><Image key={actividad.name.split().join('-')} src={actividad.src} alt={actividad.name} width={0} height={0} className=' aspect-[9/16] h-[440px] w-fit object-cover' />
                <figcaption className="title font-englebert font-bold text-xl text-center">{actividad.name}</figcaption>
                </figure>)}
            </div>
        </div>

        {direction && <button className="absolute top-1/4 bottom-1/4 left-0 w-16 " onClick={() => setDirection(direction - 287)} type="button">
            <svg viewBox="-102.4 -102.4 1228.80 1228.80" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-102.4" y="-102.4" width="1228.80" height="1228.80" rx="614.4" fill="#b91c1c" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" fill="#ffffff"></path></g></svg>
        </button>}
        <button className="absolute top-1/4 bottom-1/4 right-0 w-12" onClick={() => setDirection(direction + 287)} type="button"><svg viewBox="-102.4 -102.4 1228.80 1228.80" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-102.4" y="-102.4" width="1228.80" height="1228.80" rx="614.4" fill="#b91c1c" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" fill="#ffffff"></path></g></svg></button>
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