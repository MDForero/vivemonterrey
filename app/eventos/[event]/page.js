import ImageSupabase from "@/components/ImageSupabase"
import { createClient } from "@/utils/supabase/server"


export async function generateMetadata({ params }) {
    const supabase = createClient()
    const { data: event, error } = await supabase.from('events').select('*').eq('enlace', params?.event).single()
    if (error) {
        return { title: 'Error', description: 'Error' }
    }
    return {
        title: `${event?.name} en Monterrey Casanare`,
        description: `${event?.name} en Monterrey Casanare`,

    }
}


export default async function page({ params }) {
    const supabase = createClient()

    const { data: event, error } = await supabase.from('events').select('*').eq('enlace', params?.event).single()

    const urlCalendar = `http://www.google.com/calendar/event?action=TEMPLATE&trp=false&text=${event.name}&location=${event.location}&details=${event.name}&dates=${event.event_date}`;
    const month = new Date(event?.event_date).toLocaleString('es-ES', { month: 'long', year: 'numeric', day: 'numeric' })
    // console.log(month, 'month')  
    if (error) {
        return <h1>Error</h1>
    } else {
        return <>
            <section className="flex w-full aspect-[2/1] bg-red-800">
                <figure className="w-1/2">
                    <ImageSupabase url={event?.image} alt={event?.name} buckets={'banners'} className='w-full aspect-[] object-cover ' />
                </figure>
                <div className="text-gray-50 relative space-y-12">
                    
                    <a href="share" className="block text-right">share</a>
                    <h1 className="lg:text-7xl font-semibold">{event?.name}</h1>
                    <div>
                        <p className="text-2xl"><strong>Fecha: </strong>{month}</p>
                        <p className="text-2xl"><strong>Lugar: </strong>{event?.location}</p>
                    </div>
                    <div className="flex w-full justify-between">
                        <a href={event?.web}>Visitar el sitio web {'->'}</a>
                        <a href={urlCalendar} target="_blank" className="bg-yellow-500">Agregar al calendario</a>
                    </div>
                </div>
            </section>
        </>
    }
} 