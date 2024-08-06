import BannerImage from "@/components/BannerImage"
import CardBusinesses from "@/components/CardBusinesses"
import { createClient } from "@/utils/supabase/server"
export default async function page({ params }) {

    const supabase = createClient()
    const { data, error } = await supabase.from('categories').select('*, businesses(*)').eq('name', params.categoria)
    console.log(data)

    return (<>
        <main className="relative">
            <BannerImage path={data[0]?.image_url} buckets={'categories_image'} />
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-slate-950/30 flex justify-center items-center text-white text-6xl font-bold">
                <h1 className="text-center">{params.categoria}</h1>
            </div>
        </main>
        <div className="flex flex-col justify-center items-center space-y-8">
            {data[0]?.businesses.map((category) => <CardBusinesses key={category.id} data={category} />)}
        </div>
    </>)
}    