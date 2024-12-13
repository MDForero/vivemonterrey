'use client'
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CartProvider } from "./CartContext";


export default function MenuLayout({ children }) {
    return <CartProvider>
            {children}
        </CartProvider>
}




