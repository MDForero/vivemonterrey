import { createClient } from "@/utils/supabase/server"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import CellProduct from "@/components/CellProduct"


export default async function page({ params }) {
    const supabase = createClient()

    const { data: business, error: businessError } = await supabase.from('businesses').select('*').eq('enlace', params.negocio).single()
    const { data, error } = await supabase.from('products').select('*').eq('business_id', business.id)
    if (error || businessError) {
        console.log(error, businessError,)
        return
    }

    return <div>
        <div className="space-y-8" id="businesses" >
            {business?.categories_restaurant && <Tabs defaultValue={business?.categories_restaurant[0]}>
                <ScrollArea className='max-w-5xl w-full py-3 mx-auto'>
                    <TabsList className=' gap-2 bg-white z-0'>
                        {business?.categories_restaurant.map(category => <TabsTrigger className='data-[state=active]:text-white data-[state=active]:bg-[#b91c1c] border bg-blue-100' key={category} value={category}>{category}</TabsTrigger>)}
                    </TabsList>
                    <ScrollBar orientation='horizontal' />
                </ScrollArea>
                {business?.categories_restaurant.map(category => <TabsContent key={category} value={category}>
                    <ScrollArea className='h-[600px] max-w-5xl w-full mx-auto'>
                        <Table className='max-w-5xl w-full mx-auto border'>
                            <TableHeader className='sticky top-0 z-10 bg-white'>
                                <TableRow>
                                    <TableHead>Imagen</TableHead>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Precio</TableHead>
                                    <TableHead>Acciones</TableHead>

                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data?.filter(product => product.category === category).map((product, index) => <CellProduct key={index} product={product} business={business} />)}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </TabsContent>)}
            </Tabs>}

        </div >
    </div>
}