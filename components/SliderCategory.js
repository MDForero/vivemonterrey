
'use client'
import Autoplay from 'embla-carousel-autoplay'
import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'
import CardCategory from './CardCategory'

const SliderCategory = ({data}) => {
    return (
        <Carousel className=' w-full'
            plugins={[
                Autoplay({
                    delay: 2500,
                }),
            ]}>
            <CarouselContent>
                {data?.map((category) => <CarouselItem key={category.id} className="basis-1/2 sm:basis-1/3">
                    <CardCategory data={category} />
                </CarouselItem>
                )}
            </CarouselContent>
        </Carousel>
    )
}
export default SliderCategory