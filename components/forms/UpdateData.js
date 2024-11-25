'use client'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { createClient } from '@/utils/supabase/client'
import { Separator } from '../ui/separator'
import { object } from 'zod'

const UpdateData = ({ id, label, name, defaultValue, business }) => {
    const supabase = createClient()
    const [isLoading, setIsLoading] = useState(false)

    const handleUpdate = async () => {
        setIsLoading(true)
        const data = {
            [name]: document.getElementById(id).value
        }
        console.log(data)
        try {
            await supabase.from('businesses').update( data ).eq('id', business)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
            window.location.reload()
        }
    }
    return <form method='POST' action='#'>
        <Label htmlFor={id} className='text-xl'>{name}</Label>
        <Input id={id} name={id} defaultValue={defaultValue} />
        <Button variant='outline' onClick={() => handleUpdate()} type='button'>Guardar</Button>
        <Separator />
    </form>

}

export default UpdateData