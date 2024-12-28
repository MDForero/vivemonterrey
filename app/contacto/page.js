import CardContact from "@/components/CardContact";
import { FormContact } from "@/components/FormContact";
import { DotIcon, Mail, MapPin, PhoneCall } from "lucide-react";
import Image from "next/image";

export default function page() {

    const contact = [
        {
            title: 'Contacto',
            icon: <PhoneCall className="w-8 h-8"/>,
            links: [
                {
                    name: '+57 310 343 3298',
                    url: 'tel:+57310 343 3298'
                },
                {
                    name: '+57 310 885 4737',
                    url: 'tel:+57310 885 4737'
                }
            ]
        },
        {
            title: 'Correo',
            icon: <Mail className="w-8 h-8"/>,
            links: [
                {
                    name: 'info@vivemonterrey.com.co',
                    url: 'mailto:info@vivemonterrey.com.co'
                }
            ]
        },

        {
            title: 'Dirección',
            icon: <MapPin className="w-8 h-8"/>,
            links: [
                {
                    name: 'Cl. 19 #8 - 181, Monterrey, Casanare',
                    url: 'https://goo.gl/maps/3z1QXtYUZdD9z8bA8'
                }
            ]
        }
    ]

    return <>
        <main className="container mx-auto">
            <Image src='/assets/AdobeStock_233702538.jpg' alt="Imagen de seccion contacto" width={0} height={0} className="w-full h-[440px] md:h-[480px] lg:h-[540px] xl:h-[680px] object-cover" />
        </main>
        <section className=" grid-contact max-w-7xl mx-auto place-items-center gap-20">
            <div className="md:col-span-2 max-w-7xl w-full">
                <div className="grid grid-cards-contact ">
                    {contact.map((item, index) => <CardContact key={index} data={item} />)}
                </div>
            </div>
            <div>
                <FormContact />
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.3616486724263!2d-72.89842292401671!3d4.87895094008447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6ad33c51110f4d%3A0x3da6e7b3ba7ebaf7!2sD%26D%20Tech!5e0!3m2!1ses-419!2sco!4v1729173256754!5m2!1ses-419!2sco" className='w-[440px] h-[440px]' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </section>
    </>
}
