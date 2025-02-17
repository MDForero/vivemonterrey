import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { createClient } from "@/utils/supabase/server"
import ActionDelete from "@/components/ActionDelete"
import ActionUpdate from "@/components/ActionUpdate"
import { PlusIcon } from "lucide-react"
import Link from "next/link"

export default async function page() {
    const supabase = createClient()
    const dateNow = new Date()
    const date = dateNow.toISOString()
    const nextMonthDate = new Date(dateNow.setMonth(dateNow.getMonth() + 1)).toISOString()
    const { data: events, error } = await supabase.from('events').select('*').order('event_date', { ascending: true })
    console.log(events)
    return <>
        <Link href={'registrar'} className="bg-green-600 p-2 inline-flex justify-center items-center rounded-md text-white group  w-fit h-fit " ><PlusIcon size={45} /> <strong className="">Agregar Nuevo evento</strong></Link>
        {events.length !== 0 &&

            <Table className="w-full max-w-4xl mx-auto mt-4 border-collapse border"> 
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Lugar</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {events && events.map((event, index) => <TableRow key={index}>
                        <TableCell>{event.name}</TableCell>
                        <TableCell>{new Date(event.event_date).toLocaleDateString()}</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell className="flex items-center space-x-2">
                            <ActionDelete data={{ id: event.id, name: event.name }} />
                            <ActionUpdate data={event} />
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        }
    </>
}