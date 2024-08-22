import CardBusinesses from "@/components/CardBusinesses"
import { createClient } from "@/utils/supabase/server"

export default async function page () {
    const supabase = createClient()
    const { data, error } = await supabase.from('businesses').select('*, categories(name)')
    if (error){
        return <div className="container mx-auto">
            <h1>Error al cargar la página</h1>
            </div>
    }
    console.log(data[0].categories)
    return <div className=" container mx-auto flex flex-col justify-center items-center bg-gray-50 ">
        {data.map((business) => <CardBusinesses key={business.id} data={business} />)}
    </div>
}