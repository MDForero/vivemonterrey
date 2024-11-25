import { createClient } from "@/utils/supabase/server";
import {  insertProperty } from "./action";


export default async function Page() {
    
    const supabase = createClient()
    const { data: {user} } = await supabase.auth.getUser()

    return <form action="#" method="POST">
        <label htmlFor="name">Ubicación</label>
        <input type='text' name='location_name' id='location_name' placeholder="location_name" className="border m-2 p-2" required/>
        <label htmlFor="price" >Precio</label>
        <input type='number' name='price' id='price' placeholder="price" className="border m-2 p-2" accept="image/jpeg, image/png, image/webp, image/jpg" required/>
        <label htmlFor="property_type">Tipo de propiedad</label>
        <input type='text' name='property_type' id='property_type' placeholder="property_type" className="border m-2 p-2" accept='image/svg+xml' required/>
        <input type="text" name="profile_id" id="profile_id" value={user?.id} hidden/>
        <button formAction={insertProperty} type="submit" className="capitalize border bg-green-600 p-2 text-white font-semibold" >insertar categoria</button>
    </form>
}

