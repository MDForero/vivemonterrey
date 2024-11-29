'use client'
import { deleteProduct } from "@/app/dashboard/negocios/[negocio]/menu/action"
import { Button } from "@/components/ui/button"
import {
    Dialog, DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash } from "lucide-react"
import { toast } from "sonner"
export default function DeleteProduct({ name, id }) {
    
    const handleDelete = async () => {
        const nameProduct = document.getElementById('name-product').value
        if (nameProduct !== name) {
            toast('Error', {
                description: 'El nombre no coincide',
                variant: 'error'
            })
            return
        }
        await deleteProduct(id)
    }
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="destructive"><Trash/></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Share link</DialogTitle>
                        <DialogDescription>
                            Para eliminar el siguiente producto, escribe el nombre <strong>{name}</strong> y presiona el botón de eliminar.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                                Link
                            </Label>
                            <Input
                                id="name-product"
                            />
                        </div>
                        <Button  type='button' size="sm" className="px-3" onClick={handleDelete} >
                            <span className="sr-only">Copy</span>
                            <Trash />
                        </Button>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}