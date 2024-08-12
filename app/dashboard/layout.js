'use client'
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardLayout ({children}) {
    const supabase = createClient()
    const router = useRouter()
    const getUser = async () => {
        const { data: user, error } = await supabase.auth.getUser()
        if (!user) {
            router.push('/login')   
        }
    }
    useEffect(() => {
        getUser()
    }, [])
    return (
        <>
            {children}
        </>
    )
}