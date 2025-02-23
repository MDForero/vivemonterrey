import { Asap, Englebert } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/layouts/NavBar";
import BackTopButton from "@/components/BackTopButton";
import Footer from "@/components/layouts/Footer";
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

  const links = [
    { name: 'Inicio', url: '/' },
    { name: '¿Que hacer?', url: '/que-hacer' },
    { name: 'Eventos', url: '/eventos' },
    { name: 'Vivir en Monterrey', url: '/vivir-en-monterrey' },
    { name: 'Contacto', url: '/contacto' },
  ]

  return (
    <html lang="es" className={`${asap.variable} ${englebert.variable}`}>
      <body >
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-M2MJPJS6N6" />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-M2MJPJS6N6');
        `}
        </Script>

        <NavBar links={links} />
        <BackTopButton />
        <div className="container mx-auto lg:space-y-8 md:space-y-6  space-y-2 mb-20">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
