
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
    { name: '¿Que hacer?', url: '/que-hacer' },
    { name: 'Eventos', url: '/eventos' },
    { name: 'Vivir en Monterrey', url: '/vivir-en-monterrey' },
    { name: 'Contacto', url: '/contacto' },
  ]

  return (
    <html lang="es" className={`${asap.variable} ${englebert.variable}`}>
      <body >
        <NavBar links={links} />
        <BackTopButton/>
        <div className="container mx-auto lg:space-y-32 md:space-y-24  space-y-12">
          {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}
