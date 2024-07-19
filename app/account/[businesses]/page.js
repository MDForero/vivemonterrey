import { createClient } from "@/utils/supabase/server"

export default async function Page(params) {
    const supabase = createClient()
    const business = await supabase.from('businesses').select('*').eq('id', params.businesses)
    console.log(business)
    return <div>Hola Mundo</div>
}