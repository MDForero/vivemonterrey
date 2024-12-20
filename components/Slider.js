'use client'

import Image from "next/image"
import { useEffect, useState } from "react"

export default function Slider() {
    const [direction, setDirection] = useState(0)

    useEffect(() => {
        const slider = document.getElementById('slider')
        const container = document.getElementsByClassName('container')[0]
        slider.scrollWidth <= ((direction * 440) + container.scrollWidth - 440) && setDirection(0)
        
        // console.log(contentSlider.scrollWidth <= (direction * 440 ) + window.window.screen.width )
        slider.scroll({
            left: direction * 440,
            behavior: 'smooth'
        })
        actividades.length === direction && setDirection(0)


    }, [direction])

    return <div className="relative">
        <div className="overflow-hidden overflow-x-scroll bg-scroll border  w-full h-[400px]   items-center p-2" id="slider">
            <div className="flex flex-nowrap gap-14 " id="content-slider" >
                {actividades.map(actividad => <figure className="group relative aspect-square h-96 w-fit object-cover"  key={actividad.name.split().join('-')} >
                <Image loading="lazy" src={actividad.src} alt={actividad.name} width={0} height={0} className=' aspect-square h-96 w-fit object-cover' />
                <figcaption className="font-englebert font-bold text-xl text-center absolute left-0 right-0 bottom-0 group-hover:text-2xl group-hover:top-0 flex items-end justify-center group-hover:bg-[#b91c1c]/30 bg-[#b91c1c] duration-500 ease-in-out text-white p-2">{actividad.name}</figcaption>
                </figure>)}
            </div>
        </div>

        <button className={`${direction? ' ' : 'hidden '} absolute top-1/4 bottom-1/4 left-0 w-12`} onClick={() => setDirection(direction - 1)} type="button">
            <svg viewBox="-102.4 -102.4 1228.80 1228.80" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"><rect x="-102.4" y="-102.4" width="1228.80" height="1228.80" rx="614.4" fill="#b91c1c" strokeWidth="0"></rect></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" fill="#ffffff"></path></g></svg>
        </button>
        <button className="absolute top-1/4 bottom-1/4 right-0 w-12" onClick={() => setDirection(direction + 1)} type="button"><svg viewBox="-102.4 -102.4 1228.80 1228.80" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"><rect x="-102.4" y="-102.4" width="1228.80" height="1228.80" rx="614.4" fill="#b91c1c" strokeWidth="0"></rect></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" fill="#ffffff"></path></g></svg></button>
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