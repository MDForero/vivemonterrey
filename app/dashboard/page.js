import { createClient } from "@/utils/supabase/server"
import { jwtDecode } from 'jwt-decode'
import Link from "next/link"


export default async function page() {
    const supabase = createClient()

    // Obtener la sesión actual
    const { data: session, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
        console.error(sessionError);
        return <div>Error al obtener la sesión</div>;
    }

    // Decodificar el token JWT si hay una sesión
    const jwt = jwtDecode(session.session.access_token);
    console.log(jwt);
    const userRole = jwt.user_role; // Extraer el rol del usuario
    if (userRole) {
        switch (userRole) {
            case 'admin':
                return <div className="container flex gap-2 content-center justify-evenly items-center mx-auto w-fit flex-wrap">
                    <Link href='negocios' className="w-32 aspect-video bg-green-700 text-white font-bold content-center text-center rounded-md p-2">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M4.87617 3.75H19.1238L21 8.86683V10.5C21 11.2516 20.7177 11.9465 20.25 12.4667V21H3.75V12.4667C3.28234 11.9465 3 11.2516 3 10.5V8.86683L4.87617 3.75ZM18.1875 13.3929C18.3807 13.3929 18.5688 13.3731 18.75 13.3355V19.5H15V15H9L9 19.5H5.25V13.3355C5.43122 13.3731 5.61926 13.3929 5.8125 13.3929C6.63629 13.3929 7.36559 13.0334 7.875 12.4667C8.38441 13.0334 9.11371 13.3929 9.9375 13.3929C10.7613 13.3929 11.4906 13.0334 12 12.4667C12.5094 13.0334 13.2387 13.3929 14.0625 13.3929C14.8863 13.3929 15.6156 13.0334 16.125 12.4667C16.6344 13.0334 17.3637 13.3929 18.1875 13.3929ZM10.5 19.5H13.5V16.5H10.5L10.5 19.5ZM19.5 9.75V10.5C19.5 11.2965 18.8856 11.8929 18.1875 11.8929C17.4894 11.8929 16.875 11.2965 16.875 10.5V9.75H19.5ZM19.1762 8.25L18.0762 5.25H5.92383L4.82383 8.25H19.1762ZM4.5 9.75V10.5C4.5 11.2965 5.11439 11.8929 5.8125 11.8929C6.51061 11.8929 7.125 11.2965 7.125 10.5V9.75H4.5ZM8.625 9.75V10.5C8.625 11.2965 9.23939 11.8929 9.9375 11.8929C10.6356 11.8929 11.25 11.2965 11.25 10.5V9.75H8.625ZM12.75 9.75V10.5C12.75 11.2965 13.3644 11.8929 14.0625 11.8929C14.7606 11.8929 15.375 11.2965 15.375 10.5V9.75H12.75Z" fill="#f8f8f8"></path> </g></svg>
                        Negocios
                    </Link>
                    <Link href='propiedades' className="w-32 aspect-video bg-amber-700 text-white font-bold content-center text-center rounded-md p-2" >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 7.90637V18C19 19.1046 18.1046 20 17 20H7C5.89543 20 5 19.1046 5 18V7.90637M2 10.0001L10.8531 3.80297C11.5417 3.32092 12.4583 3.32092 13.1469 3.80297L22 10.0001" stroke="#f8f8f8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        Propiedades
                    </Link>
                    <Link href='eventos' className="w-32 aspect-video bg-red-600 text-white font-bold content-center text-center rounded-md p-2">
                        <svg fill="#f8f8f8" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> </style> <path d="M5,2v2H4C2.9,4,2,4.9,2,6v11c0,1.1,0.9,2,2,2h6.8c1.8-1.8,0,0,2-2H4V8h12v5.9c1.6-1.6,0.2-0.2,2-2V6c0-1.1-0.9-2-2-2h-1V2 h-2v2H7V2H5z M10,9.2l-0.8,2L7,11.4l1.6,1.4l-0.5,2.1l1.8-1.1l1.8,1.1l-0.5-2.1l1.6-1.4l-2.2-0.2L10,9.2z M20.5,12 c-0.1,0-0.3,0.1-0.4,0.2L19.3,13l2,2l0.8-0.8c0.2-0.2,0.2-0.6,0-0.7l-1.3-1.3C20.8,12,20.6,12,20.5,12z M18.8,13.5L12.3,20v2h2 l6.5-6.5L18.8,13.5"></path> <rect fill="none" width="24" height="24"></rect> </g></svg>
                        Eventos
                    </Link>
                    <Link href='account' className="w-32 aspect-video bg-blue-600 text-white font-bold content-center text-center rounded-md p-2">
                        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="m 8 1 c -1.65625 0 -3 1.34375 -3 3 s 1.34375 3 3 3 s 3 -1.34375 3 -3 s -1.34375 -3 -3 -3 z m -1.5 7 c -2.492188 0 -4.5 2.007812 -4.5 4.5 v 0.5 c 0 1.109375 0.890625 2 2 2 h 8 c 1.109375 0 2 -0.890625 2 -2 v -0.5 c 0 -2.492188 -2.007812 -4.5 -4.5 -4.5 z m 0 0" fill="#f8f8f8"></path> </g></svg>
                        Perfil
                    </Link>
                </div>
            case 'businessman':
                const { data: user, error: userError } = await supabase.auth.getUser();
                const { data, error } = await supabase.from('profiles').select('* , businesses(*), properties(*)').eq('id', user.user.id).single()
                console.log(data)
                if (error) {
                    console.error(error);
                    return <div>Error al obtener los datos del usuario</div>;
                }
                return <div>
                    <h1>Bienvenido {data.full_name}</h1>
                    <h2>Estos son tus negocios</h2>
                    <ul>
                        {data?.businesses.map((business) => <li key={business.id}>{business.name}</li>)}
                    </ul>
                    <h2>Estas son tus propiedades</h2>
                    <ul>
                        {data?.properties.map((property) => <li key={property.id}>{property.location_name}</li>)}
                    </ul>
                </div>

        }
    }
}