import ImageSupabase from "@/components/ImageSupabase"
import QrCode from "@/components/QrCode"
import SocialMediaButton from "@/components/SocialMediaButton"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { createClient } from "@/utils/supabase/server"
import { MapPin, PhoneCallIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export async function generateMetadata({ params }) {
    const supabase = createClient()
    const { data: business, error } = await supabase.from('businesses').select('*, products(count), rooms(count), categories(name) ').eq('enlace', params.negocio).single()
    return {
        title: business?.name + ' | Vive Monterrey',
        description: business?.description,
    }
}




export default async function Page(props) {
    const params = await props.params;

    const supabase = createClient()

    const { data: business, error } = await supabase.from('businesses').select('*, products(count), rooms(count), categories(name) ').eq('enlace', params.negocio).single()
    const { data: categories, error: errorCategories } = await supabase.from('categories').select('image_url, name')
    const products = business?.products[0].count
    const rooms = business?.rooms[0].count
    console.log(business, categories)



    return <section className="max-w-xl space-y-16 sm:space-y-24  mx-auto">
        <main className="space-y-8 md:space-y-16">
            <div className="relative">
                <ImageSupabase url={business?.banner_url} buckets={'banners'} className={'w-full aspect-video object-cover rounded-md'} alt={`imagen principal de ${business?.name} `} />

                <div className="absolute -bottom-1/4 w-1/3 right-1/3 bg-white flex justify-center items-center  rounded-full p-2 border-gray-400 border-[3px]">
                    <ImageSupabase url={business?.logo} buckets={'banners'} className={'w-full aspect-square md:w-44 p-4 object-contain  '} alt={`logo de ${business?.name} `} />
                </div>
            </div>

        </main>
        <aside className="space-y-4 md:space-y-8 w-11/12 mx-auto">

            <div>
                <div className="flex justify-center gap-8">
                    {business?.socials_account?.map((social, index) => <SocialMediaButton url={social} key={index} style='sticker' />)}
                    <SocialMediaButton url={`https://wa.me/+57${business?.phone}`} style={'sticker'} />
                </div >
                <div className="flex justify-center gap-8">
                    <a href={`tel:+57${business?.phone}`} className="bg-blue-700 text-white flex justify-center items-center w-12 h-12 rounded-full"><PhoneCallIcon /> </a>
                    <a href={`${business?.location}`} className="bg-blue-700 text-white flex justify-center items-center w-12 h-12 rounded-full"><MapPin /> </a>
                </div >
            </div>

            {
                rooms !== 0 &&
                <div className='p-1 border-2 rounded-sm aspect-video max-w-md mx-auto'>
                    <Link href={`/explora/${params.negocio}`} className="relative">
                        <ImageSupabase url={business?.banner_url} className={'w-full aspect-video rounded-sm'} buckets={'banners'} />
                        <div className="absolute bottom-0 inset-x-0 font-bold rounded-md mx-auto">
                            <p className="mx-auto font-bold bg-white block w-fit p-1 rounded-sm"> Habitaciones</p>
                        </div>
                    </Link>
                </div>
            }
            {
                products !== 0 &&
                <div className='p-1 border-2 rounded-sm max-w-md mx-auto'>
                    <Link href={`/explora/${params.negocio}/menu`} className="relative">
                        <ImageSupabase url={business?.image_restaurant ?? categories.find(category => 'Restaurantes' === category.name).image_url} className={'w-full aspect-video rounded-sm'} buckets={business?.image_restaurant ? 'banners' : 'categories_image'} />
                        <div className="absolute bottom-0 inset-x-0 font-bold rounded-md mx-auto">
                            <p className="mx-auto font-bold bg-white block w-fit p-1 rounded-sm"> Menú o Carta</p>
                        </div>
                    </Link>
                </div>
            }

            {business?.wifi_name !== null && <QrCode value={`WIFI:S:${business?.wifi_name};T:WPA;P:${business?.wifi_password};H:${false};`} logo={business?.logo} />}

            <div>
                <div className="text-center font-englebert font-semibold text-md">
                    <Image src={'/logo.svg'} alt="logo" width={0} height={0} className="mx-auto w-60" />
                    <p> Descubre todo lo que tenemos para ti en un solo lugar. Explora nuestras categorías y encuentra la información que necesitas para vivir la mejor experiencia. ¡Tu próxima aventura comienza aquí!</p>
                </div>
                <ScrollArea className="max-w-md w-full h-60 mx-auto" orientation="horizontal">
                    <div className="flex w-max space-x-4 p-4">
                        {categories?.map(category => category.name === business?.categories[0].name ? null : <Link className="h-52 aspect-square relative " key={category.name} href={`/${category.name.split(' ').join('-')}`}><div className="absolute inset-y-0 inset-x-0 bg-black/20 font-bold rounded-md flex justify-center items-center text-white font-englebert">{category.name}</div>
                            <ImageSupabase url={category.image_url} className={'w-full aspect-square object-cover rounded-md'} buckets={'categories_image'} />
                        </Link>)}
                    </div>
                    <ScrollBar orientation={'horizontal'} />
                </ScrollArea>
            </div>
            {/* {Object.keys(business).map((key, index) => <div key={index}>{key} <br /></div>)} */}
        </aside >
    </section >
}