'use client'
import { Suspense } from 'react'
import { Skeleton } from './ui/skeleton'

// Loading skeleton for carousel components
const CarouselSkeleton = () => (
  <div className="w-full">
    <Skeleton className="w-full h-64 rounded-lg" />
  </div>
)

// Loading skeleton for gallery components
const GallerySkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {[...Array(6)].map((_, i) => (
      <Skeleton key={i} className="w-full h-48 rounded-lg" />
    ))}
  </div>
)

// Loading skeleton for image component
const ImageSkeleton = () => (
  <Skeleton className="w-full h-32 rounded-lg" />
)

// Loading skeleton for app sheet
const AppSheetSkeleton = () => (
  <div className="fixed bottom-0 inset-x-0 max-w-96 mx-auto w-full p-2">
    <Skeleton className="h-12 w-full rounded-md" />
  </div>
)

// Generic loading component
const LoadingSpinner = ({ className = "" }) => (
  <div className={`flex justify-center items-center ${className}`}>
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
)

// Wrapper components with Suspense
export const LazyCarouselWrapper = ({ children, className = "" }) => (
  <Suspense fallback={<CarouselSkeleton />}>
    <div className={className}>
      {children}
    </div>
  </Suspense>
)

export const LazyGalleryWrapper = ({ children, className = "" }) => (
  <Suspense fallback={<GallerySkeleton />}>
    <div className={className}>
      {children}
    </div>
  </Suspense>
)

export const LazyImageWrapper = ({ children, className = "" }) => (
  <Suspense fallback={<ImageSkeleton />}>
    <div className={className}>
      {children}
    </div>
  </Suspense>
)

export const LazyAppSheetWrapper = ({ children }) => (
  <Suspense fallback={<AppSheetSkeleton />}>
    {children}
  </Suspense>
)

export const LazyComponentWrapper = ({ children, fallback, className = "" }) => (
  <Suspense fallback={fallback || <LoadingSpinner className={className} />}>
    {children}
  </Suspense>
)