
'use client'
import Autoplay from 'embla-carousel-autoplay'
import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import CardCategory from './index/CardCategory'

const SliderCategory = ({ data }) => {
    return (<div>
    <Carousel className=' w-full relative'
            plugins={[
                Autoplay({
                    delay: 2500,
                }),
            ]}>
            <CarouselContent>
                {data?.map((category) => <CarouselItem key={category.id} className=" sm:basis-1/2 ">
                    <CardCategory data={category} />
                </CarouselItem>
                )}
            </CarouselContent>
            <CarouselPrevious className='absolute top-1/2 left-0'/>
            <CarouselNext className='absolute top-1/2 right-0' />
        </Carousel>
    </div>
    )
}
export default SliderCategory