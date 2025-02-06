import Menu from "@/components/AppSheet";

export async function  generateMetadata ({params}){
    return {
        title: params.negocio.split('-').join(' ') + ' - ' + 'Menu',
        description: 'Menu de productos',
        image: 'https://example.com/image.jpg',
        url: `https://example.com/${params.categoria}/${params.negocio}/menu`
    }
}

export default function Page ({params}){
    return <Menu params={params} />
}
