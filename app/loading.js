import Image from "next/image";

export default function loading () {
    return <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-white ">
        <Image src='/loading.gif' width={100} height={100} alt="imagen de carga" loading="lazy"/>
    </div>
}