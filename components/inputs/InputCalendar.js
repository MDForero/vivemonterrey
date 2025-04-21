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

    const handleClick = () => {
        console.log(props)
        const enviar = document.getElementById('enviar')
        enviar.setAttribute('href', `https://api.whatsapp.com/send?phone=+57${props.data.businesses.phone}&text=Hola,%20quiero%20reservar%20una%20habitación%20tipo%20${props.data.name}%0A%0AFecha%20de%20entrada:%20${selected.toLocaleDateString()}%0AFecha%20de%20salida:%20${selectedOut.toLocaleDateString()}%0AAdultos:%20${adults}%0ANiños:%20${child}%0A`)
        enviar.setAttribute('target', '_blank')
        enviar.click()
    }

    return <div className=" grid grid-cols-2 max-w-4xl md:grid-cols-4  items-center  mx-auto bg-white ">

        <Popover>
            <input type='date' defaultValue={selected?.toJSON().split('T')[0]} hidden />
            <PopoverTrigger className="border-2 p-2 ">
                <p className="text-viveRed font-bold">Check in</p>
                {selected ? selected.toLocaleDateString(): 'dd/mm/aaaa'}
                </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    disabled={(date) => date <= new Date()}
                    selected={selected}
                    onSelect={setSelected}
                    className="rounded-md border shadow"
                    mode='single'
                />
            </PopoverContent>
        </Popover>
        <Popover>
            <input type='date' defaultValue={selectedOut?.toJSON().split('T')[0]} hidden />
            <PopoverTrigger className="border-2 p-2 ">
                <p className="text-viveRed font-bold">Check out</p>
                {selectedOut ? selectedOut.toLocaleDateString(): 'dd/mm/aaaa'}

            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    disabled={(date) => date <= selected}
                    selected={selectedOut}
                    onSelect={setSelectedOut}
                    className="rounded-md border shadow"
                    mode='single'
                    
                    />
            </PopoverContent>
        </Popover>
        <Popover>
            <PopoverTrigger className="border-2 p-2">
                <p className="text-viveRed font-bold">Huéspedes</p>
                {adults} Adultos, {child} Niños
            </PopoverTrigger>
            <PopoverContent className="w-auto grid grid-cols-2 gap-2 align-middle place-content-center items-center" >
                <Label htmlFor='adult' >Adultos</Label>
                <Input type='number' onChange={(e) => setAdults(e.target.value)} className='w-16 text-center' defaultValue={adults} id='adult' name='adult' />
                <Label htmlFor='children' >Niños</Label>
                <Input type='number' className='w-16 text-center' onChange={(e) => setChild(e.target.value)} id='children' name='children' defaultValue={child} />
            </PopoverContent>
        </Popover>
        <button type="button" className="border-2 h-full p-2 text-center text-viveRed font-bold" onClick={handleClick}>Reservar</button>
        <a href="#" id='enviar' className="hidden">Enviar</a>
    </div>
}