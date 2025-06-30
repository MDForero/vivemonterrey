'use client'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { Skeleton } from './ui/skeleton'

export function LazySection({ 
  children, 
  fallback, 
  className = "",
  skeletonClassName = "h-64 w-full",
  threshold = 0.1,
  rootMargin = "100px"
}) {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold,
    rootMargin
  })

  const defaultFallback = fallback || (
    <div className={className}>
      <Skeleton className={skeletonClassName} />
    </div>
  )

  return (
    <div ref={elementRef} className={className}>
      {hasIntersected ? children : defaultFallback}
    </div>
  )
}

// Skeleton específico para secciones de productos/hoteles
export function ProductSectionSkeleton() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <Skeleton className="h-16 w-3/4 mx-auto mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Skeleton para sección de actividades
export function ActivitiesSectionSkeleton() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <Skeleton className="h-16 w-3/4 mx-auto mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}