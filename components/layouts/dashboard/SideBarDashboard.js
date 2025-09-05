'use client'
import { createClient } from "@/utils/supabase/client"
import { 
  getCurrentUserClient, 
  hasPermission, 
  PERMISSIONS,
  ROLES 
} from '@/utils/auth/permissions-client'
import {
  AudioWaveform,
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  ChevronRight,
  ChevronsUpDown,
  Command,
  CreditCard,
  Folder,
  Forward,
  Frame,
  GalleryVerticalEnd,
  LogOut,
  Map,
  MoreHorizontal,
  PieChart,
  Settings2,
  Sparkles,
  SquareTerminal,
  Trash2,
  Users,
  Shield,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react"
import { useUserCurrent } from "@/app/dashboard/layout"
import Link from "next/link"



const SideBarDashboard = () => {
  const { user, data: dataBusiness } = useUserCurrent()
  const { businesses, properties } = dataBusiness ?? { businesses: [], properties: [] }
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    const fetchUserRole = async () => {
      const { role } = await getCurrentUserClient()
      setUserRole(role)
    }
    if (user) {
      fetchUserRole()
    }
  }, [user])

  return (
    <Sidebar collapsible="offcanvas" variant='floating' className='sticky '>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user?.avatar}
                      alt={user?.username}
                    />
                    <AvatarFallback className="rounded-lg">{user?.full_name.split(' ').map(item => item.slice(0, 1)).slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.full_name}
                    </span>
                    <span className="truncate text-xs">
                      {user?.email}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={user?.avatar}
                        alt={user?.username}
                      />
                      <AvatarFallback className="rounded-lg">
                        CN
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user?.username}
                      </span>
                      <span className="truncate text-xs">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Sparkles />
                    Upgrade to Pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={async () => {
                    const supabase = createClient()
                    await supabase.auth.signOut()
                    window.location.href = '/login'
                  }}
                  className="cursor-pointer"
                >
                  <LogOut />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>

      </SidebarHeader>
      <SidebarContent >
        <SidebarGroup>
          <SidebarGroupLabel>Negocios {user?.businesses[0].count}</SidebarGroupLabel>
          <SidebarMenu>
            <Collapsible
              asChild
              defaultOpen={false}
              className="group/collapsible"
            ><SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={'negocios'}>
                    <BookOpen />
                    <span>Negocios</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {businesses?.map((item) => (
                      <SidebarMenuSubItem key={item?.name}>
                        <SidebarMenuSubButton asChild>
                          <Link href={'/dashboard/negocios/'+item?.name}>
                            <span>{item?.name}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}

                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
            <SidebarMenuItem>
              <SidebarMenuButton className="text-sidebar-foreground/70">
                <MoreHorizontal className="text-sidebar-foreground/70" />
                <Link href="/dashboard/negocios">
                  <span>Ver todos</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            {hasPermission(userRole, PERMISSIONS.BUSINESSES_CREATE) && (
              <SidebarMenuItem>
                <SidebarMenuButton className="text-green-600 border border-green-200">
                  <Link href="/dashboard/negocios/registrar-negocio" className="flex items-center gap-2">
                    <span>+ Nuevo Negocio</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Predios {user?.properties[0]?.count}</SidebarGroupLabel>
          <SidebarMenu>
            <Collapsible
              asChild
              defaultOpen={false}
              className="group/collapsible"
            ><SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={'negocios'}>
                    <BookOpen />
                    <span>Predios</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {properties?.map((item) => (
                      <SidebarMenuSubItem key={item?.location_name
                      }>
                        <SidebarMenuSubButton asChild>
                          <Link href={item?.location_name}>
                            <span>{item?.location_name
                            }</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}

                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
            <SidebarMenuItem>
              <SidebarMenuButton className="text-sidebar-foreground/70">
                <MoreHorizontal className="text-sidebar-foreground/70" />
                <Link href="/dashboard/propiedades">
                  <span>Ver todos</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            {hasPermission(userRole, PERMISSIONS.PROPERTIES_CREATE) && (
              <SidebarMenuItem>
                <SidebarMenuButton className="text-green-600 border border-green-200">
                  <Link href="/dashboard/registrar-propiedad" className="flex items-center gap-2">
                    <span>+ Nueva Propiedad</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarGroup>
        
        {/* Sección de Administración - Solo para Admins */}
        {userRole === ROLES.ADMIN && (
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Administración</SidebarGroupLabel>
            <SidebarMenu>
              {hasPermission(userRole, PERMISSIONS.USERS_READ) && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/usuarios" className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Gestión de Usuarios</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              
              {hasPermission(userRole, PERMISSIONS.BUSINESSES_READ) && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/analytics" className="flex items-center gap-2">
                      <PieChart className="h-4 w-4" />
                      <span>Analytics</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroup>
        )}

        {/* Sección de Herramientas */}
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Herramientas</SidebarGroupLabel>
          <SidebarMenu>
            {hasPermission(userRole, PERMISSIONS.BUSINESSES_READ) && (
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/qr" className="flex items-center gap-2">
                    <SquareTerminal className="h-4 w-4" />
                    <span>Códigos QR</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
            
            {hasPermission(userRole, PERMISSIONS.EVENTS_READ) && (
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/eventos" className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Eventos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar >
  )
}

export default SideBarDashboard