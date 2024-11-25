'use client'
import { Button } from "@/components/ui/button"
import { useUserCurrent } from "../layout"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Settings2, Trash2 } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import ImageSupabase from "@/components/ImageSupabase"
import CardBusinesses from "@/components/layouts/dashboard/CardBusinesses"

export default function Page() {
    const { data: dataBusiness } = useUserCurrent()
    const { businesses } = dataBusiness ?? { businesses: [] }

    console.log(businesses)

    return (
        <div className="max-w-7xl mx-auto">
            <h1>Page negocios</h1>

            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-full place-content-center content-center place-items-center">
                {businesses.map((business) => <CardBusinesses business={business}/>)}
            </section>
        </div>
    )
}

