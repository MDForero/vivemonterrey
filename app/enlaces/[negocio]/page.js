import ImageSupabase from "@/components/ImageSupabase"
import SocialMediaButton from "@/components/SocialMediaButton"
import { Card } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { createClient } from "@/utils/supabase/server"
import { PhoneCallIcon, WifiIcon } from "lucide-react"
import Link from "next/link"


export async function generateMetadata({ params }) {
    const supabase = createClient()
    const { data: business, error } = await supabase.from('businesses').select('*, products(count), rooms(count), categories(name) ').eq('name', decodeURI(params.negocio).split('-').join(' ')).single()
    return {
        title: business.name,
        description: business.description,
    }
}



export default async function Page(props) {
    const params = await props.params;

    const supabase = createClient()

    const { data: business, error } = await supabase.from('businesses').select('*, products(count), rooms(count), categories(name) ').eq('name', decodeURI(params.negocio).split('-').join(' ')).single()
    const { data: categories, error: errorCategories } = await supabase.from('categories').select('image_url, name')
    const products = business.products[0].count
    const rooms = business.rooms[0].count
    console.log(business, categories)


    return <section className="max-w-xl space-y-20 mx-auto">
        <main className="space-y-16">
            <div className="relative">
                <ImageSupabase url={business.banner_url} buckets={'banners'} className={'w-full aspect-video object-cover rounded-md'} alt={`imagen principal de ${business.name} `} />

                <div className="absolute -bottom-1/4 inset-x-0 flex justify-center items-center p-4">
                    <ImageSupabase url={business.logo} buckets={'banners'} className={'w-32 h-32 md:w-44 md:h-44 object-contain rounded-full '} alt={`logo de ${business.name} `} />
                </div>
            </div>
            <h2 className="text-center">{business.name}</h2>
        </main>
        <aside className="space-y-8 w-11/12 mx-auto">

            <div className="flex justify-center gap-8">
                {business?.socials_account?.map((social, index) => <SocialMediaButton url={social} key={index} style='sticker' />)}
                <SocialMediaButton url={`https://wa.me/+57${business?.phone}`} style={'sticker'} />
                <a href={`tel:+57${business?.phone}`} className="bg-blue-700 text-white flex justify-center items-center w-12 h-12 rounded-full"><PhoneCallIcon /> </a>
                {business?.wifi_name !== null && <a href={`WIFI:S:${business?.wifi_name};T:WPA;P:${business?.wifi_password};H:${false};`} className="bg-blue-700 text-white flex justify-center items-center w-12 h-12 rounded-full"><WifiIcon /> </a>}
            </div >

            {
                rooms !== 0 &&
                <div className='p-1 border-2 rounded-sm aspect-video max-w-md mx-auto'>
                    <Link href={`/que-hacer/${params.negocio}`} className="relative">
                        <ImageSupabase url={business?.banner_url} className={'w-full aspect-video rounded-sm'} buckets={'banners'} />
                        <div className="absolute bottom-0 inset-x-0 font-bold rounded-md mx-auto">
                            <p className="mx-auto font-bold bg-white block w-fit p-1 rounded-sm"> Habitaciones</p>
                        </div>
                    </Link>
                </div>
            }
            {
                products !== 0 &&
                <div className='p-1 border-2 rounded-sm max-w-md'>
                    <Link href={`/que-hacer/${params.business}/menu`} className="relative">
                        <ImageSupabase url={business?.image_restaurant} className={'w-full aspect-video rounded-sm'} buckets={'banners'} />
                        <div className="absolute bottom-0 inset-x-0 font-bold rounded-md mx-auto">
                            <p className="mx-auto font-bold bg-white block w-fit p-1 rounded-sm"> Menú o Carta</p>
                        </div>
                    </Link>
                </div>
            }

            {
                business?.iframe_maps !== null && business.location !== null && <a href={business?.location} className="block">

                    <iframe src={business?.iframe_maps ?? "https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d248.4601111499341!2d-72.89577454192131!3d4.878929036236534!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sco!4v1722186221373!5m2!1ses!2sco"} className='max-w-md mx-auto w-full  aspect-video rounded-xl' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </a>
            }
            <ScrollArea className="max-w-md w-full h-60 mx-auto" orientation="horizontal">
                <div className="flex w-max space-x-4 p-4">
                    {categories?.map(category => category.name === business.categories[0].name ? null : <Link className="h-52 aspect-square relative " key={category.name} href={category.name.split(' ').join('-')}><div className="absolute inset-y-0 inset-x-0 bg-black/20 font-bold rounded-md flex justify-center items-center text-white font-englebert">{category.name}</div>
                        <ImageSupabase url={category.image_url} className={'w-full aspect-square object-cover rounded-md'} buckets={'categories_image'} />
                    </Link>)}
                </div>
                <ScrollBar orientation={'horizontal'} />
            </ScrollArea>
            {/* {Object.keys(business).map((key, index) => <div key={index}>{key} <br /></div>)} */}
        </aside >
    </section >
}