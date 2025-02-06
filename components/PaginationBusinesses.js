'use client'
import CardBusinesses from "@/components/CardBusinesses"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { createClient } from "@/utils/supabase/client"
import { use, useEffect, useState } from 'react'

export default function PaginationBusinesses() {
    const supabase = createClient()
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [count, setCount] = useState(0)


    useEffect(() => {
        const fetchBusinesses = async () => {
            const { data, error } = await supabase.from('businesses').select('*, categories(name)').range(0 + ((page - 1) * 9), 8 + ((page - 1 )* 9))
            const { count, errorCount } = await supabase.from('businesses').select('*, categories(name)', { count: 'exact', head: true })
            if (error) {
                console.log(error)
            }
            setData(data)
            setCount(count)
        }
        fetchBusinesses()
    }, [page])
    const totalPages = Math.ceil(count / 8)
    const pages = Array.from({ length: totalPages }, (_, i ) => i + 1)

    return (
        <div className="space-y-8 " id="businesses">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-8 gap-8 px-2 ">
                {data.map((business) => <CardBusinesses key={business.id} data={business} />)}

            </section>
            <Pagination className='bg-white'>
                <PaginationContent className=" bg-white flex justify-center space-x-4 font-bold ">   
                    <PaginationItem >
                        <PaginationPrevious  onClick={() => setPage(page=== 1 ? page : page - 1)} disabled={!page===1} className='w-24 font-bold font-englebert'/>
                    </PaginationItem>
                    {pages.map((paginate, index) => <PaginationItem key={index}>
                        <PaginationLink href='#businesses' onClick={() => setPage(paginate)} isActive={paginate === page } className='font-bold'>{paginate}</PaginationLink>
                    </PaginationItem>)}
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext onClick={() => setPage(page === totalPages ? page : page + 1)} className='w-24 font-bold font-englebert' />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
