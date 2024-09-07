'use client'
import React, { useEffect, useState } from 'react'

const BackTopButton = () => {
    const [show, setShow] = useState(false)
    const backTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    const handleShow = () => {
        if (window.scrollY > 100) {
            setShow(true)
        } else {
            setShow(false)
        }

    }

    useEffect(() => {
        window.addEventListener('scroll', handleShow)
        return () => {
            window.removeEventListener('scroll', handleShow)
        }
    }, [])

    if (!show) {
        return null
    }

    return (
        <button onClick={backTop} className='fixed z-50 bottom-4 left-5 flex justify-center items-center bg-primary animate-pulse '>
            <div className='relative w-10 h-10 flex justify-center items-center '>
                <div className='absolute top-4 -rotate-45 border-t border-r  w-4 h-4  border-white'></div>
                <div className='absolute top-5 -rotate-45 border-t border-r  w-4 h-4  border-white'></div>
                <div className='absolute top-3 -rotate-45 border-t border-r  w-4 h-4  border-white'></div>
            </div>
        </button>
    )
}

export default BackTopButton