'use client'
import CardBusinesses from "@/components/layouts/dashboard/CardBusinesses"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

export default function PaginationBusinessesAdmin() {
    const supabase = createClient()
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [count, setCount] = useState(0)


    useEffect(() => {
        const fetchBusinesses = async () => {
            const { data, error } = await supabase.from('businesses').select('*, categories(name)').range(0 + ((page - 1) * 9), 8 + ((page - 1) * 9))
            const { count, errorCount } = await supabase.from('businesses').select('*', { count: 'exact', head: true })
            if (error) {
                console.log(error)
            }
            setData(data)
            setCount(count)
        }
        fetchBusinesses()
    }, [page])

    const totalPages = Math.ceil(count / 9)
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <div className="space-y-8 " id="businesses">
            <Table  className='max-w-5xl w-full'>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead className='max-w-xl '>Nombre</TableHead>
                        <TableHead className='max-w-xl '>Categorías</TableHead>
                        <TableHead>Acciones</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((business) => <CardBusinesses key={business.id} business={business} />)}
                </TableBody>

            </Table>
            <Pagination className='bg-white'>
                <PaginationContent className=" bg-white flex justify-center space-x-4 font-bold ">
                    <PaginationItem >
                        <PaginationPrevious onClick={() => setPage(page === 1 ? page : page - 1)} disabled={!page === 1} className='w-24 font-bold font-englebert' />
                    </PaginationItem>
                    {pages.map((paginate, index) => <PaginationItem key={index}>
                        <PaginationLink href='#businesses' onClick={() => setPage(paginate)} isActive={paginate === page} className='font-bold'>{paginate}</PaginationLink>
                    </PaginationItem>)}
                    
                    <PaginationItem>
                        <PaginationNext onClick={() => setPage(page === totalPages ? page : page + 1)} className='w-24 font-bold font-englebert' />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
