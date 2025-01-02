'use client'
import QRCodeStyling, { TypeNumber, Mode, ErrorCorrectionLevel, Options, } from "qr-code-styling";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "./ui/button";
import { DownloadIcon } from "lucide-react";

export default function QrCode({ value, logo }) {

    const ref = useRef(null)
    const [qrCode, setQrCode] = useState(null)
    const [qrCodeImage, setQrCodeImage] = useState(null)
    const supabase = createClient()

    useEffect(() => {
        if (!qrCodeImage) return
        setQrCode(new QRCodeStyling({
            width: 350,
            height: 350,
            type: 'svg',
            data: value,
            image: qrCodeImage,
            margin: 0,
            qrOptions: {
                typeNumber: 0,
                mode: 'Byte',
                errorCorrectionLevel: 'H'
            },
            backgroundOptions: {
                color: 'transparent',
            },
            imageOptions: {
                hideBackgroundDots: true,
                imageSize: 0.4,
                margin: 2,

                crossOrigin: 'anonymous',
                saveAsBlob: true,
            },
            dotsOptions: {
                color: '#222222',
                type: 'dots' // square, rounded
            },
            cornersSquareOptions: {
                type: 'dot', // square, rounded
                color: '#b91c1c'
            },
            cornersDotOptions: {
                type: 'dot',
                color:'#b91c1c' // square, rounded
            }
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


    const downloadQr = () => {
        qrCode?.download({
            name: `qr-${value}`,
            extension: 'png'
        })
    }

    return (<>
        <div ref={ref} className="mx-auto w-fit" /> 
        <Button type='button' onClick={downloadQr}><DownloadIcon/> Descargar QR </Button>
    </>
    )
}