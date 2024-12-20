import BannerImage from '@/components/BannerImage'
import BookingButton from '@/components/BookingButton'
import BtnCtaWp from '@/components/BtnCtaWp'
import CardRooms from '@/components/CardRooms'
import ImgGallery from '@/components/ImgGallery'
import SocialMediaButton from '@/components/SocialMediaButton'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'

export default async function page(props) {
    const params = await props.params;

    const supabase = createClient()
    const { data, error } = await supabase.from('businesses').select('*, categories(name), rooms(*)').eq('name', decodeURI(params.negocio).split('-').join(' ')).single()

    const schedule = data?.schedule ? Object.entries(JSON.parse(data.schedule)) : []
    const categories = data?.categories?.map(category => category.name)

    console.log(data, categories)

    return <div className='container mx-auto space-y-16'>

        {data?.whatsapp && <BtnCtaWp cta={data?.whatsapp} />}
        <main className="relative h-[400px] md:h-[600px] overflow-hidden rounded-lg">
            <BannerImage path={data?.banner_url} buckets={'banners'} />
        </main>

        <div className="text-center  flex justify-center items-center flex-col">
            <ImgGallery path={data?.logo} className='w-44 lg:w-60 h-full  bg-black/70 rounded-full ' />
        </div>

        {categories?.includes('Restaurantes') ? <a href='menu' className='mx-auto flex justify-center items-center border-2 gap-4 text-2xl font-bold font-englebert max-w-sm w-full p-2 rounded-xl'>
            <svg viewBox="0 0 24 24" width='50' height='50' fill="none" xmlns="http://www.w3.org/2000/svg" >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 6.00008V4.2844C16 3.51587 16 3.13161 15.8387 2.88321C15.6976 2.66587 15.4776 2.5118 15.2252 2.45345C14.9366 2.38677 14.5755 2.51809 13.8532 2.78073L6.57982 5.4256C6.01064 5.63257 5.72605 5.73606 5.51615 5.91845C5.33073 6.07956 5.18772 6.28374 5.09968 6.51304C5 6.77264 5 7.07546 5 7.6811V12.0001M9 17.0001H15M9 13.5001H15M9 10.0001H15M8.2 21.0001H15.8C16.9201 21.0001 17.4802 21.0001 17.908 20.7821C18.2843 20.5903 18.5903 20.2844 18.782 19.9081C19 19.4802 19 18.9202 19 17.8001V9.20008C19 8.07997 19 7.51992 18.782 7.0921C18.5903 6.71577 18.2843 6.40981 17.908 6.21807C17.4802 6.00008 16.9201 6.00008 15.8 6.00008H8.2C7.0799 6.00008 6.51984 6.00008 6.09202 6.21807C5.71569 6.40981 5.40973 6.71577 5.21799 7.0921C5 7.51992 5 8.07997 5 9.20008V17.8001C5 18.9202 5 19.4802 5.21799 19.9081C5.40973 20.2844 5.71569 20.5903 6.09202 20.7821C6.51984 21.0001 7.07989 21.0001 8.2 21.0001Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g>
            </svg>Menu
        </a> : null}
        {categories?.includes('Alojamientos') && <ScrollArea className='w-full flex justify-center items-center px-4'>
            <div className='flex w-max mx-auto gap-4 justify-center items-center mb-12'>
                {data?.rooms.map((room, index) =><CardRooms product={room} key={index} />)}
            </div>
            <ScrollBar orientation='horizontal' />
        </ScrollArea>}

        <aside className="container mx-auto flex flex-col md:flex-row start  mt-12 max-w-7xl gap-8  listing ">

            <section className='block md:hidden'>
                {data?.socials_account && <div >
                    <h3 className="text-xl font-bold mb-2">Síguenos</h3>
                    <div className="space-y-2">
                        {data?.socials_account?.map((social, index) => <SocialMediaButton url={social} key={index} />)}
                        <SocialMediaButton url={`https://wa.me/+57${data?.phone}`} />
                    </div>
                </div>}
            </section>

            <section className='max-w-4xl w-full space-y-8 p-2'>

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

                {/* Ubicacion */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Ubicacion</h3>
                    <div className="lg:aspect-video rounded-lg overflow-hidden">
                        <iframe src={data?.iframe_maps ?? "https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d248.4601111499341!2d-72.89577454192131!3d4.878929036236534!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sco!4v1722186221373!5m2!1ses!2sco"} width="100%" height="100%" className='h-[420px]' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>


            </section>

            {/* Redes sociales*/}
            <section className='space-y-12 lg:max-w-sm w-full p-2'>

                {data?.socials_account && <div className='hidden md:block'>
                    <h3 className="text-xl font-bold mb-2">Síguenos</h3>
                    <div className="space-y-2">
                        {data?.socials_account?.map((social, index) => <SocialMediaButton url={social} key={index} />)}
                        <SocialMediaButton url={`https://wa.me/+57${data?.phone}`} />
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
                <div>
                    <h3 className="text-xl font-bold mb-4">Nuestros Servicios</h3>
                    <ul className=" space-y-2">
                        {data?.amenities?.map((amenity, index) => <li key={index} className="text-muted-foreground flex gap-1">
                            <svg viewBox="0 0 24 24" width={24} height={24} className='fill-green-700' xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M6 3C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V6C21 4.34315 19.6569 3 18 3H6ZM17.8 8.6C18.1314 8.15817 18.0418 7.53137 17.6 7.2C17.1582 6.86863 16.5314 6.95817 16.2 7.4L10.8918 14.4776L8.70711 12.2929C8.31658 11.9024 7.68342 11.9024 7.29289 12.2929C6.90237 12.6834 6.90237 13.3166 7.29289 13.7071L10.2929 16.7071C10.4979 16.9121 10.7817 17.018 11.0709 16.9975C11.3601 16.9769 11.6261 16.8319 11.8 16.6L17.8 8.6Z"  ></path> </g></svg>
                            {amenity}
                        </li>)}
                    </ul>
                </div>
            </section>

        </aside>
        <section className=' columns-1 md:columns-2 lg:columns-3 space-y-4 max-w-7xl mx-auto '>
            {data?.gallery.map((image, index) => <ImgGallery path={image} key={index} className=' w-full object-cover reveal-in rounded-xl border-4' />)}
        </section>
        <BtnCtaWp cta={`https://wa.me/+57${data?.phone}`} />
    </div>
}