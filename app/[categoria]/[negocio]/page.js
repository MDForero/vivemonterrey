import BannerImage from '@/components/BannerImage'
import BtnCtaWp from '@/components/BtnCtaWp'
import ImgGallery from '@/components/ImgGallery'
import SocialMediaButton from '@/components/SocialMediaButton'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'

export default async function page({ params }) {

    const supabase = createClient()
    const { data, error } = await supabase.from('businesses').select('*, categories(name)').eq('name', decodeURI(params.negocio).split('-').join(' ')).single()

    const schedule = data?.schedule ? Object.entries(JSON.parse(data.schedule)) : []
    const categories = data?.categories?.map(category => category.name)

    console.log(data, categories)
    
    return <div className='container mx-auto space-y-16'>

        {data?.whatsapp && <BtnCtaWp cta={data?.whatsapp} />}
        <main className="relative h-[400px] md:h-[600px] overflow-hidden rounded-lg">
            <BannerImage path={data?.banner_url} buckets={'banners'} />
        </main>

                <div className="text-center  flex justify-center items-center flex-col">
                    <ImgGallery path={data?.logo} className='w-44 lg:w-60 h-full  bg-black/70 p-2' />
                </div>
                {categories.includes('Restaurantes') ? <a href='menu'  className='mx-auto text-2xl font-bold font-englebert'>Menu</a> : null}
        <aside className="container mx-auto flex justify-center items-start flex-col md:flex-row mt-12 max-w-7xl gap-8  listing ">
            <section className='max-w-4xl w-full space-y-8'>

                {/* <div>
                    <h3 className="text-xl font-bold mb-2">Meet the Owner</h3>
                    <div className="flex items-center gap-4">
                        <Image
                            src="/placeholder.svg"
                            alt="Owner"
                            width="80"
                            height="80"
                            className="rounded-full aspect-[80/80] object-cover"
                        />
                        <div>
                            <h4 className="text-lg font-bold">John Doe</h4>
                            <p className="text-muted-foreground">Founder and CEO</p>
                        </div>
                    </div>
                </div> */}

{/* Descripcion */}

                <div className=''>
                    <h2 className="text-2xl font-bold mb-4">Acerca de  <span className='capitalize font-englebert'>{data?.name}</span></h2>
                    <p className="text-muted-foreground mb-6">
                        {data?.description.split('\n').map((paragraph, index) => <span key={index}>{paragraph}<br /></span>)}
                    </p>
                </div>

{/* Servicios */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Nuestros Servicios</h3>
                    <ul className=" md:columns-3 space-y-2">
                        {data?.amenities?.map((amenity, index) => <li key={index} className="text-muted-foreground flex gap-1">
                            <svg viewBox="0 0 24 24" width={24} height={24}  className='fill-green-700' xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M6 3C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V6C21 4.34315 19.6569 3 18 3H6ZM17.8 8.6C18.1314 8.15817 18.0418 7.53137 17.6 7.2C17.1582 6.86863 16.5314 6.95817 16.2 7.4L10.8918 14.4776L8.70711 12.2929C8.31658 11.9024 7.68342 11.9024 7.29289 12.2929C6.90237 12.6834 6.90237 13.3166 7.29289 13.7071L10.2929 16.7071C10.4979 16.9121 10.7817 17.018 11.0709 16.9975C11.3601 16.9769 11.6261 16.8319 11.8 16.6L17.8 8.6Z"  ></path> </g></svg>
                            {amenity}
                        </li>)}
                    </ul>
                </div>

{/* Ubicacion */}

                <div>
                    <h3 className="text-xl font-bold mb-4">Ubicacion</h3>
                    <div className="aspect-video rounded-lg overflow-hidden">
                        <iframe src={data?.iframe_maps ?? "https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d248.4601111499341!2d-72.89577454192131!3d4.878929036236534!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sco!4v1722186221373!5m2!1ses!2sco"} width="100%" height="100%" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>

            </section>
            <section className='space-y-8 min-w-60'>

{/* Redes sociales*/}
                {data?.socials_account && <div>
                    <h3 className="text-xl font-bold mb-2">Síguenos</h3>
                    <div className="flex items-center gap-4">
                        {data?.socials_account?.map((social, index) => <SocialMediaButton url={social} key={index} />)}
                    </div>
                </div>}

{/* Horarios de servicio */}
                {data?.schedule && <div>
                    <h3 className="text-xl font-bold mb-2">Horario</h3>
                    <dl>
                        {schedule.map(([key, value], index) => <div key={index} className='border-b flex justify-between py-2 text-sm'>
                            <dt className="text-muted-foreground font-medium capitalize">{key}</dt>
                            {value.open || value.twentyFour ? <>
                                {(value.open) && <dd className="text-muted-foreground">{value.open} - {value.close}</dd>}
                                {(value.twentyFour) && <dd className="text-muted-foreground">24 horas</dd>}
                            </> : <dd className="text-muted-foreground">Cerrado</dd>}
                        </div>)}
                    </dl>
                </div>
                }

            </section>
        </aside>
        <section className=' columns-1 md:columns-2 lg:columns-3 space-y-4 max-w-7xl mx-auto '>
            {data?.gallery.map((image, index) => <ImgGallery path={image} key={index} className=' w-full object-cover reveal-in rounded-xl border-4' />)}
        </section>
        <BtnCtaWp cta={`https://wa.me/+57${data?.phone}`} />
    </div>
}