'use client'
import Autoplay from 'embla-carousel-autoplay'
import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Card } from './ui/card'
import ImageSupabase from './ImageSupabase'

const CarouselImages = ({arrayImages}) => {
    return (
        <Carousel className duration={20} loop={true} plugins={[
            Autoplay({
                delay: 2000,
            }),

        ]}>
            <CarouselContent>
                {arrayImages.map(img => <CarouselItem key={img} className='basis-full'>
                    <Card className={'w-full aspect-[3/1'} >
                        <ImageSupabase key={img} url={img} buckets={'banners'} className={' aspect-[4/3] md:aspect-[3/1] w-full object-cover'} />
                    </Card>
                </CarouselItem>
                )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel >
    )
}

export default CarouselImages