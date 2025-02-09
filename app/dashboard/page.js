import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@/utils/supabase/server"
import { jwtDecode } from 'jwt-decode'


export default async function page() {
    const supabase = createClient()

    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) {
        console.error(error)
        return
    }

    const { data, errorProfile } = await supabase
        .from('profiles')
        .select('*, properties(count), businesses(count)')
        .eq('id', user?.id)
        .single()

    // Obtener la sesión actual
    const { data: session, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
        console.error(sessionError);
        return <div>Error al obtener la sesión</div>;
    }

    // Decodificar el token JWT si hay una sesión
    let userRole = null;
    if (session?.session?.access_token) {
        const jwt = jwtDecode(session.session.access_token);
        userRole = jwt.user_role; // Extraer el rol del usuario
        console.log('Token decodificado:', jwt);
        console.log('Rol del usuario:', userRole);
    }



    // Execute another function after getting the user
    if (error) {
        console.error(error)
        return
    }
    return <div className="container mx-auto">

    </div>
}