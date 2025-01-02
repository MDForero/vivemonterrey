'use client'
import { is } from 'date-fns/locale'
import React, { use, useEffect, useState } from 'react'

const AcceleratorCount = ({ value, title, icon, subtitle }) => {
  const count = value || 300
  const [number, setNumber] = useState(0)
  const [isViewed, setIsViewed] = useState(false)

  useEffect(() => {
    const element = document.querySelectorAll('.observer')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!isViewed) {
            let i = 0
            const interval = setInterval(() => {
              if (i <= count) {
                setNumber(i)
                i++
              } else {
                clearInterval(interval)
              }
            }, 100)
            setIsViewed(true)
            observer.unobserve(entry.target);
          }
        }
      })
    }, { threshold: 1 })
    observer.observe(element[0])

  }, [count, number])

  return (
    <div className='font-semibold font-englebert observer w-60 h-60 border border-viveRed/60 rounded-md flex flex-col justify-center items-center gap-4'>
      <h1 >{title}</h1>
      <div className='relative flex justify-center items-center'> 
        {icon}
      <p className='flex justify-center items-center font-bold text-red-700 text-4xl '>{number}</p>
      </div>
      <h2 className='first-letter:uppercase'>{subtitle}</h2>
    </div>
  )
}

export default AcceleratorCount