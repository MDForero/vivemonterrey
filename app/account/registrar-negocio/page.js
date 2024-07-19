
import { createClient } from "@/utils/supabase/server";
import { registerBusiness } from "./action";


export default async function Page() {
    const supabase = createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    const inputs = [
        {
            type: 'text',
            name: "name",
            label: "Nombre del negocio",
            required: true
        },
        {
            type: 'text',
            name: "address",
            label: "Dirección",
            required: true
        },
        {
            type: 'text',
            name: "socials_account",
            label: "Cuenta de redes sociales",
            required: true
        },
        {
            type: 'text',
            name: "phone",
            label: "Teléfono",
            required: true
        },
        {
            type: 'text',
            name: "description",
            label: "Descripción",
            required: true
        },
        {
            type: 'text',
            name: "website",
            label: "Sitio web",
            required: true
        },
    ]

    return (
        <div className="form-widget container space-y-2 flex flex-col  items-center w-96 gap-2 border-4 py-2 m-2 rounded-lg shadow-lg">
            <form action="#" method="POST" className="space-y-6">
                {inputs.map((input, index) => <div key={index}>
                    <label htmlFor="fullName" className='font-bold '>{input.label} </label>
                    <br />
                    <input
                        id={input.name}
                        name={input.name}
                        className='font-semibold border p-1.5'
                        type={input.type}

                    />
                </div>
                )}
                <div>
                    <fieldset htmlFor="category" className='border'>
                        <legend className="font-bold">Categoría</legend>
                        <section className="px-3">
                            <div>
                                <input type="checkbox" name="restaurante" value="restaurante" id="restaurante" />
                                <label htmlFor="restaurante">Restaurante</label>
                            </div>
                            <div>
                                <input type="checkbox" name="actividad" value="actividad" id="actividad" />
                                <label htmlFor="actividad">Actividad</label>
                            </div>
                            <div>
                                <input type="checkbox" name="alojamiento" value="alojamiento" id="alojamiento" />
                                <label htmlFor="alojamiento">Alojamiento</label>
                            </div>
                            <div>
                                <input type="checkbox" name="tienda" value="tienda" id="tienda" />
                                <label htmlFor="tienda">Tienda</label>
                            </div>
                            <div>
                                <input type="checkbox" name="bar" value="bar" id="bar" />
                                <label htmlFor="bar">Bar o Discoteca</label>
                            </div>
                        </section>
                    </fieldset>
                    <label>Agrega imagen principal</label>
                    <input type='file' id="banner" name="banner" />
                </div>
                <div>
                    <input type="text" hidden name="profile_id" value={user?.id} />
                    <button className="text-red-500 font-semibold" formAction={registerBusiness} type="submit">
                        Registrar negocio
                    </button>
                </div>
            </form >
        </div >
    )
}