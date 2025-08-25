'use client'
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ScriptManager() {
  const path = usePathname()
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Elimina strings vacíos del pathname (e.g., "/")
    const pathSegments = path.split('/').filter(Boolean);

    // Mostrar el script solo si hay 2 o menos segmentos de ruta
    setShow(pathSegments.length <= 1);
  }, [path])

  return (
    <>
      {show && (
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              (function(a,m,o,c,r,m){a[m]={id:"1035903",hash:"cb04e816b91dcce78f3d3e4970d3b4165a95994b80b0ac4d9304772a6a471b58",locale:"es",setMeta:function(p){this.params=(this.params||[]).concat([p])}};a[o]=a[o]||function(){(a[o].q=a[o].q||[]).push(arguments)};var d=a.document,s=d.createElement('script');s.async=true;s.id=m+'_script';s.src='https://gso.kommo.com/js/button.js';d.head&&d.head.appendChild(s)}(window,0,'crmPlugin',0,0,'crm_plugin'));
            `
          }}
        />
      )}
    </>
  )
}