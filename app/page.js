import CardCategory from "@/components/CardCategory";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

export default async function Home() {
  const supabase = createClient()
  const { data, error } = await supabase.from('categories').select(`
    *,
    businesses (name)
    )
  `)



  return (
    <>
      <main className="relative z-0">
        <Image src='/bannerMonterrey.webp' width={0} height={0} className="h-[400px] lg:h-[600px] w-full object-cover" alt='imagen aerea de Monterrey casanare'/>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col items-center justify-center text-white  font-bold">
          <Image src='/logo.svg' width={0} height={0} className="w-72" alt="Logo de vive monterrey solo letras" />
          <h1 className="text-3xl capitalize">Encuentra todo lo que Monterrey te puede ofrecer</h1>
          <h2 className="text-xl font-medium">Atractivos turísticos, Restaurantes, Hoteles y Tiendas</h2>
        </div>
      </main>
      <div className="space-y-32 max-w-7xl mx-auto">
        <section className="space-y-8 border-2 m-2 sm-p-2 md:p-4 lg:p-14">
          <div className="text-center ">
            <h1 className="text-4xl font-bold font-englebert">¿Qué hacer en Monterrey?</h1>
            <h3 className="text-xl">Encuentra todo lo que necesitas para tu viaje ¡<span>ViveMonterrey.co</span> es tu punto de partida! </h3>
          </div>
          <div className="flex justify-around gap-8 flex-wrap">
            {data.map((category) => <CardCategory key={category.id} {...category} />)}
          </div>
        </section>
      </div>
    </>
  );
}
