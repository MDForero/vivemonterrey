import CardEvent from "@/components/CardEvent"
import { createClient } from "@/utils/supabase/server"
export const metadata = {
    title: "Eventos",
    description: "Encuentra los eventos mas importantes de Monterrey Casanare.",
    keywords: "Eventos en Monterrey, Eventos Monterrey Casanare",
    image: "/assets/portada-explora.webp",
}
export default async function page() {
    const supabase = createClient()
    const dateNow = new Date()
    const date = dateNow.toISOString()
    const nextMonthDate = new Date(dateNow.setMonth(dateNow.getMonth() + 1)).toISOString()
    const { data: events, error } = await supabase.from('events').select('*').gte('event_date', date).lte('event_date', nextMonthDate)
    console.log(events, "events", error, "error")
    return <>
        {events && events.map((event, index) => <CardEvent key={index} event={event} />)}
    </>
}