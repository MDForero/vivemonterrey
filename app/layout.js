'use client'
import { Asap, Englebert } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/layouts/NavBar";
import BackTopButton from "@/components/BackTopButton";
import Footer from "@/components/layouts/Footer";
import { usePathname } from "next/navigation";
import Script from "next/script";
// import { createClient } from "@/utils/supabase/client";



const englebert = Englebert({
  weight: '400',
  subsets: ["latin"],
  style: 'normal',
  display: 'swap',
  variable: '--font-englebert',
})

const asap = Asap({
  subsets: ["latin"],
  weights: ['400', '500', '600', '700'],
  variable: '--font-asap',
  display: 'swap',
});



export default function RootLayout({ children }) {

  const path = usePathname()


  const links = [
    { name: 'Inicio', url: '/' },
    { name: '¿Que hacer?', url: '/que-hacer' },
    { name: 'Eventos', url: '/eventos' },
    { name: 'Vivir en Monterrey', url: '/vivir-en-monterrey' },
    { name: 'Contacto', url: '/contacto' },
  ]
  if (!['dashboard', 'login', 'ordenar', 'menu', 'enlaces'].find(element => path.split('/').includes(element))) {
    return (
      <html lang="es" className={`${asap.variable} ${englebert.variable}`}>
        <body >
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-YGH8LGGZGH" />
          <Script id="google-analytics">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-YGH8LGGZGH');
        `}
          </Script>

          <NavBar links={links} />
          <BackTopButton />
          <div className="container mx-auto lg:space-y-52 md:space-y-24  space-y-12 mb-20">
            {children}
          </div>
          <Footer />
        </body>
      </html>
    );
  } else {
    return (
      <html lang="es" className={`${asap.variable} ${englebert.variable}`}>
        <body >
          <div className="container mx-auto lg:space-y-32 md:space-y-24  space-y-12">
            {children}
          </div>
        </body>
      </html>
    );
  }
}
