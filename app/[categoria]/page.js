import BannerImage from "@/components/BannerImage"
import CardBusinesses from "@/components/CardBusinesses"
import { createClient } from "@/utils/supabase/server"
export default async function page({ params }) {

    const categoria = params.categoria.split('-').join(' ')

    const supabase = createClient()
    const { data, error } = await supabase.from('categories').select('*, businesses(*)').eq('name', categoria)
    
    return (<>
        <main className="relative">
            <BannerImage path={data[0]?.image_url} buckets={'categories_image'} />
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-slate-950/30 flex justify-center items-center text-white text-6xl font-bold">
                <h1 className="text-center">{categoria}</h1>
            </div>
        </main>
        <div className="flex flex-row flex-wrap justify-center items-center gap-12">
            {data[0]?.businesses.map((category) => <CardBusinesses key={category.id} data={category} />)}
        </div>
    </>)
}    