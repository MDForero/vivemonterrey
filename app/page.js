import CardCategory from "@/components/CardCategory";
import Slider from "@/components/Slider";
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
      <main className="relative z-0 container mx-auto">
<video autoPlay  className="object-cover aspect-square lg:aspect-auto w-full lg:h-[540px] xl:h-[680px] " muted loop     >
        <source src="/assets/presentacion-viveMonterrey.mp4" type="video/mp4" />
</video>
      </main>
      <div className="space-y-32 max-w-7xl mx-auto">

        {/* categorias de negocios */}
        <section className="space-y-8 border-2 m-2 sm-p-2 md:p-4 lg:p-14">
          <div className="text-center ">
            <h1 className="text-4xl font-bold title">¿Qué hacer en Monterrey Casanare?</h1>
            <h3 className="text-xl">Encuentra todo lo que necesitas para tu viaje ¡<span>ViveMonterrey</span> es tu punto de partida! </h3>
          </div>
          <div className="flex justify-around gap-8 flex-wrap">
            {data.map((category) => <CardCategory key={category.id} {...category} />)}
          </div>
        </section>

        {/* hero */}
        <section className="space-y-10 border-2 px-2 lg:pb-32 m-1">
          <h1 className="text-3xl md:text-5xl lg:text-7xl text-balance text-center title  ">Explora la esencia del llano en Monterrey, Casanare</h1>
          <article className="w-fit mx-auto max-w-5xl" >
            <div className="md:float-right relative md:ml-20 mb-20 w-fit mx-auto">
              <iframe className='h-[400px] lg:h-[550px] w-fit aspect-[9/16] object-cover border-2 mx-auto rounded-3xl' src="https://www.youtube.com/embed/t4MNuPljys0?playlist=t4MNuPljys0&autoplay=1&mute=1&loop=1&controls=0&fs=0" frameborder="0" allow="autoplay" encrypted-media allowfullscreen></iframe>


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
        <section>
          <h1 className="sm:text-xl md:text-3xl lg:text-5xl  text-center"> Siguenos como @vivemonterrey</h1>
          <div className='columns-2 md:columns-3 space-y-4'>
            {galleryInstagram.map((img, index) => <Image key={index} src={img} width={0} height={0} className="w-full h-full object-cover" alt='imagen de instagram de vive monterrey' />)}
          </div>
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