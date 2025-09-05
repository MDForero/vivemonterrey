import ClientOnly from "@/components/ClientOnly"
import ImageSupabase from "@/components/ImageSupabase"
import PaginationBusinesses from "@/components/PaginationBusinesses"
import Link from "next/link"

export const metadata = {
    title: "Explora Monterrey",
    description: "Encuentra todo lo que Monterrey Casaanre tiene para ofrecerte. En Vive Monterrey podras encontrar toda la información necesaria para disfrutar de Monterrey Casanare, desde los mejores restaurantes, hoteles, sitios turisticos y mucho más",
    keywords: "Monterrey, Casanare, Vive Monterrey, Llanos Orientales, Colombia, Turismo, Naturaleza, Aventura, Cultura Llanera, Gastronomía, Tradición, Ríos, Cascadas, Lagunas, Piscinas Naturales, Paratrike, Vuelos, Ecuestres, Miradores, Experiencias Agrarias, Senderos, Muestras Culturales, Biodiversidad, Llanuras, Llanero, ViveMonterrey, Vive Monterrey, ViveMonterrey.com, Vive Monterrey.com, ViveMonterrey.co, Vive Monterrey.co",
}

export default async function page() {
    const filters = [
        {
            label: "Filter by Price",
            options: [
                { value: "default", text: "Filter by Price" },
                { value: "$10-$100", text: "$10-$100" },
                { value: "$101-$200", text: "$101-$200" },
                { value: "$201-$300", text: "$201-$300" },
                { value: "$301-$400", text: "$301-$400" },
                { value: "$401-$500", text: "$401-$500" },
            ],
        },
        {
            label: "By Reviews",
            options: [
                { value: "default", text: "By Reviews" },
                { value: "1-star", text: "1 Star" },
                { value: "2-star", text: "2 Star" },
                { value: "3-star", text: "3 Star" },
                { value: "4-star", text: "4 Star" },
                { value: "5-star", text: "5 Star" },
            ],
        },
        {
            label: "By Language",
            options: [
                { value: "default", text: "By Language" },
                { value: "english", text: "English" },
                { value: "bangla", text: "Bangla" },
            ],
        },
        {
            label: "By Durations",
            options: [
                { value: "default", text: "By Durations" },
                { value: "10-100hr", text: "10-100hr" },
                { value: "101-200hr", text: "101-200hr" },
                { value: "201-300hr", text: "201-300hr" },
                { value: "301-400hr", text: "301-400hr" },
                { value: "401-500hr", text: "401-500hr" },
            ],
        },
        {
            label: "Short By",
            options: [
                { value: "default", text: "Short By" },
                { value: "new", text: "Newness" },
                { value: "old", text: "Oldest" },
                { value: "hight-to-low", text: "High To Low" },
                { value: "low-to-high", text: "Low To High" },
            ],
        },
    ];


    return <div className="bg-gray-50 space-y-8">
        <main>
            <figure className="w-full h-[380px] md:h-[420px] lg:h-[600px]  overflow-hidden">
                <ImageSupabase url={'monterrey.png'} buckets={'assets'} alt="Imagen de portada que hacer en monterrey" className=" w-full sm:h-[380px] md:h-[420px] lg:h-[600px] object-cover" />
            </figure>
        </main>

            <div className=" md:flex flex-col justify-center space items-center  font-light">
                <div className="space-y-4">
                    <h1 className="text-center text-[#3F7D58] text-pretty text-3xl md:text-4xl lg:text-5xl font-semibold ">¿Qué hacer en Monterrey Casanare?</h1>
                </div>
                <p className="text-center text-lg md:text-xl  max-w-5xl p-2">Encuentra todo lo que Monterrey Casanare tiene para ofrecerte. En Vive Monterrey podras encontrar toda la información necesaria para disfrutar de Monterrey Casanare, desde los mejores restaurantes, hoteles, sitios turisticos y mucho más</p>
            </div>
            <PaginationBusinesses />
    </div>
}