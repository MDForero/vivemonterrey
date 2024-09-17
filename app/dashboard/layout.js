'use client'
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function DashboardLayout ({children}) {
    const supabase = createClient()
    const router = useRouter()
    const [user, setUser] = useState()
    const getUser = async () => {
        const { data: user, error } = await supabase.auth.getUser()
        setUser(user)
        console.log(user)

        if (user.user === null) {
            router.push('/login')   
        }
    }
    useEffect(() => {
        getUser()
    }, [user, supabase])
    return (
        <>
            {children}
        </>
    )
}