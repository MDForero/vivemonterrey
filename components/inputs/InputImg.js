'use client'
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'

const InputImg = ({className,  name, label}) => {
    const [image, setImage] = useState('/image-square-thin-svgrepo-com.svg')

    const showImage = (e) => {
        const file = e.target.files[0];
        console.log(file)
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImage(reader.result);
            };

            reader.readAsDataURL(file);
        } else {
            setImage('');
        }
    };
    console.log(label)
    return (<>
        <fieldset className="">
            <legend className="text-md font-semibold">{label}</legend>
            <label htmlFor={name} className='cursor-pointer ' >
                <Image loading='lazy' src={image} alt="imagen principal " className={className} width={0} height={0} />
            </label>
            <input type='file' id={name} name={name} onChange={showImage} hidden/>
        </fieldset>
    </>
    )
}

export default InputImg