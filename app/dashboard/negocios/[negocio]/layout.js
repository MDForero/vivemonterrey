import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default async function layout({ children, params }) {
    const supabase = createClient()
    const { data: business, error } = await supabase.from('businesses').select('*, categories(name)').eq('name', decodeURI(params.negocio).split('-').join(' ')).single()

    return <div className="space-y-2">
        <NavigationMenu className='mx-auto'>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href={'/dashboard/negocios/' + params.negocio} legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Inicio
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Actualizar</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            <ListItem href='#' title='Imágenes'>Actualiza las fotografias de tu negocio y la identidad de marca</ListItem>
                            <ListItem href='#' title='Info. General'>Informacion general tal como descripcion, datos de contactos y entre otros</ListItem>
                            <ListItem href='#' title='Redes Sociales'>Instagram, facebook, YouTube, TikTok y entre otras</ListItem>
                            <ListItem href='#' title='Servicios'>Actualiza los servicios que ofrece tu negocio y agrega categorías nuevas</ListItem>
                            <ListItem href='#' title='Horarios'>Mantén tus horarios actualizados a si tus clientes tendran una informacion actualizada del lugar</ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {business.categories.map(element => element.name).includes('Restaurantes') ? <NavigationMenuItem >
                    <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            <ListItem href={`/dashboard/negocios/${params.negocio}/menu`} title='Menu'>Encuentra cada uno de tus productos</ListItem>
                            <ListItem href={`/dashboard/negocios/${params.negocio}/registrar-producto`} title='Agregar producto'>
                                Agregar producto
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>

                </NavigationMenuItem> : null}
                <NavigationMenuItem>
                    <Link href="/docs" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Documentation
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
        <Separator />
        {children}
    </div>
}

const ListItem = ({ title, children, className, ...props }) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
}