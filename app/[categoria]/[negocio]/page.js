import BannerImage from '@/components/BannerImage'
import BtnCtaWp from '@/components/BtnCtaWp'
import ImgGallery from '@/components/ImgGallery'
import SocialMediaButton from '@/components/SocialMediaButton'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'

export default async function page({ params }) {
    
    const supabase = createClient()
    const { data, error } = await supabase.from('businesses').select().eq('name', decodeURI(params.negocio).split('-').join(' ')).single()

    return <div className='container mx-auto'>
        {data?.whatsapp && <BtnCtaWp cta={data?.whatsapp} />}
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
                </div>
            </div>
        </main>
        <aside className="container mx-auto flex justify-center flex-col md:flex-row  max-w-7xl gap-8 mt-12 listing ">
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
                        <iframe src={data?.iframe_maps ?? "https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d248.4601111499341!2d-72.89577454192131!3d4.878929036236534!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sco!4v1722186221373!5m2!1ses!2sco"} width="100%" height="100%" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>

            </section>
            <section className='space-y-8 min-w-60'>

                {data?.socials_account &&  <div>
                                        <h3 className="text-xl font-bold mb-2">Síguenos</h3>
                    <div className="flex items-center gap-4">
                        {data?.socials_account?.map((social, index) => <SocialMediaButton url={social} key={index}/>)}
                    </div>
                </div>}

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
        <section className=' columns-1 md:columns-2 lg:columns-3 space-y-4 max-w-7xl mx-auto '>
            {data?.gallery.map((image, index) => <ImgGallery path={image} key={index} className=' reveal-in rounded-xl border-4'/>)}
        </section>
        <BtnCtaWp cta={`https://wa.me/+57${data?.phone}`} />
    </div>
}