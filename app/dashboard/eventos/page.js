import { createClient } from "@/utils/supabase/server"

export default async function page() {
    const supabase = createClient()
    const { data: events, error } = await supabase.from('events').select('*').single()
    console.log(events)
    return <div>{events?.name}</div>
}