'use client'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { createClient } from "@/utils/supabase/client"
import { use, useEffect, useState } from 'react'
import CardBusinesses from "./que-hacer/CardBusinesses"

export default function PaginationBusinesses() {
    const supabase = createClient()
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [count, setCount] = useState(0)


    useEffect(() => {
        const fetchBusinesses = async () => {
            const { data, error } = await supabase.from('businesses').select('*, categories(name)').range(0 + ((page - 1) * 9), 8 + ((page - 1) * 9))
            const { count, errorCount } = await supabase.from('businesses').select('*, categories(name)', { count: 'exact', head: true })
            if (error) {
                console.log(error)
            }
            setData(data)
            setCount(count)
            console.log(data)
        }
        fetchBusinesses()
    }, [page])
    const totalPages = Math.ceil(count / 9)
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    const filters = [
        {
            label: "Categorias",
            options: [
                { value: "default", text: "Categorias" },
                { value: "restaurantes", text: "Restaurantes" },
                { value: "hoteles", text: "Hoteles" },
                { value: "tiendas", text: "Tiendas" },
                { value: "entretenimiento", text: "Entretenimiento" },
            ],
        },
        {
            label: "Servicios",
            options: [
                { value: "default", text: "Servicios" },
                { value: "wifi", text: "WiFi" },
                { value: "estacionamiento", text: "Estacionamiento" },
                { value: "pet-friendly", text: "Pet Friendly" },
                { value: "entrega", text: "Entrega a Domicilio" },
            ],
        },
        {
            label: "Subcategorias",
            options: [
                { value: "default", text: "Subcategorias" },
                { value: "comida-rapida", text: "Comida Rápida" },
                { value: "gourmet", text: "Gourmet" },
                { value: "ropa", text: "Ropa" },
                { value: "electronica", text: "Electrónica" },
            ],
        },
        {
            label: "Planes",
            options: [
                { value: "default", text: "Planes" },
                { value: "premium", text: "Premium" },
                { value: "basic", text: "Basic" },
                { value: "gold", text: "Gold" },
            ],
        },
    ];


    return (
        <div className="space-y-8" id="businesses">
                <div className="flex flex-wrap">
                    {filters.map((filter, index) => (
                        <select key={index} className='w-full max-w-52 bg-white border border-gray-300 rounded-md p-2 m-2'>
                            {filter.options.map((option, idx) => (
                                <option
                                    key={idx}
                                    defaultValue={option.value}
                                >
                                    {option.text}
                                </option>
                            ))}
                        </select>
                    ))}
                </div>
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-8 gap-8 px-2 place-items-start">
                    {data.map((business) => <CardBusinesses key={business.id} data={business} />)}

                </section>
                <Pagination className=''>
                    <PaginationContent className=" flex justify-center font-bold py-3 px-2 pagination justify-content-center pt-15 flex-wrap ">
                        <PaginationItem >
                            <PaginationPrevious onClick={() => setPage(page === 1 ? page : page - 1)} disabled={!page === 1} className=' font-bold font-englebert border bg-white' />
                        </PaginationItem>
                        {pages.map((paginate, index) => <PaginationItem key={index} className={`page-item ${page === paginate ? 'active' : ''}`}>
                            <PaginationLink  onClick={() => setPage(paginate)}  className='font-bold page-link'>{paginate}</PaginationLink>
                        </PaginationItem>)}
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext onClick={() => setPage(page === totalPages ? page : page + 1)} className=' font-bold font-englebert border bg-white ' />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
            )
}
