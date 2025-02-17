'use client'
import Image from 'next/image'
import React from 'react'
import { socialAccounts } from './NavBar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Footer = () => {
    const path = usePathname()
    if (!['dashboard', 'login', 'ordenar', 'menu', 'enlaces', 'registro'].find(element => path.split('/').includes(element))) {
        return (<>
            <footer>
                <div className='container mx-auto flex flex-wrap justify-evenly gap-10 ' >

                    <section className='w-96 space-y-4'>
                        <h1 className='text-2xl font-bold '>ViveMonterrey.co</h1>
                        <p>Vive Monterrey es una iniciativa impulsada por un equipo diverso de profesionales regiomontunos apasionados por el turismo y el marketing. Nuestro objetivo es revelar la riqueza turística de Monterrey, Casanare, en toda su extensión y variedad. Buscamos dar a conocer cada rincón, experiencia y tradición que hace única a nuestra ciudad, desde sus paisajes llaneros hasta su vibrante cultura local. A través de contenido de calidad y una plataforma integral, nos dedicamos a promover y potenciar el turismo en Monterrey, convirtiéndonos en el puente entre nuestra querida tierra y los visitantes que anhelan descubrirla.</p>

                    </section>

                    <section className='w-fit min-w-72 space-y-4 '>
                        <h1 className='text-2xl font-bold '>Síguenos</h1>
                        <ul className='list-disc ml-8'>
                            {socialAccounts.map(social => <li key={social.name}> <Link href={social.url} className=''>{social.name}</Link></li>)}
                        </ul>

                    </section>

                    <section className='w-fit min-w-72 space-y-4 '>
                        <h1 className='text-2xl font-bold '>Contacto</h1>
                        <ul>
                            <li>Teléfono: <a href='tel:+573108854737'>+57 310 885 4737</a></li>
                            <li>WhatsApp: <a href='https://wa.me/message/FPWEW7SB4DFNL1'>+57 310 885 4737</a></li>
                            <li>Correo: <a href='mailto:info@vivemonterrey.co'>info@vivemonterrey.co</a></li>
                        </ul>
                    </section>
                </div>
            </footer>
        </>
        )
    }
}

export default Footer