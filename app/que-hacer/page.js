import CardBusinesses from "@/components/CardBusinesses"
import { createClient } from "@/utils/supabase/server"
import Image from "next/image"

export default async function page() {
    const supabase = createClient()
    const { data, error } = await supabase.from('businesses').select('*, categories(name)')
    if (error) {
        return <div className="container mx-auto">
            <h1>Error al cargar la página</h1>
        </div>
    }
    console.log(data[0].categories)
    return <div className=" container mx-auto flex flex-col justify-center space-y-16 items-center bg-gray-50 ">
        <main>
            <Image loading="lazy" src='/assets/portada-que-hacer.webp' width={0} height={0} className="w-full" />
        </main>
        <div className=" md:flex flex-col justify-center items-center  font-light">
            <h1 className="text-center text-[#b91c1c] text-pretty text-3xl md:text-4xl lg:text-5xl font-semibold ">¿Qué hacer en Monterrey Casanare?</h1>
            <p className="text-center text-lg md:text-xl  max-w-5xl p-2">Encuentra todo lo que Monterrey Casanare tiene para ofrecerte. En Vive Monterrey podras encontrar toda la información necesaria para disfrutar de Monterrey Casanare, desde los mejores restaurantes, hoteles, sitios turisticos y mucho más</p>
        </div>
        <section className="flex justify-evenly w-full flex-wrap py-8 gap-8 px-2 mx-1">
            {data.map((business) => <CardBusinesses key={business.id} data={business} />)}
        </section>
    </div>
}