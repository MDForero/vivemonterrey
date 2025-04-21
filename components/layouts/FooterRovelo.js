import Image from "next/image";
import Link from "next/link";

export default function FooterRevelo() {
    return (
        <footer
            className="main-footer footer-two bgp-bottom bgc-black rel z-15 "
            style={{ backgroundImage: "url('/assets/images/backgrounds/footer-two.jpg')" }}
        >
            <FooterInstagram />

            <div className="widget-area py-10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">

                        {/* Logo + Mapa */}
                        <div data-aos="fade-up" className="space-y-6 col-span-2 lg:col-span-1">
                            <Link href="/" className="block w-40">
                                <Image loading="lazy" src="/logo.svg" width={160} height={60} alt="Vive Monterrey" />
                            </Link>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.071077813963!2d-72.8928324!3d4.8794962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6a4fca0a94e789%3A0x94c86b058eea93a2!2sMonterrey%2C%20Casanare!5e0!3m2!1ses!2sco!4v1688599999999!5m2!1ses!2sco"
                                className="w-full rounded-xl shadow-md"
                                style={{ border: 0, height: "180px" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>

                        {/* Servicios */}
                        <div data-aos="fade-up" data-aos-delay="50">
                            <h5 className="text-xl text-white font-semibold mb-4">Servicios</h5>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><Link href="/turismo">Guías turísticos</Link></li>
                                <li><Link href="/alojamientos">Reservas de alojamiento</Link></li>
                                <li><Link href="/gastronomia">Gastronomía local</Link></li>
                                <li><Link href="/transporte">Transporte</Link></li>
                            </ul>
                        </div>

                        {/* Vive Monterrey */}
                        <div data-aos="fade-up" data-aos-delay="100">
                            <h5 className="text-xl text-white font-semibold mb-4">Vive Monterrey</h5>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><Link href="/nosotros">¿Quiénes somos?</Link></li>
                                <li><Link href="/blog">Historias del Llano</Link></li>
                                <li><Link href="/contacto">Trabaja con nosotros</Link></li>
                                <li><Link href="/noticias">Noticias y eventos</Link></li>
                            </ul>
                        </div>

                        {/* Categorías turísticas */}
                        <div data-aos="fade-up" data-aos-delay="150">
                            <h5 className="text-xl text-white font-semibold mb-4">Explora Monterrey</h5>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><Link href="/cultura">Cultura y tradición</Link></li>
                                <li><Link href="/naturaleza">Naturaleza</Link></li>
                                <li><Link href="/piscinas">Piscinas y fincas</Link></li>
                                <li><Link href="/miradores">Miradores</Link></li>
                            </ul>
                        </div>

                        {/* Contacto */}
                        <div data-aos="fade-up" data-aos-delay="200">
                            <h5 className="text-xl text-white font-semibold mb-4">Contáctanos</h5>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li><i className="fas fa-map-marker-alt mr-2" /> Monterrey, Casanare, Colombia</li>
                                <li><i className="fas fa-envelope mr-2" /> <a href="mailto:contacto@vivemonterrey.co">contacto@vivemonterrey.com.co</a></li>
                                <li><i className="fas fa-phone mr-2" /> <a href="tel:+573108854737">+57 310 885 4737</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-muted mt-10 py-6 text-sm text-center text-muted-foreground">
                <p className="mb-2">© {new Date().getFullYear()} Vive Monterrey. Todos los derechos reservados.</p>
                <ul className="flex justify-center space-x-4">
                    <li><Link href="/terminos">Términos</Link></li>
                    <li><Link href="/politica-privacidad">Política de Privacidad</Link></li>
                    <li><Link href="/accesibilidad">Accesibilidad</Link></li>
                </ul>
            </div>
        </footer>

    );
};

const FooterInstagram = () => {
    return (
        <div className="container">
            <div className="footer-instagram pt-100 mb-70">
                <div className="row row-cols-xxl-6 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2">
                    <div
                        className="col"
                        data-aos="zoom-in-up"
                        data-aos-duration={1500}
                        data-aos-offset={50}
                    >
                        <a
                            className="instagram-item"
                            href="/assets/images/instagram/instagram1.jpg"
                        >
                            <Image loading='lazy'
                                src="/assets/images/instagram/instagram1.jpg"
                                width={0} height={0} className='w-full' alt="Instagram"
                            />
                        </a>
                    </div>
                    <div
                        className="col"
                        data-aos="zoom-in-down"
                        data-aos-duration={1500}
                        data-aos-offset={50}
                    >
                        <a
                            className="instagram-item"
                            href="/assets/images/instagram/instagram2.jpg"
                        >
                            <Image loading='lazy'
                                src="/assets/images/instagram/instagram2.jpg"
                                width={0} height={0} className='w-full' alt="Instagram"
                            />
                        </a>
                    </div>
                    <div
                        className="col"
                        data-aos="zoom-in-up"
                        data-aos-duration={1500}
                        data-aos-offset={50}
                    >
                        <a
                            className="instagram-item"
                            href="/assets/images/instagram/instagram3.jpg"
                        >
                            <Image loading='lazy'
                                src="/assets/images/instagram/instagram3.jpg"
                                width={0} height={0} className='w-full' alt="Instagram"
                            />
                        </a>
                    </div>
                    <div
                        className="col"
                        data-aos="zoom-in-down"
                        data-aos-duration={1500}
                        data-aos-offset={50}
                    >
                        <a
                            className="instagram-item"
                            href="/assets/images/instagram/instagram4.jpg"
                        >
                            <Image loading='lazy'
                                src="/assets/images/instagram/instagram4.jpg"
                                width={0} height={0} className='w-full' alt="Instagram"
                            />
                        </a>
                    </div>
                    <div
                        className="col"
                        data-aos="zoom-in-up"
                        data-aos-duration={1500}
                        data-aos-offset={50}
                    >
                        <a
                            className="instagram-item"
                            href="/assets/images/instagram/instagram5.jpg"
                        >
                            <Image loading='lazy'
                                src="/assets/images/instagram/instagram5.jpg"
                                width={0} height={0} className='w-full' alt="Instagram"
                            />
                        </a>
                    </div>
                    <div
                        className="col"
                        data-aos="zoom-in-down"
                        data-aos-duration={1500}
                        data-aos-offset={50}
                    >
                        <a
                            className="instagram-item"
                            href="/assets/images/instagram/instagram6.jpg"
                        >
                            <Image loading='lazy'
                                src="/assets/images/instagram/instagram6.jpg"
                                width={0} height={0} className='w-full' alt="Instagram"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
