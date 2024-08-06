
import { Asap, Englebert } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/layouts/NavBar";
import BackTopButton from "@/components/BackTopButton";
import Footer from "@/components/layouts/Footer";
// import { createClient } from "@/utils/supabase/client";


const englebert = Englebert({
  weight:'400',
  subsets: ["latin"],
  style:'normal',
  display:'swap',
  variable: '--font-englebert',
})

const asap = Asap({
  subsets: ["latin"],
  weights: ['400', '500', '600', '700'],
  variable: '--font-asap',
  display: 'swap',
});

export const metadata = {
  title: "ViveMonterrey.co",
  description: "ViveMonterrey.co es una plataforma que te permite encontrar los mejores lugares para comer, beber y disfrutar en Monterrey.",
};

export default function RootLayout({ children }) {

  const links = [
    { name: 'Inicio', url: '/' },
    { name: 'Nosotros', url: '/nosotros' },
    { name: 'Restaurantes', url: '/restaurantes' },
    { name: 'Hoteles', url: '/hoteles' },
    { name: 'Que hacer?', url: '/turismo' },
    { name: 'Contacto', url: '/contacto' },
  ]

  return (
    <html lang="en" className={`${asap.variable} ${englebert.variable}`}>
      <body >
        <NavBar links={links} />
        <BackTopButton/>
        <div className=" mx-auto space-y-32">
          {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}
