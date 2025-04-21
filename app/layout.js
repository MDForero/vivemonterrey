import "@css/aos.css";
import "@css/bootstrap.min.css";
import "@css/flaticon.min.css";
import "@css/fontawesome-5.14.0.min.css";
import "@css/magnific-popup.min.css";
import "@css/nice-select.min.css";
import "@css/slick.min.css";
import "./globals.css";
import "@css/style.css";
import Script from "next/script";
import ReveloLayout from "@/components/layouts/ReveloLayout";
// import { createClient } from "@/utils/supabase/client";





export default function RootLayout({ children }) {

  const links = [
    { name: 'Inicio', url: '/' },
    { name: '¿Que hacer?', url: '/que-hacer' },
    { name: 'Eventos', url: '/eventos' },
    { name: 'Vivir en Monterrey', url: '/vivir-en-monterrey' },
    { name: 'Contacto', url: '/contacto' },
  ]

  return (
    <html lang="es" className={``}>
      <head>
        <meta name="apple-mobile-web-app-title" content="Monterrey" />
      </head>
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

        <ReveloLayout>
          {children}
        </ReveloLayout>
      </body>
    </html>
  )
}
