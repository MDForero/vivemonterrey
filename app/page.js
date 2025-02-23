import AcceleratorCount from "@/components/AcceleratorCount";
import CardCategory from "@/components/CardCategory";
import Slider from "@/components/Slider";
import { createClient } from "@/utils/supabase/server";
import { CompassIcon, HotelIcon, PizzaIcon } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Vive Monterrey",
  description: "Descubre la esencia del llano en Monterrey, Casanare. Un destino que fusiona aventura, naturaleza y tradición en el corazón de Casanare. ¡Vive Monterrey es tu punto de partida!",
  keywords: "Monterrey, Casanare, Vive Monterrey, Llanos Orientales, Colombia, Turismo, Naturaleza, Aventura, Cultura Llanera, Gastronomía, Tradición, Ríos, Cascadas, Lagunas, Piscinas Naturales, Paratrike, Vuelos, Ecuestres, Miradores, Experiencias Agrarias, Senderos, Muestras Culturales, Biodiversidad, Llanuras, Llanero, ViveMonterrey, Vive Monterrey, ViveMonterrey.com, Vive Monterrey.com, ViveMonterrey.co, Vive Monterrey.co",
}

export default async function Home() {
  const supabase = createClient()

  const { data, error } = await supabase.from('categories').select('*, businesses(count)')

  const { count: countProducts, error: errorProducts } = await supabase.from('products').select('*', { count: 'exact', head: true })
  const { count: countBusiness, error: errorBusiness } = await supabase.from('businesses').select('*', { count: 'exact', head: true })
  const { count: countRooms, error: errorRooms } = await supabase.from('rooms').select('*', { count: 'exact', head: true })

  const countAccelerator = [
    {
      title: 'Descubre más de',
      subtitle: "sitios de interés",
      value: countBusiness,
      icon: <CompassIcon className="w-16 h-12 stroke-[with:20px]" />,
    },
    {
      title: 'Explora más de',
      subtitle: 'opciones de alojamiento.',
      value: countRooms,
      icon: <HotelIcon className="w-16 h-12" />,
    },
    {
      title: 'Disfruta más de',
      subtitle: 'platos únicos.',
      value: countProducts,
      icon: <PizzaIcon className="w-16 h-12" />,
    },
  ]

  return (
    <>
      <main className="relative z-0 container mx-auto h-fit">
        <iframe className='w-full aspect-video object-cover border-2 mx-auto' src="https://www.youtube.com/embed/TjeR7ZTvavc?playlist=TjeR7ZTvavc&autoplay=1&mute=1&loop=1&controls=0&fs=0" frameBorder="0" allow="autoplay" encrypted-media='true' allowFullScreen></iframe>
        {/* <video autoPlay className="object-cover aspect-square lg:aspect-auto w-full lg:h-[540px] xl:h-[680px] " muted loop     >
          <source src="/assets/presentacion-viveMonterrey.mp4" type="video/mp4" />
        </video> */}
      </main>
      <div className="lg:space-y-16 md:space-y-10  space-y-6 max-w-7xl mx-auto">

        {/* categorias de negocios */}
        <section className="space-y-8 border-2 m-2 p-3 py-8 lg:p-14">
          <div className="text-center space-y-2 ">
            <h1 className="text-4xl font-bold title">Descubre Monterrey, Casanare</h1>
            <h1 className="text-2xl font-bold text-primary/85">¡Tu guía perfecta para explorar lo mejor del Llano!</h1>
            <h3 className="text-xl text-primary/75">Adéntrate en la riqueza cultural, los paisajes naturales y las experiencias únicas que ofrece Monterrey. Encuentra alojamientos acogedores, vistas impresionantes desde miradores, actividades emocionantes, y mucho más. ViveMonterrey es el punto de inicio para planear tu próxima aventura. </h3>
          </div>

          <div className="flex justify-around gap-8 flex-wrap">
            {data?.map((category) => <CardCategory key={category.id} {...category} />)}
          </div>
        </section>

        {/* hero */}


        <section className="max-w-7xl mx-auto space-y-12 border p-2 md:p-4 lg:p-16" >
          <div className="text-center">
            <h1 className="font-bold md:text-3xl text-viveRed">Descubre Monterrey, Casanare en Números</h1>
            <h1 className="text-primary/70 font-semibold">Explora lo mejor de nuestra tierra: sitios de interés, alojamientos acogedores y gastronomía única</h1>
          </div>
          <div className="flex justify-evenly gap-8 flex-wrap">
            {countAccelerator?.map(count => <AcceleratorCount key={count.title} title={count.title} subtitle={count.subtitle} icon={count.icon} value={count.value} />)}
          </div>
        </section>
        {/* Cta para seguir a vive monterrey */}
        <section>
          <div className="flex items-center">

            <div className="w-2 h-14 bg-[#b91c1c] rounded-fulll">
            </div>
            <div className="">
              <p className="font-englebert font-bold text-xl leading-3">ELIGE<br />
                <span className="font-englebert font-bold text-4xl">Lo que te emociona</span></p>
            </div>
          </div>
          <Slider />
        </section>
      </div>
    </>
  );
}

const galleryInstagram = ['/assets/siguenos/Cascadas-algarrobos.jpg',
  '/assets/siguenos/Imagen de WhatsApp 2024-06-02 a las 17.48.20_dfbb70d2.jpg',
  '/assets/siguenos/Imagen de WhatsApp 2024-06-02 a las 17.48.20_314cc5b1.jpg',
  '/assets/siguenos/Imagen de WhatsApp 2024-06-02 a las 17.55.33_1cd5e501.jpg',
  '/assets/siguenos/Imagen de WhatsApp 2024-06-02 a las 17.48.20_9278bcb5.jpg',
  '/assets/siguenos/Imagen de WhatsApp 2024-06-02 a las 17.50.44_1b134760.jpg',
]