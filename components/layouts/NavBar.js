'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const NavBar = ({ links }) => {

    const path = usePathname()
    const [show, setShow] = useState(false)

    const handleClickOutside = (event) => {
        const navbarMobile = document.getElementById('navbar-mobile');
        if (navbarMobile && !navbarMobile.contains(event.target)) {
            setShow(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    if (!['dashboard', 'login', 'ordenar', 'menu', 'enlaces', 'registro'].find(element => path.split('/').includes(element))) {

        return (
            <header >
                <div className='container mx-auto p-2'>
                    <nav className="flex justify-between items-center h-20  font-semibold relative shadow-sm font-mono">
                        <Image src='/logo.svg' width={0} height={0} className='w-36' alt='Logo vive monterrey' />
                        <ul className='hidden lg:flex justify-evenly items-center text-lg gap-6 title'>
                            {links.map(link => <li key={link.name} ><Link className={(path.slice(-1) === link.name ? 'underline ' : '' + ' capitalize')} href={link.url}>{link.name}</Link></li>)}
                        </ul>
                        <ul className='hidden lg:flex gap-3 '>
                            {socialAccounts.map(social => <li key={social.name}> <Link href={social.url} className='border block p-2 rounded-full'><Image alt={`icono de red social ${social.name}`} src={social.svg} width={0} height={0} className='w-5 h-5' /></Link>
                            </li>)}
                        </ul>
                        <button className='lg:hidden relative z-50 title lg:text-white rounded-full border-2 border-gray-700' onClick={() => setShow(!show)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill='#15803d' viewBox="0 0 24 24" stroke="currentColor">
                                {show ? <path strokeLinecap="round" fill='#15803d' strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" fill='#15803d' strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16m-7 6h7" />}
                            </svg>
                        </button>
                        <div id='navbar-mobile' className={show ? 'flex flex-col justify-between items-stretch fixed  bottom-0 w-full left-0 right-0 bg-white border-[#b91c1c] border-t-2 rounded-t-3xl text-lg slide-left-enter-active z-50 py-4 px-4' : 'hidden '}>
                            <ul>
                                {links.map(link => <li key={link.name} ><Link onClick={() => setShow(!show)} className={path.slice(-1) === link.name ? 'underline ' : ''} href={link.url}>{link.name}</Link></li>)}
                            </ul>
                            <ul className='flex gap-3 justify-center'>
                                {socialAccounts.map(social => <li key={social.name}> <Link href={social.url} className='border block p-2 rounded-full'><Image src={social.svg} width={0} height={0} className='w-8 h-8' alt={`icono de red social ${social.name}`} /></Link>
                                </li>)}
                            </ul>
                        </div>
                    </nav>
                </div>

            </header>
        )
    } else {
        return null
    }
}

export const socialAccounts = [
    { name: 'Facebook', url: 'https://www.facebook.com/vivemonterrey.com.co/', svg: '/facebook.svg' },
    { name: 'Instagram', url: 'https://www.instagram.com/vivemonterrey.com.co/', svg: '/instagram.svg' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@vivemonterrey.com.co', svg: '/tiktok.svg' },
    { name: 'YouTube', url: 'https://www.youtube.com/@vivemonterreyCO', svg: '/youtube.svg' },
]

export default NavBar