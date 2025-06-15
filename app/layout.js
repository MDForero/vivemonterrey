'use client'
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
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
// import { createClient } from "@/utils/supabase/client";





export default function RootLayout({ children }) {

  const path = usePathname()
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Elimina strings vacíos del pathname (e.g., "/")
    const pathSegments = path.split('/').filter(Boolean);

    // Mostrar el script solo si hay 2 o menos segmentos de ruta
    setShow(pathSegments.length <= 1);
    console.log(pathSegments, 'pathSegments', show)
  }, [path])

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
        {show && <Script >
          {`
      (function(a,m,o,c,r,m){a[m]={id:"1035903",hash:"cb04e816b91dcce78f3d3e4970d3b4165a95994b80b0ac4d9304772a6a471b58",locale:"es",setMeta:function(p){this.params=(this.params||[]).concat([p])}};a[o]=a[o]||function(){(a[o].q=a[o].q||[]).push(arguments)};var d=a.document,s=d.createElement('script');s.async=true;s.id=m+'_script';s.src='https://gso.kommo.com/js/button.js';d.head&&d.head.appendChild(s)}(window,0,'crmPlugin',0,0,'crm_plugin'));
          `}
        </Script>
        }       <ReveloLayout>
          {children}
        </ReveloLayout>
      </body>
    </html>
  )
}