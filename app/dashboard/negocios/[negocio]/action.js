
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

const supabase = createClient()

export async function actionContact(formData) {
    const data = {}
    for (let pair of formData.entries()) {
        if (pair[1] !== '' && pair[0] !== 'id') {

            data[pair[0]] = pair[1]
        }
    }
    console.log(data, formData.get('id'))
    try {
        await supabase.from('businesses').update(data).eq('id', formData.get('id'))
        toast('Datos actualizados', {
            description: 'Los datos de contacto han sido actualizados con éxito',
            action: {
                label: 'Ir a negocios',
                onClick: () => console.log('Muy bien'),
            }
        })

    } catch (error) {
        console.error(error)
        return
    }
}

export async function actionUpdateData(formData) {
    const data = {}
    for (let pair of formData.entries()) {
        if (pair[1] !== '' && pair[0] !== 'id') {
            data[pair[0]] = pair[1]
        }
    }
    console.log(data, formData.get('id'))
    try {
        await supabase.from('businesses').update(data).eq('id', formData.get('id'))
        toast('Datos actualizados', {
            description: 'Los datos de contacto han sido actualizados con éxito',
            action: {
                label: 'Ir a negocios',
                onClick: () => console.log('Muy bien'),
            }
        })

    } catch (error) {
        console.error(error)
        return
    }
}

export async function actionUpdateImage(formData) {
    const data = []
    formData.entries().forEach((pair) => {
        data.push([pair[0], pair[1]])
    })
    console.log(data)
    data.forEach(async (pair) => {
        const { data, error } = await supabase.storage.from('banners').update(pair[0], pair[1])
        if (error) {
            console.error(error)
            return
        }
        console.log(data)
    }
    )

}

export async function actionSocialsAccount(formData) {
    const data = []
    const supabase = createClient()
    formData.entries().forEach((pair) => {
        if (pair[0] !== "id" && pair[1] !== "") {
            data.push(pair[1])
        }
    })
    console.log(data)
    // try {
    //     await supabase.from('businesses').update({socials_account: data}).eq('id', )
    // }
}

export async function actionSchedule(formData) {
    const data = {
        lunes: {

        },
        martes: {

        },
        miercoles: {

        },
        jueves: {

        },
        viernes: {

        },
        sabado: {

        },
        domingo: {

        }
    }
    for (let pair of formData.entries()) {
        if (pair[1] !== '' && pair[0] !== 'id') {
            data[pair[0].split('-')[0]][pair[0].split('-')[1]] = pair[1]
        }
    }

    try {
        await supabase.from('businesses').update({ schedule: data }).eq('id', formData.get('id'))
        return toast('Datos actualizados', {
            description: 'Los datos de contacto han sido actualizados con éxito',
            action: {
                label: 'Ir a negocios',
                onClick: () => console.log('Muy bien'),
            }
        })

    } catch (error) {
        console.error(error)
        return
    }
}

export async function actionAmenities(formData) {
    const categories = []
    const amenities = []
    formData.entries().forEach((pair) => {
        if (pair[1] === "on" && pair[0] !== "id") {
            categories.push(pair[0])
        } else if (pair[1] !== '' && pair[0] !== "id") {
            pair[1].split(',').forEach((amenity) => {
                if (amenity !== '') {
                    amenities.push(amenity)
                }
            })

        }

    })
    try {
        categories.forEach(async (category) => {
            await supabase.from('businesses_categories').insert({ business_id: formData.get('id'), category_id: category })
        });
        await supabase.from('businesses').update({ amenities: amenities }).eq('id', formData.get('id'))
        return toast('Datos actualizados', {
            description: 'Los datos de contacto han sido actualizados con éxito',
            action: {
                label: 'Ir a negocios',
                onClick: () => console.log('Muy bien'),
            }
        })

    } catch (error) {
        console.error(error)
        return
    }
}