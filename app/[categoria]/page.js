import BannerImage from "@/components/BannerImage"
import ClientOnly from "@/components/ClientOnly"
import CardBusinesses from "@/components/explora/CardBusinesses"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export async function generateMetadata({ params }) {
    const supabase = createClient()
    const { data, error } = await supabase.from('categories').select('*, businesses(*)').eq('name', params.categoria.split('-').join(' ')).single()
    return {
        title: `${data?.name} en Monterrey Casanare`,
        description: `${data?.name} en Monterrey Casanare`,
    }
}



export default async function page(props) {
    const params = await props.params;

    const categoria = params.categoria.split('-').join(' ')

    const supabase = createClient()
    const { data, error } = await supabase.from('categories').select('*, businesses(*)').eq('name', categoria).single()
    console.log(data)
    if (error) {
        redirect('/')
    }
    return (<>

        <main className="relative h-full w-full container mx-auto">
            <BannerImage path={data?.image_url} buckets={'categories_image'} className='hidden md:block ' />
        </main>
        <div className=" md:flex flex-col justify-center items-center  font-light">
            <h1 className="text-center text-[#3F7D58] text-pretty text-3xl md:text-4xl lg:text-5xl font-semibold ">{data?.name} en Monterrey Casanare</h1>
            <p className="text-center text-lg md:text-xl  max-w-5xl p-2">{data?.description}</p>
        </div>

        <div className="flex flex-row flex-wrap justify-center  gap-12">
            <ClientOnly>
                {data && data?.businesses?.map((category) => <CardBusinesses key={category.id} data={category} />)}
            </ClientOnly>
        </div>
    </>)
}    