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
import ScriptManager from "@/components/ScriptManager";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";

export const metadata = {
  title: 'Vive Monterrey - Turismo en Casanare',
  description: 'Descubre lo mejor de Monterrey, Casanare. Hoteles, restaurantes, actividades y más en el corazón de los llanos orientales.',
  keywords: 'Monterrey, Casanare, turismo, llanos, Colombia, hoteles, restaurantes',
  authors: [{ name: 'Vive Monterrey' }],
  openGraph: {
    title: 'Vive Monterrey - Turismo en Casanare',
    description: 'Descubre lo mejor de Monterrey, Casanare. Hoteles, restaurantes, actividades y más.',
    type: 'website',
    locale: 'es_CO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vive Monterrey - Turismo en Casanare',
    description: 'Descubre lo mejor de Monterrey, Casanare. Hoteles, restaurantes, actividades y más.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}





export default function RootLayout({ children }) {

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
        `}</Script>
        <ScriptManager />
        <PWAInstallPrompt />
        <ReveloLayout>
          {children}
        </ReveloLayout>
      </body>
    </html>
  )
}