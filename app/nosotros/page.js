import Counter from "@/components/Counter";
import SectionTitle from "@/components/SectionTitle";
import Client from "@/components/slider/Client";
import Testimonial from "@/components/slider/Testimonial";
import Link from "next/link";
import { Fragment } from "react";

export default function page() {
    return (<Fragment>
        {/* About Area start */}
        <section className="about-area-two py-100 rel z-1">
            <div className="container">
                <div className="row justify-content-between">
                    <div
                        className="col-xl-3"
                        data-aos="fade-right"
                        data-aos-duration={1500}
                        data-aos-offset={50}
                    >
                        <span className="subtitle mb-35">Sobre Nosotros</span>
                    </div>
                    <div className="col-xl-9">
                        <div
                            className="about-page-content"
                            data-aos="fade-left"
                            data-aos-duration={1500}
                            data-aos-offset={50}
                        >
                            <div className="row">
                                <div className="col-lg-8 pe-lg-5 me-lg-5">
                                    <div className="section-title mb-25">
                                        <h2>
                                            Vive Monterrey: Tu Conexión con el Corazón Turístico del Piedemonte Llanero
                                        </h2>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="experience-years rmb-20">
                                        <span className="title bgc-secondary">
                                            Turismo Local
                                        </span>
                                        <span className="text">Mostrando lo mejor de Monterrey</span>
                                        <span className="years">100%</span>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <p>
                                        Vive Monterrey es una iniciativa que impulsa el turismo local a través de experiencias auténticas, contenido audiovisual de alta calidad y una plataforma digital que conecta a visitantes con los atractivos, negocios y cultura de Monterrey, Casanare.
                                    </p>
                                    <ul className="list-style-two mt-35">
                                        <li>Directorio Turístico Actualizado</li>
                                        <li>Videos y Promoción en Redes</li>
                                        <li>Experiencias Llaneras Únicas</li>
                                        <li>Soporte Local y Cercano</li>
                                    </ul>
                                    <Link href="/explora" className="theme-btn style-three mt-30">
                                        <span data-hover="Explora Monterrey">Explora Monterrey</span>
                                        <i className="fal fa-arrow-right" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* About Area end */}
        {/* Features Area start */}
        <section className="about-features-area">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-xl-4 col-md-6">
                        <div
                            className="about-feature-image"
                            data-aos="fade-up"
                            data-aos-duration={1500}
                            data-aos-offset={50}
                        >
                            <img src="/assets/images/about/Vive Monterrey1.jpg" alt="Monterrey Casanare" />
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6">
                        <div
                            className="about-feature-image"
                            data-aos="fade-up"
                            data-aos-delay={50}
                            data-aos-duration={1500}
                            data-aos-offset={50}
                        >
                            <img src="/assets/images/about/Vive Monterrey2.jpg" alt="Turismo Llanero" />
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-8">
                        <div
                            className="about-feature-boxes"
                            data-aos="fade-up"
                            data-aos-delay={100}
                            data-aos-duration={1500}
                            data-aos-offset={50}
                        >
                            <div className="feature-item style-three bgc-secondary">
                                <div className="icon-title">
                                    <div className="icon">
                                        <i className="flaticon-play-button" />
                                    </div>
                                    <h5>
                                        <Link href="/atractivos">
                                            Plataforma Audiovisual de Impacto
                                        </Link>
                                    </h5>
                                </div>
                                <div className="content">
                                    <p>
                                        Promocionamos Monterrey con videos únicos que capturan la esencia del llano, conectando visitantes con experiencias reales y memorables.
                                    </p>
                                </div>
                            </div>
                            <div className="feature-item style-three bgc-primary">
                                <div className="icon-title">
                                    <div className="icon">
                                        <i className="flaticon-map" />
                                    </div>
                                    <h5>
                                        <Link href="/directorio">
                                            Directorio Turístico Integral
                                        </Link>
                                    </h5>
                                </div>
                                <div className="content">
                                    <p>
                                        Encuentra fácilmente restaurantes, alojamientos, actividades, operadores y todo lo que puedes vivir en Monterrey, actualizado y verificado.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Features Area end */}
        {/* About Us Area start */}
        <section className="about-us-area pt-70 pb-100 rel z-1">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-xl-5 col-lg-6">
                        <div
                            className="about-us-content rmb-55"
                            data-aos="fade-left"
                            data-aos-duration={1500}
                            data-aos-offset={50}
                        >
                            <div className="section-title mb-25">
                                <h2>
                                    Vive Monterrey: Turismo con Identidad, Tecnología y Pasión Llanera
                                </h2>
                            </div>
                            <p>
                                En Vive Monterrey conectamos viajeros con las raíces auténticas del llano. Creamos contenidos inmersivos, visibilizamos negocios locales y construimos un ecosistema turístico innovador donde cada experiencia cuenta.
                            </p>
                            <div className="row pt-25">
                                <div className="col-6">
                                    <div className="counter-item counter-text-wrap">
                                        <span className="count-text">
                                            <Counter end={30} />
                                        </span>
                                        <span className="counter-title">Lugares Turísticos</span>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="counter-item counter-text-wrap">
                                        <span className="count-text">
                                            <Counter end={100} />
                                        </span>
                                        <span className="counter-title">Aliados Locales</span>
                                    </div>
                                </div>
                            </div>
                            <Link
                                href="/atractivos"
                                className="theme-btn mt-10 style-two"
                            >
                                <span data-hover="Explora Monterrey">Explora Monterrey</span>
                                <i className="fal fa-arrow-right" />
                            </Link>
                        </div>
                    </div>
                    <div
                        className="col-xl-7 col-lg-6"
                        data-aos="fade-right"
                        data-aos-duration={1500}
                        data-aos-offset={50}
                    >
                        <div className="about-us-page">
                            <img src="/assets/images/about/vive-monterrey-experiencia.jpg" alt="Turismo en Monterrey Casanare" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* About Us Area end */}
        {/* Team Area start */}
        {/* <section className="about-team-area pb-70 rel z-1">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div
                            className="section-title text-center counter-text-wrap mb-50"
                            data-aos="fade-up"
                            data-aos-duration={1500}
                            data-aos-offset={50}
                        >
                            <SectionTitle title={"Meet Our Experience Travel Guides"} />
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                        <div
                            className="team-item hover-content"
                            data-aos="fade-up"
                            data-aos-duration={1500}
                            data-aos-offset={50}
                        >
                            <img src="/assets/images/team/guide1.jpg" alt="Guide" />
                            <div className="content">
                                <h6>John L. Simmons</h6>
                                <span className="designation">Co-founder</span>
                                <div className="social-style-one inner-content">
                                    <Link href="contact">
                                        <i className="fab fa-twitter" />
                                    </Link>
                                    <Link href="contact">
                                        <i className="fab fa-facebook-f" />
                                    </Link>
                                    <Link href="contact">
                                        <i className="fab fa-instagram" />
                                    </Link>
                                    <a href="#">
                                        <i className="fab fa-pinterest-p" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                        <div
                            className="team-item hover-content"
                            data-aos="fade-up"
                            data-aos-delay={50}
                            data-aos-duration={1500}
                            data-aos-offset={50}
                        >
                            <img src="/assets/images/team/guide2.jpg" alt="Guide" />
                            <div className="content">
                                <h6>Andrew K. Manley</h6>
                                <span className="designation">Senior Guide</span>
                                <div className="social-style-one inner-content">
                                    <Link href="contact">
                                        <i className="fab fa-twitter" />
                                    </Link>
                                    <Link href="contact">
                                        <i className="fab fa-facebook-f" />
                                    </Link>
                                    <Link href="contact">
                                        <i className="fab fa-instagram" />
                                    </Link>
                                    <a href="#">
                                        <i className="fab fa-pinterest-p" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                        <div
                            className="team-item hover-content"
                            data-aos="fade-up"
                            data-aos-delay={100}
                            data-aos-duration={1500}
                            data-aos-offset={50}
                        >
                            <img src="/assets/images/team/guide3.jpg" alt="Guide" />
                            <div className="content">
                                <h6>Drew J. Bridges</h6>
                                <span className="designation">Travel Guide</span>
                                <div className="social-style-one inner-content">
                                    <Link href="contact">
                                        <i className="fab fa-twitter" />
                                    </Link>
                                    <Link href="contact">
                                        <i className="fab fa-facebook-f" />
                                    </Link>
                                    <Link href="contact">
                                        <i className="fab fa-instagram" />
                                    </Link>
                                    <a href="#">
                                        <i className="fab fa-pinterest-p" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                        <div
                            className="team-item hover-content"
                            data-aos="fade-up"
                            data-aos-delay={150}
                            data-aos-duration={1500}
                            data-aos-offset={50}
                        >
                            <img src="/assets/images/team/guide4.jpg" alt="Guide" />
                            <div className="content">
                                <h6>Byron F. Simpson</h6>
                                <span className="designation">Travel Guide</span>
                                <div className="social-style-one inner-content">
                                    <Link href="contact">
                                        <i className="fab fa-twitter" />
                                    </Link>
                                    <Link href="contact">
                                        <i className="fab fa-facebook-f" />
                                    </Link>
                                    <Link href="contact">
                                        <i className="fab fa-instagram" />
                                    </Link>
                                    <a href="#">
                                        <i className="fab fa-pinterest-p" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> */}
        {/* Team Area end */}
        {/* Features Area start */}
        <section className="about-feature-two bgc-black pt-100 pb-45 rel z-1">
            <div className="container">
                <div
                    className="section-title text-center text-white counter-text-wrap mb-50"
                    data-aos="fade-up"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                >
                    <SectionTitle title={"Beneficios de Usar ViveMonterrey"} />
                </div>
                <div className="row">
                    <div
                        className="col-xl-3 col-lg-4 col-md-6"
                        data-aos="fade-up"
                        data-aos-duration={1500}
                        data-aos-offset={50}
                    >
                        <div className="feature-item style-two">
                            <div className="icon">
                                <i className="flaticon-save-money" />
                            </div>
                            <div className="content">
                                <h5>
                                    <Link href="/ofertas">Ahorros Reales</Link>
                                </h5>
                                <p>Descubre planes turísticos locales con precios accesibles y promociones exclusivas.</p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="col-xl-3 col-lg-4 col-md-6"
                        data-aos="fade-up"
                        data-aos-delay={50}
                        data-aos-duration={1500}
                        data-aos-offset={50}
                    >
                        <div className="feature-item style-two">
                            <div className="icon">
                                <i className="flaticon-travel-1" />
                            </div>
                            <div className="content">
                                <h5>
                                    <Link href="/categorias">Variedad de Experiencias</Link>
                                </h5>
                                <p>Desde miradores hasta fincas agroturísticas, explora todo lo que Monterrey tiene por ofrecer.</p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="col-xl-3 col-lg-4 col-md-6"
                        data-aos="fade-up"
                        data-aos-delay={100}
                        data-aos-duration={1500}
                        data-aos-offset={50}
                    >
                        <div className="feature-item style-two">
                            <div className="icon">
                                <i className="flaticon-booking" />
                            </div>
                            <div className="content">
                                <h5>
                                    <Link href="/reserva">Reserva Fácil</Link>
                                </h5>
                                <p>Agenda visitas, hospedajes o experiencias directamente desde nuestra app web.</p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="col-xl-3 col-lg-4 col-md-6"
                        data-aos="fade-up"
                        data-aos-delay={150}
                        data-aos-duration={1500}
                        data-aos-offset={50}
                    >
                        <div className="feature-item style-two">
                            <div className="icon">
                                <i className="flaticon-guidepost" />
                            </div>
                            <div className="content">
                                <h5>
                                    <Link href="/guias-locales">Guías Locales</Link>
                                </h5>
                                <p>Accede a información precisa, recomendaciones auténticas y contacto directo con anfitriones llaneros.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shape">
                <img src="/assets/images/video/shape1.png" alt="decoración" />
            </div>
        </section>

        {/* Features Area end */}
        {/* Video Area start */}
        {/* <div className="video-area pt-25 rel z-1">
            <div className="container">
                <div
                    className="video-wrap"
                    data-aos="zoom-in"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                >
                    <img src="/assets/images/video/video-bg.jpg" alt="Video" />
                    <a
                        href="https://www.youtube.com/watch?v=9Y7ma241N8k"
                        className="mfp-iframe video-play"
                        tabIndex={-1}
                    >
                        <i className="fas fa-play" />
                    </a>
                </div>
            </div>
            <div className="for-bg bgc-black">
                <div className="shape">
                    <img src="/assets/images/video/shape2.png" alt="shape" />
                </div>
            </div>
        </div> */}
        {/* Video Area end */}
        {/* Testimonials Area start */}
        <section className="testimonials-area py-100 rel z-1">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div
                            className="testimonial-left-content rmb-50"
                            data-aos="fade-right"
                            data-aos-duration={1500}
                            data-aos-offset={50}
                        >
                            <img
                                src="/assets/images/testimonials/llanero-testimonial.png"
                                alt="Testimonio ViveMonterrey"
                            />
                            <div className="happy-customer text-white bgc-primary">
                                <h6>+5.000 visitantes felices</h6>
                                <div className="feature-authors mb-15">
                                    <img
                                        src="/assets/images/features/cliente1.jpg"
                                        alt="Testimonio"
                                    />
                                    <img
                                        src="/assets/images/features/cliente2.jpg"
                                        alt="Testimonio"
                                    />
                                    <img
                                        src="/assets/images/features/cliente3.jpg"
                                        alt="Testimonio"
                                    />
                                    <span>y muchos más</span>
                                </div>
                                <hr />
                                <p>Opiniones positivas</p>
                                <div className="testi-header">
                                    <div className="ratting">
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div
                            className="testimonial-right-content"
                            data-aos="fade-left"
                            data-aos-duration={1500}
                            data-aos-offset={50}
                        >
                            <div className="section-title mb-55">
                                <h2>
                                    Más de <span>200</span> negocios locales ya confían en ViveMonterrey
                                </h2>
                                <p>Conectamos turistas con experiencias auténticas y apoyamos el crecimiento del turismo rural en Casanare.</p>
                            </div>
                            <Testimonial />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Testimonials Area end */}
        {/* Client Logo Area start */}
        <div className="client-logo-area mb-100">
            <div className="container">
                <div className="client-logo-wrap pt-60 pb-55">
                    <div
                        className="text-center mb-40"
                        data-aos="zoom-in"
                        data-aos-duration={1500}
                        data-aos-offset={50}
                    >
                        <h6>We’re recommended by:</h6>
                    </div>
                    <Client />
                </div>
            </div>
        </div>
        {/* Client Logo Area end */}
    </Fragment>
    )
}