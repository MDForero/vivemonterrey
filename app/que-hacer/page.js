import CardBusinesses from "@/components/CardBusinesses"
import { createClient } from "@/utils/supabase/server"
import Image from "next/image"

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
        <main>
            <Image loading="lazy" src='/assets/portada-que-hacer.webp' width={0} height={0} className="w-full"/>
        </main>
        {data.map((business) => <CardBusinesses key={business.id} data={business} />)}
    </div>
}