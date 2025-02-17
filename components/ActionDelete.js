'use client'
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client"  
import { toast } from "sonner";
import { Trash } from "lucide-react";

export default  function ActionDelete({ data }) {
    const supabase = createClient() 

    const [typeName, setTypeName] = useState('')

    const handleDelete = async (id) => {
        if (typeName === data.name) {
            const { data, error } = await supabase.from('events').delete().eq('id', id)
            if (error) {
                console.log(error)
                return
            }else{
                toast.success('Evento eliminado correctamente')
                window.location.reload()
            }
        }
    }

    return <Dialog>
        <DialogTrigger className="bg-red-600 rounded-md p-2 text-white"><Trash/></DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Eliminar evento
                </DialogTitle>
            </DialogHeader>
            <DialogDescription>
                ¿Estás seguro que deseas eliminar el evento <strong>{data.name}</strong>?
                <input type="text" value={typeName} onChange={(e) => setTypeName(e.target.value)} placeholder="Escribe el nombre del evento para confirmar" />
            </DialogDescription>

            <DialogFooter>
                <Button onClick={() => handleDelete(data.id)}>Eliminar</Button>
                <Button >Cancelar</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}