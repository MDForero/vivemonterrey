import Link from "next/link"
import ImageSupabase from "./ImageSupabase"

export default async function CardEvent({ event }) {
    const month = new Date(event?.event_date).toLocaleString('default', { month: 'long' })
    const day = new Date(event?.event_date).getDate()


    return <div className="relative lg:max-w-80   bg-white shadow-md rounded-md">
        <figure className="w-full overflow-hidden rounded-md aspect-[4/3]">
            <ImageSupabase url={event?.image} alt={event?.name} buckets={'banners'} className='w-full h-full object-cover' />
        </figure>
        <div className="absolute top-0 left-0 text-center text-white bg-viveRed p-2 rounded-md">
            <p className="text-4xl font-bold">{day}</p>
            <p className="text-xl fon-bold capitalize">{month.slice(0, 3)}</p>
        </div>
        <div className="p-4 space-y-2">
            <Link href={event?.enlace}><h2 className='text-3xl font-bold'>{event?.name}</h2></Link>
            <p className="text-xl">{event?.location}</p>
        </div>
    </div>
}