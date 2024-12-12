'use client'
import React, { useState } from 'react'
import { Calendar } from './ui/calendar'
import { es } from 'date-fns/locale'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

const BookingButton = () => {
    const [selected, setSelected] = useState(new Date())
    console.log(selected)
    return (
        <div>
            <Popover>
                <PopoverTrigger><span>Check-in</span> - <span>Check-Out</span></PopoverTrigger>
                <PopoverContent>

                    <Calendar
                        mode='range'
                        selected={selected}
                        onSelect={setSelected}
                        disabled={(date) => date < new Date()}
                        locale={es}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default BookingButton