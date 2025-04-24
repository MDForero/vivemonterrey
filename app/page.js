
import CardCategory from "@/components/index/CardCategory";
import ClientOnly from "@/components/ClientOnly";
import Counter from "@/components/Counter";
import ImageSupabase from "@/components/ImageSupabase";
import SectionTitle from "@/components/SectionTitle";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import FormContact from "@/components/index/FormContact";
import CardBenefits from "@/components/index/CardBenefits";
import CardHotel from "@/components/index/CardHotel";
import CardRestaurant from "@/components/index/CardRestaurant";
import CardActivities from "@/components/index/CardActivities";
import Image from "next/image";

export const metadata = {
  title: "Vive Monterrey",
  description: "Descubre la esencia del llano en Monterrey, Casanare. Un destino que fusiona aventura, naturaleza y tradición en el corazón de Casanare. ¡Vive Monterrey es tu punto de partida!",
  keywords: "Monterrey, Casanare, Vive Monterrey, Llanos Orientales, Colombia, Turismo, Naturaleza, Aventura, Cultura Llanera, Gastronomía, Tradición, Ríos, Cascadas, Lagunas, Piscinas Naturales, Paratrike, Vuelos, Ecuestres, Miradores, Experiencias Agrarias, Senderos, Muestras Culturales, Biodiversidad, Llanuras, Llanero, ViveMonterrey, Vive Monterrey, ViveMonterrey.com, Vive Monterrey.com, ViveMonterrey.co, Vive Monterrey.co",
}

export default async function Home() {

  const supabase = createClient()
  const { data: categories, error } = await supabase.from('categories').select('*, businesses(*)')
  const { count, error: errorCount } = await supabase.from('businesses').select('*', { count: 'exact', head: true })

  const hotels = categories?.find(category => category.name === 'Alojamientos')
  const restaurants = categories?.find(category => category.name === 'Restaurantes')

  const benefits = [
    {
      title: "Alojamientos para todos los gustos",
      description: "Desde fincas agroturísticas hasta hospedajes en la naturaleza.",
      icon: "flaticon-save-money"
    },
    {
      title: "Información rápida y confiable",
      description: "Accede a nuestro directorio web o app y planifica tu viaje fácil.",
      icon: "flaticon-booking"
    },
    {
      title: "Experiencias únicas",
      description: "Disfruta de cabalgatas, tours por ríos, cultura llanera y más.",
      icon: "flaticon-travel-1"
    },
    {
      title: "Guía visual con videos reales",
      description: "Conoce cada sitio con videos auténticos grabados en Monterrey.",
      icon: "flaticon-guidepost"
    },
    {
      title: "Turismo de naturaleza y aventura",
      description: "Explora cascadas, pozos, montañas y rutas ecológicas únicas.",
      icon: "flaticon-climbing"
    },
    {
      title: "Soporte personalizado",
      description: "Escríbenos o conecta con los negocios locales directamente.",
      icon: "flaticon-online-chat"
    }
  ];

  return (
    <>
      <>
        {/* Hero Area Start */}
        <ClientOnly>
          <section
            className="hero-area-two pt-160 rpt-100 rel z-2"
            style={{
              backgroundImage: "url(assets/images/backgrounds/hero-bg-lines.png)",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-xl-6">
                  <div
                    className="hero-content-two"
                    data-aos="fade-left"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <span className="subtitle mb-15">Aventuras, cultura &amp; naturaleza en un solo destino</span>
                    <h1>Monterrey Casanare Aventura &amp; Naturaleza</h1>
                    <p>
                      Descubre los mejores planes, lugares y actividades para vivir Monterrey como un local y disfrutar cada rincón de este paraíso llanero.
                    </p>
                    <Link
                      href="/explora"
                      className="theme-btn style-two bgc-secondary mt-25"
                    >
                      <span data-hover="Explore Tours">Explora más</span>
                      <i className="fal fa-arrow-right" />
                    </Link>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div
                    className="hero-image-two bgs-cover"
                    style={{
                      backgroundImage: "url(assets/images/hero/hero-two.jpg)",
                    }}
                    data-aos="fade-right"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  />
                </div>
              </div>
            </div>
          </section>
        </ClientOnly>
        {/* Hero Area End */}
        {/* Banner and Search Area Start */}
        {/* <ClientOnly>
          <section className="banner-and-search pt-10 rel z-2">
            <div className="row">
              <div className="col-xxl-4 col-md-6">
                <div
                  className="search-banner"
                  style={{
                    backgroundImage: "url(assets/images/banner/search-banner1.jpg)",
                  }}
                  data-aos="zoom-in-up"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                />
              </div>
              <div className="col-xxl-4 col-md-6">
                <div
                  className="search-banner"
                  style={{
                    backgroundImage: "url(assets/images/banner/search-banner2.jpg)",
                  }}
                  data-aos="zoom-in-up"
                  data-aos-delay={50}
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <div
                    className="content"
                    style={{
                      backgroundImage:
                        "url(assets/images/banner/search-banner-shape.png)",
                    }}
                  >
                    <div className="left">
                      Explora los <i className="far fa-long-arrow-alt-right" />{" "}
                      <b>rincones mágicos</b> de Monterrey, Casanare con{" "}
                      <span>
                        <br /><b>Vive Monterrey</b>
                      </span>
                    </div>
                    <div
                      className="right"
                      style={{
                        backgroundImage:
                          "url(assets/images/banner/search-banner-off-bg.png)",
                      }}
                    >
                      <span className="number">
                        <span>10</span>%
                      </span>
                      <span className="text">OFF</span>
                    </div>
                  </div>
                </div>
              </div>
              <FormContact />
            </div>
          </section>
        </ClientOnly> */}
        {/* Banner and Search Area End */}
        {/* About Area start */}
        <ClientOnly>
          <section className="about-area-two pt-90 rel z-1">
            <div className="container">
              <div className="row justify-content-end">
                <div
                  className="col-xxl-4 col-xl-3"
                  data-aos="fade-right"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <span className="subtitle mb-35">Sobre Vive Monterrey</span>
                </div>
                <div className="col-xxl-7 col-xl-9">
                  <div
                    className="about-two-content"
                    data-aos="fade-left"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <div className="row">
                      <div className="col-lg-9">
                        <div className="section-title mb-25">
                          <h2>
                            La plataforma turística más completa de Monterrey, Casanare
                          </h2>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="experience-years rmb-20">
                          <span className="title">Aliados Vinculados</span>
                          <span className="text">Más de</span>
                          <span className="years"><Counter end={count} />+</span>
                        </div>
                      </div>
                      <div className="col-md-7">
                        <p>
                          Vive Monterrey es una iniciativa que reúne lo mejor del turismo local:
                          operadores, fincas agroturísticas, restaurantes, miradores, actividades
                          culturales y naturaleza. A través de nuestra plataforma digital y
                          redes sociales, conectamos a visitantes con las experiencias auténticas
                          que ofrece nuestro municipio.
                        </p>
                        <Link href="/nosotros" className="theme-btn style-three mt-25">
                          <span data-hover="Conócenos">Conócenos</span>
                          <i className="fal fa-arrow-right" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ClientOnly>
        {/* About Area end */}
        {/* Popular Visiting Place start */}
        <ClientOnly>
          <section className="popular-visiting-place pt-100 pb-70 rel z-1">
            <div className="container">
              <div className="row justify-content-center">
                {categories && categories?.map(category => <CardCategory data={category} key={category.id} />)}

              </div>
            </div>
          </section>
        </ClientOnly>
        {/* Popular Visiting Place end */}
        {/* Popular Activity Area start */}
        <ClientOnly>
          <section className="popular-activity-area bgc-lighter br-10 pt-100 pb-70 rel z-1">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div
                    className="section-title text-center counter-text-wrap mb-45"
                    data-aos="fade-up"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <h2>Descubre las Mejores Experiencias de Monterrey</h2>
                    <p>
                      Más de{" "}
                      <span
                        className="count-text plus"
                        data-speed={3000}
                        data-stop={90}
                      >
                        <Counter end={50} />
                      </span>{" "}
                      actividades para vivir el Llano
                    </p>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                {[
                  {
                    title: "Miradores Naturales",
                    tours: "12 lugares",
                    image: "/assets/images/activities/activity2.png",
                  },
                  {
                    title: "Rutas Ecoturísticas",
                    tours: "9 rutas únicas",
                    image: "/assets/images/activities/activity3.png",
                  },
                  {
                    title: "Pozos y Cascadas",
                    tours: "7 lugares naturales",
                    image: "/assets/images/activities/activity6.png",
                  },
                  {
                    title: "Vive el Día Llanero",
                    tours: "4 experiencias",
                    image: "/assets/images/activities/activity1.png",
                  },
                  {
                    title: "Cacao y Chocolate",
                    tours: "Transforma tu sabor",
                    image: "/assets/images/activities/activity4.png",
                  },
                  {
                    title: "Cabalgatas y Show Equino",
                    tours: "Experiencia tradicional",
                    image: "/assets/images/activities/activity7.png",
                  },
                  {
                    title: "Ríos, Lagunas y Camping",
                    tours: "5 destinos acuáticos",
                    image: "/assets/images/activities/activity8.png",
                  },
                  {
                    title: "Amaneceres y Atardeceres",
                    tours: "Puntos con mejor vista",
                    image: "/assets/images/activities/activity5.png",
                  },
                  {
                    title: "Aventura Aérea en Paratrike",
                    tours: "Coronando el cielo",
                    image: "/assets/images/activities/activity9.png",
                  },
                ].map(item => <CardActivities data={item} key={item.title}/>)}
              </div>
            </div>
          </section>
        </ClientOnly>
        {/* Popular Activity Area end */}
        {/* Destinations Area start */}
        <ClientOnly>
        <section className="featured-restaurants-area pt-100 pb-70 rel z-1">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-lg-12">
        <div
          className="section-title text-center counter-text-wrap mb-70"
          data-aos="fade-up"
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <SectionTitle
            title="Sabores que conquistan en Monterrey"
            subtitle1="Gastronomía local, nacional e internacional"
            subtitle2="Sabores para todos los gustos en Monterrey"
            countValue={count}
            bg="bgc-primary"
          />
        </div>
      </div>
    </div>

    <div className="row justify-content-center">
      {restaurants?.businesses
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(0, 4)
        .map((restaurant) => (
          <CardRestaurant key={restaurant.id} data={restaurant} />
        ))}
    </div>
  </div>
</section>

        </ClientOnly>
        {/* Destinations Area end */}
        {/* CTA Area start */}
        <ClientOnly>
          <section
            className="cta-area-two overlay rel z-1"
            style={{
              backgroundImage: "url(/assets/images/backgrounds/cta-two.jpg)",
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover '
            }}
          >
            <div className="container">
              <div className="row">
                <div
                  className="col-lg-6 align-self-center"
                  data-aos="fade-left"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <div className="cta-content-part text-white py-50 rpt-100 rpb-15">
                    <div className="section-title mb-25">
                      <h2>
                        Vive Monterrey con hasta <span><Counter end={10} />%</span> de descuento
                      </h2>
                    </div>
                    <p>
                      Ahorra en alojamientos y actividades si reservas con anticipación antes del <strong>20 de julio de 2024</strong>.
                    </p>
                    <Link
                      href="/categorias/alojamientos"
                      className="theme-btn style-two bgc-secondary mt-20"
                    >
                      <span data-hover="Planifica tu escapada llanera">
                        Planifica tu escapada llanera
                      </span>
                      <i className="fal fa-arrow-right" />
                    </Link>
                  </div>
                </div>
                <div
                  className="col-lg-6 align-self-end"
                  data-aos="zoom-in-up"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <div className="cta-image-part mt-40">
                    <Image loading='lazy' src="/assets/images/cta/cta-two.png" alt="Vive Monterrey Promo" className="w-full" width={0} height={0} />
                  </div>
                </div>
              </div>
            </div>
          </section>

        </ClientOnly>
        {/* CTA Area end */}
        {/* Features Area start */}
        <ClientOnly>
          <section className="features-area-two pt-100 pb-45 rel z-1">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div
                    className="features-two-content mb-25 z-2 rel"
                    data-aos="fade-left"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <div className="section-title counter-text-wrap mb-50">
                      <SectionTitle
                        title={"Beneficios de explorar Monterrey con ViveMonterrey"}
                        bg={"bgc-primary"}
                        subtitle2="una guía completa de experiencias auténticas"
                      />
                    </div>
                    <div className="features-wrap-two">
                      <div className="row">
                        {benefits.map(benefit => <CardBenefits key={benefit.title} data={benefit} />)}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="col-lg-6"
                  data-aos="fade-right"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <div className="features-image-two text-lg-end mb-55">
                    <Image loading='lazy'
                      src="assets/images/features/features-two.jpg"
                      alt="Explora ViveMonterrey"
                      className="h-full w-full"
                      width={0}
                      height={0}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ClientOnly>
        {/* Features Area end */}
        {/* Team Area start */}
        {/* <ClientOnly>
          <section
            className="team-area overflow-hidden br-10 bgc-black bgp-bottom pt-100 pb-70 rel z-1"
            style={{ backgroundImage: "url(assets/images/backgrounds/guides.png)" }}
          >
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div
                    className="section-title text-white text-center counter-text-wrap mb-70"
                    data-aos="fade-up"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <SectionTitle title={"Meet Our Experience Travel Guides"} />
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <div
                    className="team-item hover-content"
                    data-aos="fade-up"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <Image loading='lazy' src="assets/images/team/guide1.jpg" alt="Guide" />
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
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <div
                    className="team-item hover-content"
                    data-aos="fade-up"
                    data-aos-delay={50}
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <Image loading='lazy' src="assets/images/team/guide2.jpg" alt="Guide" />
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
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <div
                    className="team-item hover-content"
                    data-aos="fade-up"
                    data-aos-delay={100}
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <Image loading='lazy' src="assets/images/team/guide3.jpg" alt="Guide" />
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
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <div
                    className="team-item hover-content"
                    data-aos="fade-up"
                    data-aos-delay={150}
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <Image loading='lazy' src="assets/images/team/guide4.jpg" alt="Guide" />
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
            <div className="guide-shapes">
              <div className="shape one">
                <Image loading='lazy' src="assets/images/shapes/guide1.png" alt="Shape" />
              </div>
              <div className="shape two">
                <Image loading='lazy' src="assets/images/shapes/guide2.png" alt="Shape" />
              </div>
            </div>
          </section>
        </ClientOnly> */}
        {/* Team Area end */}
        {/* City Tours Area start */}
        <ClientOnly>
          <section className="highlighted-hotels-area pt-100 pb-70 rel z-1">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div
                    className="section-title text-center counter-text-wrap mb-70"
                    data-aos="fade-up"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <SectionTitle
                      title="Alojamientos destacados en Monterrey"
                      subtitle1="Alojamientos en Monterrey"
                      subtitle2="Espacios seleccionados por su experiencia, ubicación y encanto"
                      bg="bgc-primary"
                      countValue={count}
                    />
                  </div>
                </div>
              </div>

              <div className="row justify-content-center">
                {hotels?.businesses?.slice(0, 4).map((hotel) => (
                  <CardHotel data={hotel} key={hotel.id} />
                ))}
              </div>
            </div>
          </section>
        </ClientOnly>
        {/* City Tours Area end */}
        {/* Newsletter Area start */}
        {/* <ClientOnly>
          <section
            className="newsletter-two bgc-primary overflow-hidden br-10 py-100 rel z-1"
            style={{
              backgroundImage:
                "url(assets/images/newsletter/newsletter-bg-lines.png)",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div
                    className="newsletter-content-part text-white rmb-55"
                    data-aos="zoom-in-right"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <div className="section-title counter-text-wrap mb-45">
                      <SectionTitle
                        title={"Subscribe Our Newsletter to Get more offer & Tips"}
                      />
                    </div>
                    <form className="newsletter-form mb-15" action="#">
                      <input
                        id="news-email"
                        type="email"
                        placeholder="Email Address"
                        required=""
                      />
                      <button
                        type="submit"
                        className="theme-btn bgc-secondary style-two"
                      >
                        <span data-hover="Subscribe">Subscribe</span>
                        <i className="fal fa-arrow-right" />
                      </button>
                    </form>
                    <p>No credit card requirement. No commitments</p>
                  </div>
                  <div
                    className="newsletter-bg-image"
                    data-aos="zoom-in-up"
                    data-aos-delay={100}
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <Image loading='lazy'
                      src="assets/images/newsletter/newsletter-bg-image.png"
                      alt="Newsletter"
                      className="h-full w-full"
                      width={0}
                      height={0}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div
                    className="newsletter-image-part bgs-cover"
                    style={{
                      backgroundImage:
                        "url(assets/images/newsletter/newsletter-right.jpg)",
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        </ClientOnly> */}
        {/* Newsletter Area end */}
        {/* Blog Area start */}
        {/* <ClientOnly>
          <section className="blog-area pt-100 pb-70 rel z-1">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div
                    className="section-title text-center counter-text-wrap mb-70"
                    data-aos="fade-up"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <SectionTitle
                      title={"Read Latest News & Blog"}
                      bg={"bgc-primary"}
                    />
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-xxl-4 col-lg-6">
                  <div
                    className="blog-item style-two"
                    data-aos="fade-up"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <div className="image">
                      <Image loading='lazy' src="assets/images/blog/blog-two1.jpg" alt="Blog" />
                    </div>
                    <div className="content">
                      <ul className="blog-meta">
                        <li>
                          <i className="far fa-calendar-alt" />{" "}
                          <a href="#">25 Feb 2024</a>
                        </li>
                        <li>
                          <i className="far fa-comments" />{" "}
                          <a href="#">Comments (5)</a>
                        </li>
                      </ul>
                      <h5>
                        <Link href="blog-details">
                          Ultimate Guide to Planning Your Dream Vacation
                        </Link>
                      </h5>
                      <Link href="blog-details" className="read-more">
                        Read More <i className="fal fa-angle-right" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-4 col-lg-6">
                  <div
                    className="blog-item style-two"
                    data-aos="fade-up"
                    data-aos-delay={100}
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <div className="image">
                      <Image loading='lazy' src="assets/images/blog/blog-two2.jpg" alt="Blog" />
                    </div>
                    <div className="content">
                      <ul className="blog-meta">
                        <li>
                          <i className="far fa-calendar-alt" />{" "}
                          <a href="#">25 Feb 2024</a>
                        </li>
                        <li>
                          <i className="far fa-comments" />{" "}
                          <a href="#">Comments (5)</a>
                        </li>
                      </ul>
                      <h5>
                        <Link href="blog-details">
                          Ultimate Guide to Planning Your Dream Vacation
                        </Link>
                      </h5>
                      <Link href="blog-details" className="read-more">
                        Read More <i className="fal fa-angle-right" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-4 col-lg-6">
                  <div
                    className="blog-item style-two"
                    data-aos="fade-up"
                    data-aos-delay={200}
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <div className="image">
                      <Image loading='lazy' src="assets/images/blog/blog-two3.jpg" alt="Blog" />
                    </div>
                    <div className="content">
                      <ul className="blog-meta">
                        <li>
                          <i className="far fa-calendar-alt" />{" "}
                          <a href="#">25 Feb 2024</a>
                        </li>
                        <li>
                          <i className="far fa-comments" />{" "}
                          <a href="#">Comments (5)</a>
                        </li>
                      </ul>
                      <h5>
                        <Link href="blog-details">
                          Ultimate Guide to Planning Your Dream Vacation
                        </Link>
                      </h5>
                      <Link href="blog-details" className="read-more">
                        Read More <i className="fal fa-angle-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ClientOnly> */}
        {/* Blog Area end */}
      </>

    </>
  );
}

const galleryInstagram = ['/assets/siguenos/Cascadas-algarrobos.jpg',
  '/assets/siguenos/Imagen de WhatsApp 2024-06-02 a las 17.48.20_dfbb70d2.jpg',
  '/assets/siguenos/Imagen de WhatsApp 2024-06-02 a las 17.48.20_314cc5b1.jpg',
  '/assets/siguenos/Imagen de WhatsApp 2024-06-02 a las 17.55.33_1cd5e501.jpg',
  '/assets/siguenos/Imagen de WhatsApp 2024-06-02 a las 17.48.20_9278bcb5.jpg',
  '/assets/siguenos/Imagen de WhatsApp 2024-06-02 a las 17.50.44_1b134760.jpg',
]

//  { <>
//         <main className="relative z-0 container mx-auto h-fit">
//           <iframe className='w-full aspect-video object-cover border-2 mx-auto' src="https://www.youtube.com/embed/TjeR7ZTvavc?playlist=TjeR7ZTvavc&autoplay=1&mute=1&loop=1&controls=0&fs=0" frameBorder="0" allow="autoplay" encrypted-media='true' allowFullScreen></iframe>
//           {/* <video autoPlay className="object-cover aspect-square lg:aspect-auto w-full lg:h-[540px] xl:h-[680px] " muted loop     >
//           <source src="/assets/presentacion-viveMonterrey.mp4" type="video/mp4" />
//         </video> */}
//           {/* <PlayerYoutube /> */}
//         </main>
//         <div className="lg:space-y-16 md:space-y-10  space-y-6 max-w-7xl mx-auto">

//           {/* categorias de negocios */}
//           <section className="space-y-8 md:border-2 m-2 p-3 py-8 lg:p-14">
//             <div className="text-center space-y-2 ">
//               <h1 className="text-xl font-bold title">Descubre Monterrey, Casanare</h1>
//               <h1 className="text-md font-bold text-primary/85">¡Tu guía perfecta para explorar lo mejor del Llano!</h1>
//               <h3 className="text-sm text-primary/75 text-justify md:text-center">Adéntrate en la riqueza cultural, los paisajes naturales y las experiencias únicas que ofrece Monterrey. Encuentra alojamientos acogedores, vistas impresionantes desde miradores, actividades emocionantes, y mucho más. ViveMonterrey es el punto de inicio para planear tu próxima aventura. </h3>
//             </div>

//             <div className=" justify-around gap-8 flex-wrap md:flex hidden">
//               {data?.map((category) => <CardCategory key={category.id} data={category} />)}
//             </div>
//             <div className="md:hidden">
//               <SliderCategory data={data} />
//             </div>
//           </section>

//           {/* hero */}


//           <section className="max-w-7xl mx-auto space-y-12 border p-2 md:p-4 lg:p-16" >
//             <div className="text-center">
//               <h1 className="font-bold md:text-3xl text-viveRed">Descubre Monterrey, Casanare en Números</h1>
//               <h1 className="text-primary/70 font-semibold">Explora lo mejor de nuestra tierra: sitios de interés, alojamientos acogedores y gastronomía única</h1>
//             </div>
//             <div className="flex justify-evenly gap-8 flex-wrap">
//               {countAccelerator?.map(count => <AcceleratorCount key={count.title} title={count.title} subtitle={count.subtitle} icon={count.icon} value={count.value} />)}
//             </div>
//           </section>
//           {/* Cta para seguir a vive monterrey */}
//           <section>
//             <div className="flex items-center">

//               <div className="w-2 h-14 bg-[#b91c1c] rounded-fulll">
//               </div>
//               <div className="">
//                 <p className="font-englebert font-bold text-xl leading-3">ELIGE<br />
//                   <span className="font-englebert font-bold text-4xl">Lo que te emociona</span></p>
//               </div>
//             </div>
//             <Slider />
//           </section>
//         </div>
//       </>}