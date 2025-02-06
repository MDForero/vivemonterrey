'use client'
import { use, useEffect } from "react";
import { CartProvider } from "../../../../components/CartContext";


export default function MenuLayout({ children, params }) {
    
    return <>
        <CartProvider>
            {children}
        </CartProvider>
    </>
}




