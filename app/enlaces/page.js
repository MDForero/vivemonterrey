import { createClient } from "@/utils/supabase/server"

export default async function page (){
    const supabase = createClient()
    const {data:negocios, error } = await supabase.from('businesses').select('name')

    return <div>
        <h1>Enlaces</h1>
        <ul>
            {negocios?.map((negocio) => <li key={negocio.name}> vivemonterrey.com.co/enlaces/{negocio.name.split(" ").join('-')}</li>)}
        </ul>
    </div>
}