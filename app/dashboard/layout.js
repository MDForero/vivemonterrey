'use client'
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import SideBarDashboard from "@/components/layouts/dashboard/SideBarDashboard"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Toaster } from "sonner"
import ImageSupabase from "@/components/ImageSupabase"
import Image from "next/image"


const userCurrent = createContext(null)

export default function DashboardLayout({ children }) {

    
    const path = usePathname()
   

    // const getUser = async () => {

    //     try {

    //         const { data, error } = await supabase.auth.getUser()
    //         const { data: profile, errorProfile } = await supabase.from('profiles').select('*, properties(count), businesses(count)').eq('id', data?.user.id).single()
    //         setUser({ ...profile, email: data.user.email })

    //     } catch (error) {

    //         console.error(error)
    //         router.push('/login')

    //     }
    // }

    // useEffect(() => {
    //     getUser()
    // }, [path])

    // useEffect(() => {
    //     const getData = async () => {
    //         const id = supabase.auth.user().id
    //         const { data, error } = await supabase.from('profiles').select('properties(*), businesses(*)').eq('id', id).single()
    //         if (error) {
    //             console.error(error)
    //             return
    //         }
    //         setData(data)
    //     }
    //     if (user) getData()
    // }, [user])


    return (<div>
    <nav>
        <Image src='/logo.svg' width={0} height={0} className='w-36' alt='Logo vive monterrey' />
    </nav>
        <div className="container relative">
            <div className="  shrink-0  gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-full" >
                <Breadcrumb>
                    <BreadcrumbList>
                        {path.slice(1, -1).split('/').slice(0, -1).map((item, index) =>
                            <div key={index} className="grid grid-flow-col items-center gap-2">
                                <BreadcrumbItem key={index}>
                                    <BreadcrumbLink href={`/${path.slice(1, -1).split('/').slice(0, index + 1).join('/')}`} className='capitalize' >
                                        {decodeURI(item)}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                            </div>
                        )}
                        <BreadcrumbItem>
                            <BreadcrumbPage className='capitalize'>
                                {decodeURI(path.slice(1, -1).split('/').slice(-1))}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="w-full ">
                    {children}
                    <Toaster />
                </div>
            </div>
        </div>
    </div>
    )
}

export const useUserCurrent = () => {
    return useContext(userCurrent)

}

