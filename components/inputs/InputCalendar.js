'use client'
import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function InputCalendar(props) {
    const [selected, setSelected] = useState()
    const [selectedOut, setSelectedOut] = useState()
    console.log(selected?.toJSON())

    return <>
        <Popover>
            <input type='date' defaultValue={selected?.toJSON().split('T')[0]} hidden/>
            <PopoverTrigger>{selected ? selected.toLocaleDateString() : 'Check in'}</PopoverTrigger>
            <PopoverContent>
                <Calendar
                    disabled={(date) => date <= new Date()}
                    selected={selected}
                    onSelect={setSelected}
                    mode='single'
                />
            </PopoverContent>
        </Popover>
        <Popover>
            <input type='date' defaultValue={selectedOut?.toJSON().split('T')[0]} hidden/>
            <PopoverTrigger>{selectedOut ? selectedOut.toLocaleDateString() : 'Check out'}</PopoverTrigger>
            <PopoverContent>
                <Calendar
                    disabled={(date) => date <= selected}
                    selected={selectedOut}
                    onSelect={setSelectedOut}
                    mode='single'
                />
            </PopoverContent>
        </Popover>
    </>
}