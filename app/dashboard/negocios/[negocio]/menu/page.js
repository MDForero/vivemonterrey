import CardProducts from "@/components/CardProducts"
import DialogUpdateProduct from "@/components/DialogUpdateProduct"
import ImageMainMenu from "@/components/ImageMainMenu"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/server"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import { deleteProduct } from "./action"
import { Delete } from "lucide-react"
import DeleteProduct from "@/components/DeleteProduct"


export default async function page({ params }) {
    const supabase = createClient()
    const { data, error } = await supabase.from('businesses')
        .select('image_restaurant, products(*)')
        .eq('name', decodeURI(params.negocio)
            .split('-').join(' ')).single()
            

    return <div>
        <ImageMainMenu name='image_restaurant' data={data.image_restaurant} params={params}/>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-3">
            <a href={`/dashboard/negocios/${params.negocio}/registrar-producto`} className="md:max-w-96 flex justify-center items-center border rounded-2xl  w-44 md:w-full h-full bg-gray-200">
                <PlusCircledIcon className="w-20 h-20  " />
            </a>
            {data.products.map((product, index) => <div key={index} className="border p-2 w-fit ">
                <CardProducts product={product} />
                <div className="flex justify-between">
                    <DialogUpdateProduct product={product} />
                    <DeleteProduct name={product.name} id={product.id} />
                </div>
            </div>)}
        </div>
    </div>
}