import React from 'react'
import { Card, CardContent, CardTitle } from './ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@radix-ui/react-select'

const CardContact = ({ data }) => {
    {/* <Card className='w-fit  '>
            <CardTitle className='pt-2  text-center text-xl'>{data.title}</CardTitle>
            <CardContent className='flex justify-center items-center gap-4 w-80 text-balance font-semibold'>
                {data.icon}
                <div className='flex flex-col justify-center'>
                    {data.links.map((link, index) => <Link key={index} href={link.url} className='hover:text-[#3F7D58]/90 duration-300 ease-in-out '>{link.name}</Link>)}
                </div>
            </CardContent>
        </Card> */}

    return <div className="col-md-6">
        <div
            className="contact-info-item"
            data-aos="fade-up"
            data-aos-duration={1500}
            data-aos-offset={50}
            data-aos-delay={50}
        >
            <div className="icon">
                <i className="fas fa-envelope" />
            </div>
            <div className="content">
                <h5>{data.title}</h5>
                <div className="text flex flex-col line-clamp-1">
                    <i className="far fa-envelope" />{" "}
                    {data.links.map((link, index) => <a href={link.url}>{link.name}</a>)}
                </div>
            </div>
        </div>
    </div>
}

export default CardContact