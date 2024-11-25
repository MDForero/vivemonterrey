'use client'
import { usePathname } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import CardProducts from "@/components/CardProducts"

export default function Page() {
    const path = usePathname()
    const businessName = decodeURI(path.split('/')[2]).split('-').join(' ')
    const [products, setProducts] = useState()
    const supabase = createClient()

    const getPoducts = async () => {
        const { data, error } = await supabase.from('businesses').select('* ,  products(*)').eq('name', businessName).single()        
        return { data, error }
    }
    
    useEffect(() => {
        getPoducts().then(({ data, error }) => {
            if (error) {
                console.error(error)
                return
            }
            setProducts(data.products)
        })
    }, [])

    return <section className="flex">{
        products?.map(product => <CardProducts key={product.id} product={product} />)
    }</section>
}