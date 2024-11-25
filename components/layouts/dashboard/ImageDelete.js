'use client'
import { description } from "@/components/FormContact";
import ImageSupabase from "@/components/ImageSupabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function ImageDelete({ bucket, url, id, gallery }) {

    const supabase = createClient()
    const router = useRouter()
    const handleDelete = async () => {

        try {
            const galleryUpdate = gallery.filter((item) => item !== url)
            console.log('intento')
            const {data, error } = await supabase
                .from('businesses')
                .update({ gallery: galleryUpdate })
                .eq('id', id)
                .select()
            if (data) {
                console.log(data, 'update data')
                await supabase.storage.from(bucket).remove([url])    
            }
        } catch (error) {
            console.error(error)
            return
        }
    }
    return <Card>
        <CardHeader></CardHeader>
        <CardContent>
            <ImageSupabase buckets={bucket} url={url} className='aspect-square object-cover w-64 ' />
        </CardContent>
        <CardFooter>
            <Button variant='destructive' onClick={() => handleDelete()}>Borrar Imagen</Button>
        </CardFooter>
    </Card>
}