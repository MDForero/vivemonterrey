import QrCode from "@/components/QrCode"
import { createClient } from "@/utils/supabase/server"

export default async function page() {
    const supabase = createClient()
    const { data: negocios, error } = await supabase.from('businesses').select('enlace, logo, name')

    return <div className="flex justify-center flex-wrap gap-8">
            {negocios?.map((negocio) => <div key={negocio.name} className="flex flex-col items-center border-2 w-fit">
                <h1 className="text-center">{negocio.name}</h1>
                <QrCode value={`vivemonterrey.com.co/enlaces/${negocio.enlace}`} logo={negocio.logo} />
            </div>
            )}
    </div>
}