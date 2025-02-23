import Menu from "@/components/AppSheet";
import { createClient } from "@/utils/supabase/server";

export async function generateMetadata({ params }) {
    const supabase = createClient()
    const { data, error } = await supabase.from('businesses').select('*').eq('enlace', params?.negocio).single()
    return {
        title: `${data?.name} - Menu`,
        description: 'Menu de productos',
    }
}

export default function Page({ params }) {

    return (<> {params.negocio}
        <Menu params={params} />
    </>
    )
}
