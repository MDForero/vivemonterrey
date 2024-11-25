'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"

const CardButtons = () => {

    const [data, setData] = useState(null)
    const supabase = createClient()

    const getData = async () => {
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
        if (errorProfile) {
            console.error(errorProfile)
            return
        }
        setData(data)
    }


    useEffect(() => {
        getData()
    }, [data,])
    
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h1>{data?.full_name}</h1>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <section ></section>
                <div className="flex h-5 items-center space-x-4 text-sm">
                    <p>Propiedades: {data?.properties[0].count}</p>
                    <Separator orientation='vertical' />
                    <p>Negocios: {data?.businesses[0].count}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default CardButtons