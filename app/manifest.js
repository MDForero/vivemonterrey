import { description } from "@/components/FormContact";

export default function manifest() {


  return {
    name: "Vive Monterrey",
    short_name: "MonterreyApp",
    description: "Vive Monterrey es una plataforma que te ayuda a encontrar eventos, actividades y lugares para visitar en Monterrey.",
    start_url: "/",
    scope: "/",
    lang: "es",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone"
  }
}