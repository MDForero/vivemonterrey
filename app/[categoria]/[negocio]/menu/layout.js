'use client'
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CartProvider } from "./CartContext";


export default function MenuLayout({ children }) {
    return <div className="relative">
        <CartProvider>
            <SidebarProvider style={{ '--sidebar-width': '20rem' }}>

                        {children}
            </SidebarProvider>
        </CartProvider>
    </div>

}




