import CardContact from "@/components/CardContact";
import ClientOnly from "@/components/ClientOnly";
import { FormContact } from "@/components/FormContact";
import { DotIcon, Mail, MapPin, PhoneCall } from "lucide-react";
import Image from "next/image";

export default function page() {

    const contact = [
        {
            title: 'Contacto',
            icon: <PhoneCall className="w-8 h-8" />,
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
            icon: <Mail className="w-8 h-8" />,
            links: [
                {
                    name: 'info@vivemonterrey.com.co',
                    url: 'mailto:info@vivemonterrey.com.co'
                }
            ]
        },

        {
            title: 'Dirección',
            icon: <MapPin className="w-8 h-8" />,
            links: [
                {
                    name: 'Cl. 19 #8 - 181, Monterrey, Casanare',
                    url: 'https://goo.gl/maps/3z1QXtYUZdD9z8bA8'
                }
            ]
        }
    ]

    return <>
        <main className="container">
            <Image src='/assets/AdobeStock_233702538.jpg' alt="Imagen de seccion contacto" width={0} height={0} className="w-full h-[440px] md:h-[480px] lg:h-[540px] xl:h-[680px] object-cover" />
        </main>
        <ClientOnly>
        
            <section className="contact-info-area pt-100 rel z-1">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-4">
                            <div
                                className="contact-info-content mb-30 rmb-55"
                                data-aos="fade-up"
                                data-aos-duration={1500}
                                data-aos-offset={50}
                            >
                                <div className="section-title mb-30">
                                    <h2>¿Tienes dudas? ¡Hablemos!</h2>
                                </div>
                                <p>
                                    En Vive Monterrey somos un equipo pequeño pero apasionado por mostrar lo mejor de nuestro municipio.
                                    Si tienes preguntas, sugerencias o deseas vincular tu negocio, estamos listos para ayudarte con atención cercana y personalizada.
                                </p>
                                {/* <div className="features-team-box mt-40">
                                <h6>85+ Expert Team member</h6>
                                <div className="feature-authors">
                                    <img
                                        src="/assets/images/features/feature-author1.jpg"
                                        alt="Author"
                                    />
                                    <img
                                        src="/assets/images/features/feature-author2.jpg"
                                        alt="Author"
                                    />
                                    <img
                                        src="/assets/images/features/feature-author3.jpg"
                                        alt="Author"
                                    />
                                    <img
                                        src="/assets/images/features/feature-author4.jpg"
                                        alt="Author"
                                    />
                                    <img
                                        src="/assets/images/features/feature-author5.jpg"
                                        alt="Author"
                                    />
                                    <img
                                        src="/assets/images/features/feature-author6.jpg"
                                        alt="Author"
                                    />
                                    <img
                                        src="/assets/images/features/feature-author7.jpg"
                                        alt="Author"
                                    />
                                    <span>+</span>
                                </div>
                            </div> */}
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="row">
                                {contact.map(data => <CardContact key={data.title} data={data} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </ClientOnly>
        {/* Contact Info Area end */}
        {/* Contact Form Area start */}
        <ClientOnly>
        <section className="contact-form-area py-70 rel z-1">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-7">
                        <div className="comment-form bgc-lighter z-1 rel mb-30 rmb-55">
                            <div className="section-title mb-30">
                                <h2>Déjanos un mensaje</h2>
                            </div>
                            <FormContact />
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div
                            className="contact-images-part"
                            data-aos="fade-right"
                            data-aos-duration={1500}
                            data-aos-offset={50}
                        >
                            <div className="row">
                                <div className="col-12">
                                    <img
                                        src="/assets/images/contact/contact1.jpg"
                                        alt="Contact"
                                    />
                                </div>
                                <div className="col-6">
                                    <img
                                        src="/assets/images/contact/contact2.jpg"
                                        alt="Contact"
                                    />
                                </div>
                                <div className="col-6">
                                    <img
                                        src="/assets/images/contact/contact3.jpg"
                                        alt="Contact"
                                    />
                                </div>
                            </div>
                            <div className="circle-logo">
                                <img src="/assets/images/contact/icon.png" alt="Logo" />
                                <span className="title h2">Ravelo</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </ClientOnly>
        {/* Contact Form Area end */}
        {/* Contact Map Start */}
        <div className="contact-map">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.3616486724263!2d-72.89842292401671!3d4.87895094008447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6ad33c51110f4d%3A0x3da6e7b3ba7ebaf7!2sD%26D%20Tech!5e0!3m2!1ses-419!2sco!4v1729173256754!5m2!1ses-419!2sco"
                style={{ border: 0, width: "100%" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    </>
}
