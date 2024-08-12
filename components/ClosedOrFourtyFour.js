'use client'
import React, { useState } from 'react'

const ClosedOrFourtyFour = (props) => {
    const[fourtyFour, setFourtyFour] = useState(false)
    const[closed, setClosed] = useState(false)

    return (
         <div className="flex flex-row justify-center w-fit items-start gap-3">
            <div className="flex justify-center items-center flex-row-reverse gap-1">

                <label>24 horas</label>
                <input
                    id={props?.hour.name + '-fourty-four'}
                    name={props?.hour.name + '-fourty-four'}
                    className='flex rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                    onClick={() => {
                        setFourtyFour(true)
                        setClosed(false)
                    }}
                    checked={fourtyFour}
                    type='checkbox'
                    placeholder={props?.hour?.placeholder ?? 'aun no hay un placeholder se debe configurar'}
                />
            </div>
            <div className="flex justify-center items-center flex-row-reverse gap-1">
                <label>Cerrado</label>
                <input
                    id={props?.hour.name + '-closed'}
                    name={props?.hour.name + '-closed'}
                    className='flex   rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                    type='checkbox'
                    onClick={() => {
                        setFourtyFour(false)
                        setClosed(true)
                    }}
                    checked={closed}
                    placeholder={props?.hour?.placeholder ?? 'aun no hay un placeholder se debe configurar'}
                />
            </div>
        </div>
    )
}

export default ClosedOrFourtyFour