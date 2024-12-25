'use client'
import QRCodeStyling, { TypeNumber, Mode, ErrorCorrectionLevel, Options, } from "qr-code-styling";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";

export default function QrCode({ value, logo }) {

    const ref = useRef(null)
    const [qrCode, setQrCode] = useState(null)
    const [qrCodeImage, setQrCodeImage] = useState(null)
    const supabase = createClient()

    useEffect(() => {
        if (!qrCodeImage) return
        setQrCode(new QRCodeStyling({
            width: 250,
            height: 250,
            type: 'svg',
            data: value,
            image: qrCodeImage,
            margin: 10,
            qrOptions: {
                typeNumber: 0,
                mode: 'Byte',
                errorCorrectionLevel: 'Q'
            },
            imageOptions: {
                hideBackgroundDots: true,
                imageSize: 0.4,
                margin: 0,
            
                crossOrigin: 'anonymous',
                saveAsBlob: true,
            },
            dotsOptions: {
                color: '#222222',
                type: 'rounded' // square, rounded
            },
            backgroundOptions: {
                color: '#ffffff',
            },
        })
        )
    }, [qrCodeImage])

    useEffect(() => {
        const getImage = async () => {
            const { data, error } = await supabase.storage.from('banners').download(logo)
            if (error) {
                console.log(error)
            } else {
                setQrCodeImage(URL.createObjectURL(data))
            }
            console.log(value)
        }
        if (logo) getImage()
    }, [])

    useEffect(() => {
        if (ref.current) {
            qrCode?.append(ref.current);
        }
        console.log(value, qrCode)
    }, [qrCode, ref]);



    return (
        <div ref={ref} className="mx-auto w-fit" /> // This is the div where the QR code will be rendered
    )
}