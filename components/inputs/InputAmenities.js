'use client'
import React, { useState } from 'react'

const InputAmenities = () => {
  const [amenitiesString, setAmenitiesString] = useState()
  const addAmenity = () => {
    console.log(amenitiesString)
    let amenity = document.getElementById('amenity')
    if (amenity.value === '') {
      alert('Debe ingresar una comodidad')
      return
    }
    if (amenitiesString?.includes(amenity.value)) {
      alert('Esta comodidad ya fue agregada')
      return
    }
    amenitiesString === undefined ? setAmenitiesString(amenity.value + ',') : setAmenitiesString(amenitiesString + amenity.value + ',')
    amenity.value = ''
  }


  const deleteAmenity = () => {
    let amenity = document.activeElement.previousSibling.innerText
    setAmenitiesString(amenitiesString.replace(amenity + ',', ''))
  }

  return (
    <fieldset className='border p-3'>
      <legend className='font-semibold'>Comodidades</legend>
      <div className='flex gap-2'>
        <input type='text' id='amenity' name='amenity' placeholder='WiFi, Restaurante, Piscina ... agrega de a una opción' className='flex h-10 w-96 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' />
        <button type='button' className='p-2 border rounded-lg bg-green-400 font-semibold' onClick={addAmenity} >Agregar</button>
      </div>
      <input type='text' id='amenities' name='amenities' hidden value={amenitiesString} />
      <ul className='columns-3'>
        {amenitiesString?.split(',').slice(0, -1).map(amenity => <li className='flex gap-1 justify-between w-36' key={amenity}><p>{amenity}</p><button type='button' className='font-bold text-red-500' onClick={deleteAmenity}>x</button></li>)}
      </ul>
    </fieldset>
  )
}

export default InputAmenities