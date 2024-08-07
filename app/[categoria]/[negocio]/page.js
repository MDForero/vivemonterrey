import BannerImage from '@/components/BannerImage'
import BtnCtaWp from '@/components/BtnCtaWp'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'

export default async function page({ params }) {
    const supabase = createClient()
    const { data, error } = await supabase.from('businesses').select().eq('name', params.negocio.split('-').join(' ')).single()

    return <div className='container mx-auto'>
        {data?.whatsapp && <BtnCtaWp cta={data?.whatsapp}/>}
        <main className="relative h-[400px] md:h-[600px] overflow-hidden rounded-lg">
            <BannerImage path={data?.banner_url} buckets={'banners'} />
            <Image
                src="/placeholder.svg"
                alt="Business Image"
                width="1200"
                height="400"
            // style="aspect-ratio: 1200 / 400; object-fit: cover;"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center">
                <div className="text-center text-white">
                    <h1 className="text-3xl md:text-4xl font-bold">{data?.name}</h1>
                    <p className="text-lg md:text-xl font-medium">Your One-Stop Shop</p>
                </div>
            </div>
        </main>
        <aside className="container mx-auto flex justify-center flex-col md:flex-row  max-w-7xl gap-8 mt-12 listing ">
            <section className='max-w-4xl w-full space-y-8 p-2'>

            <div>
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
                </div>

                <div className=''>
                    <h2 className="text-2xl font-bold mb-4">Acerca de  <span className='capitalize'>{data?.name}</span></h2>
                    <p className="text-muted-foreground mb-6">
                        {data?.description}
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-4">Nuestros Servicios</h3>
                    <ul className="list-disc pl-6 flex flex-wrap gap-16">
                        <li>Product Design</li>
                        <li>Web Development</li>
                        <li>Digital Marketing</li>
                        <li>Consulting</li>
                    </ul>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-bold mb-4">Ubicacion</h3>
                    <div className="aspect-video rounded-lg overflow-hidden">
                        <iframe src={data?.map ?? "https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d248.4601111499341!2d-72.89577454192131!3d4.878929036236534!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sco!4v1722186221373!5m2!1ses!2sco"} width="100%" height="100%" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>

            </section>
            <section className='space-y-8 min-w-60'>

                <div>
                    <h3 className="text-xl font-bold mb-2">Follow Us</h3>
                    <div className="flex items-center gap-4">
                        <a className="text-muted-foreground hover:text-foreground" href="#" rel="ugc">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="w-6 h-6"
                            >
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                        </a>
                        <a className="text-muted-foreground hover:text-foreground" href="#" rel="ugc">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="w-6 h-6"
                            >
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                            </svg>
                        </a>
                        <a className="text-muted-foreground hover:text-foreground" href="#" rel="ugc">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="w-6 h-6"
                            >
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                            </svg>
                        </a>
                        <a className="text-muted-foreground hover:text-foreground" href="#" rel="ugc">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="w-6 h-6"
                            >
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect width="4" height="12" x="2" y="9"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-2">Business Hours</h3>
                    <div className="grid  gap-2">
                        <div>
                            <p className="font-medium">Monday - Friday</p>
                            <p className="text-muted-foreground">9:00 AM - 6:00 PM</p>
                        </div>
                        <div>
                            <p className="font-medium">Saturday</p>
                            <p className="text-muted-foreground">10:00 AM - 4:00 PM</p>
                        </div>
                        <div>
                            <p className="font-medium">Sunday</p>
                            <p className="text-muted-foreground">Closed</p>
                        </div>
                    </div>
                </div>

                
            </section>
        </aside>
    </div>
}