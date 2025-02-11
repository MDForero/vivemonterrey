import { createClient } from "@/utils/supabase/server"
import { jwtDecode } from "jwt-decode"
export default async function page() {
    const supabase = createClient()
    const { data: { session }, error } = await supabase.auth.getSession()
    const jwt = jwtDecode(session.access_token)
    const userRole = jwt.user_role


    if (userRole !== 'admin') {
        return <div>Acceso denegado</div>
    } else {
        const { count, errorCount } = await supabase.from('properties').select('*', { count: 'exact', head: true })
        const { data: { user }, error } = await supabase.auth.getUser()
        const { data, errorData} = await supabase.from('properties').select('*').eq('profile_id', user.id)
        return <div>
            propiedades {count} {userRole}
            {data?.map((item) => <div key={item.id}>{item.location_name}</div>)}
        </div>
    }
}