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
        <video autoPlay className="object-cover aspect-square lg:aspect-auto w-full lg:h-[540px] xl:h-[680px] " muted loop     >
          <source src="/assets/presentacion-viveMonterrey.mp4" type="video/mp4" />
        </video>
      </main>
      <div className="lg:space-y-52 md:space-y-24  space-y-16 max-w-7xl mx-auto">

        {/* categorias de negocios */}
        <section className="space-y-8 border-2 m-2 p-3 py-8 lg:p-14">
          <div className="text-center ">
            <h1 className="text-4xl font-bold title">¿Qué hacer en Monterrey Casanare?</h1>
            <h3 className="text-xl">Encuentra todo lo que necesitas para tu viaje ¡<span>ViveMonterrey</span> es tu punto de partida! </h3>
          </div>

          <div className="flex justify-around gap-8 flex-wrap">
            {data?.map((category) => <CardCategory key={category.id} {...category} />)}
          </div>
        </section>

        {/* hero */}
        <section className="space-y-10 border-2 px-2 lg:pb-32 m-2 p-3 py-8 lg:p-14">
          <h1 className="text-3xl md:text-5xl lg:text-7xl text-balance text-center title  ">Explora la esencia del llano en Monterrey, Casanare</h1>
          <article className="w-fit mx-auto max-w-5xl" >
            <div className="md:float-right relative md:ml-20 mb-20 w-fit mx-auto">
              <iframe className='h-[400px] lg:h-[550px] w-fit aspect-[9/16] object-cover border-2 mx-auto rounded-3xl' src="https://www.youtube.com/embed/t4MNuPljys0?playlist=t4MNuPljys0&autoplay=1&mute=1&loop=1&controls=0&fs=0" frameBorder="0" allow="autoplay" encrypted-media='true' allowFullScreen></iframe>


              {/* <div className="absolute -bottom-4 -left-4 w-3/5 h-3/5 bg-gray-600 z-50 "></div> */}
            </div>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-englebert ml-14 mb-3">¡Bienvenido a ViveMonterrey!</h2>
            <p className="">
              Descubre el tesoro escondido de los llanos orientales, <strong className="font-englebert ">un destino que fusiona aventura, naturaleza y tradición</strong> en el corazón de Casanare. <strong className="font-englebert ">Un paraíso donde la cultura llanera se entrelaza con una asombrosa riqueza hídrica,</strong> invitándote a ser parte de nuestra historia desde el momento en que llegas.
              <br />
              <br />
              Sumérgete en la inolvidable experiencia que ofrece Monterrey y <strong className="font-englebert "> crea tus propias memorias de emoción y serenidad.</strong> Refréscate en nuestros <strong className="font-englebert ">ríos cristalinos, cascadas majestuosas, lagunas serenas y piscinas naturales,</strong> testigos de la abundancia acuática de nuestra tierra. Desde <strong className="font-englebert ">emocionantes vuelos en paratrike</strong> sobre las vastas llanuras, hasta <strong className="font-englebert ">vivir un día como un verdadero llanero,</strong> ViveMonterrey te invita a descubrir la perfecta armonía entre <strong className="font-englebert ">adrenalina y tradición.</strong>
              <br />
              <br />
              Deleita tus sentidos con nuestra <strong className="font-englebert ">exquisita gastronomía local,</strong> maravíllate con <strong className="font-englebert ">impresionantes shows ecuestres,</strong> y conecta con la tierra a través de fascinantes <strong className="font-englebert ">experiencias agrarias.</strong> Asciende a nuestros <strong className="font-englebert ">miradores panorámicos</strong> para contemplar la imponente extensión de las llanuras, un espectáculo que te dejará sin aliento. Ya sea cabalgando por nuestros senderos o presenciando <strong className="font-englebert ">vibrantes muestras culturales</strong>, en Monterrey cada momento es una aventura que te acerca más a la esencia del llano colombiano y su extraordinaria biodiversidad.</p>
          </article>
        </section>

        <section className="max-w-6xl mx-auto space-y-12">
          <div className="text-center">
            <h1 className="font-bold md:text-3xl text-viveRed">Descubre Monterrey, Casanare en Números</h1>
            <h1 className="text-viveRed/70">Explora lo mejor de nuestra tierra: sitios de interés, alojamientos acogedores y gastronomía única</h1>
          </div>
          <div className="flex justify-around gap-8 flex-wrap">
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