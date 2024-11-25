'use client'
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import SideBarDashboard from "@/components/layouts/dashboard/SideBarDashboard"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Toaster } from "sonner"


const userCurrent = createContext(null)

export default function DashboardLayout({ children }) {

    const supabase = createClient()
    const path = usePathname()
    const router = useRouter()

    const [user, setUser] = useState()
    const [data, setData] = useState()


    const getUser = async () => {

        try {

            const { data, error } = await supabase.auth.getUser()
            const { data: profile, errorProfile } = await supabase.from('profiles').select('*, properties(count), businesses(count)').eq('id', data?.user.id).single()
            setUser({ ...profile, email: data.user.email })

        } catch (error) {

            console.error(error)
            router.push('/login')

        }
    }

    useEffect(() => {
        getUser()
    }, [path])

    useEffect(() => {
        const getData = async (id) => {
            const { data, error } = await supabase.from('profiles').select('properties(*), businesses(*)').eq('id', id).single()
            if (error) {
                console.error(error)
                return
            }
            setData(data)
        }
        if (user) getData(user?.id)
    }, [user])


    return (
        <div className="container relative">

            <userCurrent.Provider value={{ user, data }}>
                <SidebarProvider defaultOpen={false}>

                    <SideBarDashboard />

                    <SidebarInset>
                        <SidebarTrigger />
                        <div className="flex flex-col  shrink-0  gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-full" >
                            <Breadcrumb>
                                <BreadcrumbList>
                                    {path.slice(1, -1).split('/').slice(0, -1).map((item, index) => <>
                                        <BreadcrumbItem key={index}>
                                            <BreadcrumbLink href={`/${path.slice(1, -1).split('/').slice(0, index + 1).join('/')}`} className='capitalize' >
                                                {item}
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                    </>
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
                                <Toaster/>
                            </div>
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            </userCurrent.Provider>
        </div>
    )
}

export const useUserCurrent = () => {
    return useContext(userCurrent)

}

