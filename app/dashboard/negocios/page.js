import CardBusinesses from "@/components/layouts/dashboard/CardBusinesses"
import PaginationBusinessesAdmin from "@/components/PaginationBusinessesAdmin"

export default function Page() {
    return (
        <div className="max-w-7xl mx-auto">
            <h1>Page negocios</h1>
            <PaginationBusinessesAdmin />
        </div>
    )
}

