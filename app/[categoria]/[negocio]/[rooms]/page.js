import CarouselImages from "@/components/CarouselImages"
import InputCalendar from "@/components/inputs/InputCalendar"
import { createClient } from "@/utils/supabase/server"

export default async function Page({ params }) {
    const supabase = createClient()
    const { data, error } = await supabase.from('rooms').select('*, businesses(phone)').eq('id', params.rooms).single()

    return <>
        <main className="relative">
            <div className="px-8 md:px-16">
                {data && <CarouselImages arrayImages={data?.images} />}
            </div>
            <div className="absolute bottom-0 left-auto right-auto w-full flex justify-between items-center px-8 md:px-16 py-4 bg-gradient-to-t from-black/80 to-transparent">
                <InputCalendar data={data} />
            </div>
        </main>
        <aside></aside>
        <p>{data?.description}</p>
        <h1>{data?.name}</h1>
    </>
} 