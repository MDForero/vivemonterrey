
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
            name: "website",
            label: "Sitio web",
            required: true
        },
    ]
    const textAreas = [
        {
            type: 'text',
            name: "description",
            label: "Descripción",
            required: true
        },
        {
            type: 'text',
            name: "schedule",
            label: "Horario",
            required: true
        },
    ]




    const categories = await supabase.from('categories').select('*')

    return (<>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-4xl p-6   ">
            <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Create a New Business</h3>
                <p className="text-sm text-muted-foreground">Fill out the form to add a new business to our directory.</p>
            </div>
            <form action="#" method="POST" className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    {inputs.map((input, index) => <div key={index}>
                        <label htmlFor="fullName" className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 '>{input.label} </label>
                        <br />
                        <input
                            id={input.name}
                            name={input.name}
                            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                            type={input.type}
                            placeholder={input?.placeholder ?? 'aun no hay un placeholder se debe configurar'}

                        />
                    </div>
                    )}
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                for="gallery"
                            >
                                Galería
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="gallery"
                                multiple
                                type="file"
                            />
                        </div>
                </div>
                {textAreas.map(textarea => <div key={textarea.name} className="space-y-2">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="hours"
                    >
                        {textarea.label}
                    </label>
                    <textarea
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id={textarea.name}
                        placeholder={textarea?.placeholder ?? 'aun no hay un placeholder se debe configurar'}
                    ></textarea>
                </div>)}
                <div>
                    <fieldset htmlFor="category" className='border'>
                        <legend className="font-bold">Categoría</legend>
                        <section className="px-3">
                            {categories?.data.map((category) => <div key={category.name}>
                                <input type="checkbox" name={category.name} value={category.id} id={category.name} />
                                <label htmlFor="restaurante" className="capitalize">{category.name}</label>
                            </div>)}

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

    </>
    )
}