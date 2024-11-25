import BannerImage from "@/components/BannerImage"
import CardBusinesses from "@/components/CardBusinesses"
import { createClient } from "@/utils/supabase/server"
export default async function page({ params }) {

    const categoria = params.categoria.split('-').join(' ')

    const supabase = createClient()
    const { data, error } = await supabase.from('categories').select('*, businesses(*)').eq('name', categoria)
    return (<>
        <main className="relative h-full w-full container mx-auto">
            <BannerImage path={data[0]?.image_url} buckets={'categories_image'} className='hidden md:block ' />
        </main>
        <div className=" md:flex flex-col justify-center items-center  font-light">
            <h1 className="text-center text-[#b91c1c] text-pretty text-3xl md:text-4xl lg:text-5xl font-semibold ">{data[0]?.name} en Monterrey Casanare</h1>
            <p className="text-center text-lg md:text-xl  max-w-5xl p-2">{data[0]?.description}</p>
        </div>
        <div className="flex flex-row flex-wrap justify-center  gap-12">
            {data[0]?.businesses.map((category) => <CardBusinesses key={category.id} data={category} />)}
        </div>
    </>)
}    