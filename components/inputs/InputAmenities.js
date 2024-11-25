'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'

const InputAmenities = (props) => {
  const [amenities, setAmenities] = useState(props?.amenities ?? [])
  const addAmenity = () => {
    console.log(amenities)
    let amenity = document.getElementById('amenity')
    if (amenity.value === '') {
      alert('Debe ingresar una comodidad')
      return
    }
    if (amenities?.includes(amenity.value)) {
      alert('Esta comodidad ya fue agregada')
      return
    }
    setAmenities([...amenities, amenity.value])
    amenity.value = ''
  }


  const deleteAmenity = (amenity) => {
    setAmenities(amenities.filter(item => item !== amenity))
  }

  return (
    <Card className='border p-3'>
      <CardHeader>
        <CardTitle className='font-semibold text-xl'>Comodidades</CardTitle>
      <Separator />
      </CardHeader>
      <CardContent>
      <div className='flex gap-2'>
        <input type='text' id='amenity' name='amenity' placeholder='WiFi, Restaurante, Piscina ... agrega de a una opción' className='flex h-10 w-96 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' />
        <button type='button' className='p-2 border rounded-lg bg-green-400 font-semibold' onClick={addAmenity} >Agregar</button>
      </div>
      <input type='text' multiple id='amenities' name='amenities' hidden value={amenities} />
      <ul className='columns-3'>
        {amenities?.map(amenity => <li className='flex gap-1 justify-between w-36' key={amenity} id={amenity}><p>{amenity}</p><button type='button' className='font-bold text-red-500' onClick={() => deleteAmenity(amenity)}>x</button></li>)}
      </ul>
      </CardContent>
    </Card>
  )
}

export default InputAmenities