import React from 'react'
import { Card, CardContent, CardTitle } from './ui/card'
import Image from 'next/image'
import Link from 'next/link'

const CardContact = ({data}) => {
    return (
        <Card className='w-fit  '>
            <CardTitle className='pt-2  text-center text-xl'>{data.title}</CardTitle>
            <CardContent className='flex justify-center items-center gap-4 w-80 text-balance font-semibold'>
                <Image src={data.icon} width={0} height={0} className='w-16 h-16 border-2 border-[#b91c1c] rounded-full p-2' />
                <div className='flex flex-col justify-center'>
                    {data.links.map((link, index)=><Link key={index} href={link.url} className='hover:text-[#b91c1c]/90 duration-300 ease-in-out '>{link.name}</Link>)}
                </div>
            </CardContent>
        </Card>
    )
}

export default CardContact