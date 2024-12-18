'use client'
import { useEffect, useState } from "react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function InputCalendar(props) {
    const [selected, setSelected] = useState()
    const [selectedOut, setSelectedOut] = useState()
    const [child, setChild] = useState(0)
    const [adults, setAdults] = useState(0)



   
    return <>
        <Popover>
            <PopoverTrigger className="border-2 p-2 rounded-md">
                Huéspedes { }
            </PopoverTrigger>
            <PopoverContent>
                <div className='flex justify-around items-center'>
                    <Label htmlFor='adult' >Adultos</Label>
                    <Input type='number' onChange={(e)=>setAdults(e.target.value)} className='w-16 text-center' defaultValue={adults} id='adult' name='adult' />
                </div>
                <div className='flex justify-around items-center'>
                    <Label htmlFor='children' >Niños</Label>
                    <Input type='number' className='w-16 text-center' onChange={(e)=>setChild(e.target.value)} id='children' name='children' defaultValue={child} />
                </div>
            </PopoverContent>
        </Popover>

        <Popover>
            <input type='date' defaultValue={selected?.toJSON().split('T')[0]} hidden />
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
            <input type='date' defaultValue={selectedOut?.toJSON().split('T')[0]} hidden />
            <PopoverTrigger>{selectedOut ? selectedOut?.toLocaleDateString() : 'Check out'}</PopoverTrigger>
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