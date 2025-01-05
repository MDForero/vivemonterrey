
import { createClient } from "@/utils/supabase/server";
import { registerBusiness } from "./action";
import ClosedOrTwentyFour from "@/components/ClosedOrTwentyFour";
import InputAmenities from "@/components/inputs/InputAmenities";
import InputImg from "@/components/inputs/InputImg";


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
            placeholder: "Restaurante la esquina",
            required: true
        },
        {
            type: 'text',
            name: "address",
            label: "Dirección",
            placeholder: "Calle 123 12a 81",
            required: true
        },
        {
            type: 'text',
            name: "socials_account",
            label: "Cuenta de redes sociales",
            placeholder: "https://www.instagram.com/laesquina, https://www.facebook.com/laesquina, https://www.twitter.com/laesquina",
            multiple: true,
            required: true
        },
        {
            type: 'text',
            name: "phone",
            label: "Teléfono",
            placeholder: "310 XXXX XXX",
            required: true
        },
        {
            type: 'text',
            name: "website",
            placeholder: "unsitioincreible.com",
            label: "Sitio web",
            required: true
        },
        {
            type: 'text',
            name: "iframe_maps",
            placeholder: "",
            label: "Url de Google Maps",
            required: true
        },
        

    ]
    const textAreas = [
        {
            type: 'text',
            name: "description",
            label: "Descripción",
            placeholder: "Describe tu negocio",
            required: true
        },
    ]
    const hours = [
        {
            type: 'time',
            name: "lunes",
            label: "Lunes",
            placeholder: "Lunes",
            required: true
        },
        {
            type: 'time',
            name: "martes",
            label: "Martes",
            placeholder: "Martes",
            required: true
        },
        {
            type: 'time',
            name: "miercoles",
            label: "Miercoles",
            placeholder: "Miercoles",
            required: true
        },
        {
            type: 'time',
            name: "jueves",
            label: "Jueves",
            placeholder: "Jueves",
            required: true
        },
        {
            type: 'time',
            name: "viernes",
            label: "Viernes",
            placeholder: "Viernes",
            required: true
        },
        {
            type: 'time',
            name: "sabado",
            label: "Sabado",
            placeholder: "Sabado",
            required: true
        },
        {
            type: 'time',
            name: "domingo",
            label: "Domingo",
            placeholder: "Domingo",
            required: true
        },
    ]
    const images = [
        {
            name: "logo",
            label: "Logo",
            className: 'w-44 h-44 bg-slate-600',
        },
        {
            name: "banner_url",
            label: "Imagen principal",
            className: ' h-[400px] bg-slate-600 max-w-4xl w-full',
        },

    ]


    const categories = await supabase.from('categories').select('*')

    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full  p-6  max-w-4xl mx-auto h-fit">
            <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Crea un nuevo establecimiento</h3>
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
                            multiple={input?.multiple ?? false}

                        />
                    </div>
                    )}
                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="gallery"
                        >
                            Galería
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            name="gallery"
                            id="gallery"
                            multiple
                            type="file"
                            accept="image/*"
                        />
                    </div>
                </div>
                {textAreas.map(textarea => <div key={textarea.name} className="space-y-2">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="hours"
                    >
                        {textarea.label}
                    </label>
                    <textarea
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id={textarea.name}
                        placeholder={textarea?.placeholder ?? 'aun no hay un placeholder se debe configurar'}
                        name={textarea.name}
                    ></textarea>
                </div>)}
                <fieldset htmlFor="category" className='border'>
                    <legend className="font-bold">Categoría</legend>
                    <section className="px-3">
                        {categories?.data.map((category) => <div key={category.name}>
                            <input type="checkbox" name={category.name} value={category.id} id={category.name} />
                            <label htmlFor="restaurante" className="capitalize ml-2">{category.name}</label>
                        </div>)}

                    </section>
                </fieldset>
                <fieldset className="border p-2 ">
                    <legend className="text-md font-bold">Imágenes Corporativas</legend>
                    {images.map(image => <InputImg key={image.name} className={image.className} name={image.name} label={image.label} />)}
                </fieldset>
                    <InputAmenities />

                <fieldset className="flex flex-wrap justify justify-between gap-3 border p-2 ">
                    <legend className="text-md font-semibold">Horario</legend>
                    {hours.map((hour, index) => <fieldset htmlFor={hour.name} key={index} className='w-fit border leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 '>
                        <legend className="text-md font-semibold">{hour.label}</legend>
                        <div className="text-sm font-medium">

                            <div className='grid gap-2 p-2 '>
                                <div className="flex gap-4">
                                    <div>
                                        <label>Apertura</label>
                                        <input
                                            id={hour.name + '-open'}
                                            name={hour.name + '-open'}
                                            className='flex h-10 w-full rounded-md border border-input bg-background px-2 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                                            type={hour.type}
                                            placeholder={hour?.placeholder ?? 'aun no hay un placeholder se debe configurar'}
                                            
                                        />
                                    </div>
                                    <div>
                                        <label>Cierre</label>
                                        <input
                                            id={hour.name + '-close'}
                                            name={hour.name + '-close'}
                                            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                                            type={hour.type}
                                            placeholder={hour?.placeholder ?? 'aun no hay un placeholder se debe configurar'}
                                        />
                                    </div>
                                </div>
                                <ClosedOrTwentyFour hour={hour} schedule={''} />
                            </div>
                        </div>
                    </fieldset>)}
                </fieldset>
                <div>
                    <input type="text" hidden name="profile_id" value={user?.id} readOnly />
                    <button className="text-red-500 font-semibold" formAction={registerBusiness} type="submit">
                        Registrar negocio
                    </button>
                </div>
            </form >
        </div >
    )
}