import CardBusinesses from "@/components/CardBusinesses"
import ImageSupabase from "@/components/ImageSupabase"
import PaginationBusinesses from "@/components/PaginationBusinesses"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@/utils/supabase/server"
import Image from "next/image"

export const metadata = {
    title: "¿Qué hacer en Monterrey Casanare?",
    description: "Encuentra todo lo que Monterrey Casaanre tiene para ofrecerte. En Vive Monterrey podras encontrar toda la información necesaria para disfrutar de Monterrey Casanare, desde los mejores restaurantes, hoteles, sitios turisticos y mucho más",
    keywords: "Monterrey, Casanare, Vive Monterrey, Llanos Orientales, Colombia, Turismo, Naturaleza, Aventura, Cultura Llanera, Gastronomía, Tradición, Ríos, Cascadas, Lagunas, Piscinas Naturales, Paratrike, Vuelos, Ecuestres, Miradores, Experiencias Agrarias, Senderos, Muestras Culturales, Biodiversidad, Llanuras, Llanero, ViveMonterrey, Vive Monterrey, ViveMonterrey.com, Vive Monterrey.com, ViveMonterrey.co, Vive Monterrey.co",
}

export default async function page() {

    return <div className="bg-gray-50 space-y-8">
        <main>
            <figure className="w-full h-[380px] md:h-[420px] lg:h-[600px]  overflow-hidden">
                <ImageSupabase url={'monterrey.png'} buckets={'assets'} alt="Imagen de portada que hacer en monterrey" className=" w-full sm:h-[380px] md:h-[420px] lg:h-[600px] object-cover" />
            </figure>
        </main>
        <div className=" container mx-auto flex flex-col justify-center space-y-16 items-center ">

            <div className=" md:flex flex-col justify-center space items-center  font-light">
                <div className="space-y-4">
                    <h1 className="text-center text-[#b91c1c] text-pretty text-3xl md:text-4xl lg:text-5xl font-semibold ">¿Qué hacer en Monterrey Casanare?</h1>
                    <Separator className='border-2 border-viveRed/60 rounded-full ' />
                </div>
                <p className="text-center text-lg md:text-xl  max-w-5xl p-2">Encuentra todo lo que Monterrey Casanare tiene para ofrecerte. En Vive Monterrey podras encontrar toda la información necesaria para disfrutar de Monterrey Casanare, desde los mejores restaurantes, hoteles, sitios turisticos y mucho más</p>
            </div>
            <PaginationBusinesses />
        </div>
    </div>
}