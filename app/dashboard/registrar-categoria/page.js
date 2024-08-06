import { createClient } from "@/utils/supabase/server";
import { insertCategory } from "./action";


export default async function Page() {
    return <form action="#" method="POST">
        <input type='text' name='name' id='name' placeholder="name" className="border m-2 p-2" required/>
        <label htmlFor="image_url" >Imagen</label>
        <input type='file' name='image_url' id='image_url' placeholder="image_url" className="border m-2 p-2" accept="image/jpeg, image/png, image/webp, image/jpg" required/>
        <label htmlFor="icon_category">Icon</label>
        <input type='file' name='icon_category' id='icon_category' placeholder="icon_category" className="border m-2 p-2" accept='image/svg+xml' required/>
        <button formAction={insertCategory} type="submit" className="capitalize border bg-green-600 p-2 text-white font-semibold" >insertar categoria</button>
    </form>
}

