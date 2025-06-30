'use client'
import { lazy } from 'react'

// Lazy load carousel and gallery components
export const LazyCarouselImages = lazy(() => import('./CarouselImages'))
export const LazySlider = lazy(() => import('./Slider'))
export const LazyGallery = lazy(() => import('./slider/Gallery'))
export const LazyImgGallery = lazy(() => import('./ImgGallery'))

// Lazy load heavy dashboard components
export const LazyAppSheet = lazy(() => import('./AppSheet'))

// Lazy load other heavy components
export const LazyDestinationSlider = lazy(() => import('./slider/Destination'))
export const LazyTestimonialSlider = lazy(() => import('./slider/Testimonial'))
export const LazyHotDealsSlider = lazy(() => import('./slider/HotDeals'))
export const LazyProductSlider = lazy(() => import('./slider/Product'))
export const LazyClientSlider = lazy(() => import('./slider/Client'))