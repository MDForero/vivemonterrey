import CardBusinesses from "@/components/layouts/dashboard/CardBusinesses"
import PaginationBusinessesAdmin from "@/components/PaginationBusinessesAdmin"
import { HousePlusIcon } from "lucide-react"
import Link from "next/link"

export default function Page() {
    return (
        <div className="max-w-7xl mx-auto">
            <Link href='/dashboard/negocios/registrar-negocio' className="bg-viveRed block w-fit mx-auto p-2 rounded-md"><HousePlusIcon size={54} color="white"/></Link>
            <PaginationBusinessesAdmin />
        </div>
    )
}

