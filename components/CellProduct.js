'use client'
import { useEffect, useState } from "react";
import DeleteProduct from "./DeleteProduct";
import DialogUpdateProduct from "./DialogUpdateProduct";
import ImageSupabase from "./ImageSupabase";
import { TableCell, TableRow } from "./ui/table";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

export default function CellProduct({ product, business }) {
    const supabase = createClient()
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function downloadImage(path) {
            try {
                const { data, error } = await supabase.storage.from('banners').download(path)
                if (error) {
                    throw error
                }
                console.log('Data: ', data)
                const url = URL.createObjectURL(data)
                setImage(url)
                console.log('URL: ', image)
                setLoading(false)
            } catch (error) {
                console.log('Error downloading image: ', error)
            }
        }

        if (product?.image) downloadImage(product.image)
    }, [product.image])

    return (<TableRow className="">
        <TableCell>
           {image && <Image src={image} alt={product?.name} width={0} height={0} className="w-20 h-20 object-cover  " />}
           {loading && <Skeleton className="w-20 h-20" />}  
        </TableCell>
        <TableCell>{product?.name}</TableCell>
        <TableCell>{product?.price}</TableCell>
        <TableCell >
            <div className="flex w-full justify-around">
                <DialogUpdateProduct product={product} businessLink={business.enlace} categories_restaurant={business.categories_restaurant}/>
                <DeleteProduct name={product?.name} id={product?.id} />
            </div>
        </TableCell>
    </TableRow>
    )
}