'use client'
import { createClient } from "@/utils/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import ImageSupabase from "./ImageSupabase";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

export default function ActionUpdate({ data }) {
    const supabase = createClient()
    const [image, setImage] = useState(null)
    const date = new Date(data?.event_date).toISOString().split('T').shift()

    /**
     * Handles the update of an event, including updating the image if provided.
     * 
     * @param {FormData} formData - The form data containing the event details to be updated.
     * 
     * The function performs the following steps:
     * 1. Checks if an image is provided in the form data. If so, it updates the image in the Supabase storage.
     * 2. Constructs an object with the updated event details.
     * 3. Updates the event details in the Supabase database.
     * 4. Displays success messages and reloads the page upon successful update.
     * 
     * @returns {Promise<void>} - A promise that resolves when the update is complete.
     */
    const handleUpdate = async (formData) => {


        const dataUpdate = {}
        if (formData.get('image')) {
            console.log('image')
            try {
                const { data: file, error } = await supabase.storage.from('banners').update(data?.image, formData.get('image'))
                console.log(file, 'file')
                formData.delete('image')
                toast.success('Imagen actualizada')
            } catch (error) {
                console.error(error)
            }
        }

        formData.forEach((value, key) => key === "image" ? dataUpdate[key] = data?.image  : dataUpdate[key] = value)
        console.log(dataUpdate, 'dataUpdate')
        try {
            const { data: event, error } = await supabase.from('events').update(dataUpdate).eq('id', data?.id)
            console.log(event, 'event', error)
            toast.success('Evento actualizado')
            window.location.reload()    
        } catch (error) {
            console.error(error)
        }

    }

    const handleImage = (e) => {
        const file = e.target.files[0]
        setImage(URL.createObjectURL(file))
    }



    return <Dialog>
        <DialogTrigger className="bg-green-600 rounded-md p-2 text-white"><Pencil/></DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle >Actualizar evento</DialogTitle>
            </DialogHeader>
            <form method="POST" action='#'>
                <div className="relative">
                    <Label htmlFor='image'>
                        {!image && <ImageSupabase url={data?.image} alt={data?.name} buckets={'banners'} className='w-full aspect-[1:1] object-cover ' />}
                        {image && <Image loading='lazy' width={0} height={0} src={image} alt={data?.name} className='w-full aspect-[1:1] object-cover' />}
                        <div className="absolute top-0 right-0 bg-white p-1 rounded-md cursor-pointer">
                            <Pencil />
                        </div>
                    </Label>
                    <Input type="file" name="image" id="image" className='hidden' onChange={handleImage} />
                </div>
                <div>
                    <Label htmlFor='name'>Nombre</Label>
                    <Input type="text" name="name" id="name" defaultValue={data?.name} />
                </div>
                <div>
                    <Label htmlFor='description'>Descripción</Label>
                    <Textarea type="text" name="description" id="description" defaultValue={data?.description} />
                </div>
                <div>
                    <Label htmlFor='event_date'>Fecha</Label>
                    <Input type="date" name="event_date" id="event_date" defaultValue={date} />
                </div>
                <div>
                    <Label htmlFor='location'>Ubicación</Label>
                    <Input type="text" name="location" id="location" defaultValue={data?.location} accept='image/*' />
                </div>
                <div className="flex justify-between">
                    <Button formAction={handleUpdate} type='submit'>Actualizar</Button>
                    <DialogTrigger className=" bg-destructive font-bold p-2 text-sm rounded-md ">Cancelar</DialogTrigger>
                </div>
            </form>
        </DialogContent>
    </Dialog>
}
