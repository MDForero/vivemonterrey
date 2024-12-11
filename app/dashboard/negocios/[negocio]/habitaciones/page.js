import DialogUpdateProduct from "@/components/DialogUpdateProduct"
import { createClient } from "@/utils/supabase/server"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import CardRooms from "@/components/CardRooms"
import DeleteRoom from "@/components/DeleteRoom"


export default async function page({ params }) {
    const supabase = createClient()
    const { data, error } = await supabase.from('businesses')
        .select('image_restaurant, rooms(*)')
        .eq('name', decodeURI(params.negocio)
            .split('-').join(' ')).single()
            

    return <div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-3">
            <a href={`/dashboard/negocios/${params.negocio}/registrar-habitacion`} className="md:max-w-96 flex justify-center items-center border rounded-2xl  w-44 md:w-full h-full bg-gray-200">
                <PlusCircledIcon className="w-20 h-20  " />
            </a>
            {data.rooms.map((product, index) => <div key={index} className="border p-2 w-fit ">
                <CardRooms product={product} />
                <div className="flex justify-between">
                    <DialogUpdateProduct product={product} />
                    <DeleteRoom name={product.name} id={product.id} />
                </div>
            </div>)}
        </div>
    </div>
}