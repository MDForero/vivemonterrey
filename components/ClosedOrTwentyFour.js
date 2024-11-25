'use client'
import React, { useState } from 'react'

const ClosedOrTwentyFour = (props) => {

    const {schedule, hour} = props

    const[twentyFour, setTwentyFour] = useState(schedule[hour.name].twentyFour ? true : false)
    const[closed, setClosed] = useState(schedule[hour.name].closed ? true : false)

    return (
         <div className="flex flex-row justify-center w-fit items-start gap-3">
            <div className="flex justify-center items-center flex-row-reverse gap-1">

                <label>24 horas</label>
                <input
                    id={props?.hour.name + '-twentyFour'}
                    name={props?.hour.name + '-twentyFour'}
                    className='flex rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                    onClick={() => {
                        setTwentyFour(!twentyFour)
                        setClosed(false)
                    }}
                    checked={twentyFour}
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
                        setTwentyFour(false)
                        setClosed(!closed)
                    }}
                    checked={closed}
                    placeholder={props?.hour?.placeholder ?? 'aun no hay un placeholder se debe configurar'}
                />
            </div>
        </div>
    )
}

export default ClosedOrTwentyFour