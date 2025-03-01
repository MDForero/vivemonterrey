
export const metadata = {
    title: "Vive Monterrey",
    description: "Encuentra todo las propiedades que Monterrey Casanare tiene para ofrecerte, desde casas, apartamentos, lotes y fincas.",
    keywords: "Monterrey Casanare, Casas en Monterrey, Apartamentos en Monterrey, Lotes en Monterrey, Fincas en Monterrey",
    image: "/assets/portada-que-hacer.webp",
}
export default function page() {

    return (
        <div className="container mx-auto flex flex-col justify-center space-y-16 items-center bg-gray-50 ">
            <main>
                <img loading="lazy" src='/assets/portada-que-hacer.webp' width={0} height={0} className="w-full h-full" />
            </main>
            <div className=" md:flex flex-col justify-center items-center  font-light">
                <h1 className="text-center text-[#b91c1c] text-pretty text-3xl md:text-4xl lg:text-5xl font-semibold ">¿Qué hacer en Monterrey Casanare?</h1>
                <p className="text-center text-lg md:text-xl  max-w-5xl p-2">Encuentra todo lo que Monterrey Casanare tiene para ofrecerte. En Vive Monterrey podras encontrar toda la información necesaria para disfr</p>
            </div>
        </div>
    )
}