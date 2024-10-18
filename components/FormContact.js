'use client'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "./ui/textarea"
import action from "@/app/contacto/action"
import { useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"

export const description =
    "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account"

export function FormContact() {

    const [recaptcha, setRecaptcha] = useState(null)

    const handleReCaptchaChange = (token) => {
        setRecaptcha(token)
        alert("Captcha value:", token)
    }
    return (

        <Card className="mx-auto max-w-2xl w-full">
            <CardHeader>
                <CardTitle className="text-xl">Contáctenos  </CardTitle>

            </CardHeader>
            <CardContent>
                <form action="#" method="POST" className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input type="hidden" name="recaptcha" value={recaptcha} />
                        <div className="grid gap-2 col-span-2">
                            <Label htmlFor="name">Nombre</Label>
                            <Input id="name" name='name' placeholder="Juan Perez" required />
                        </div>
                        <div className="grid gap-2 col-span-2">
                            <Label htmlFor="tel">Teléfono</Label>
                            <Input id="tel" type='tel' name='tel' placeholder="310 XXX XXXX" required className='w-96' />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name='email'
                            type="email"
                            placeholder="m@example.com"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="message">Mensaje</Label>
                        <Textarea name='message' placeholder="Aquí puedes dejar tus sugerencias, inquietudes y demás." id="message" className='h-1/2' />
                    </div>
                    <ReCAPTCHA
                        sitekey="6LdohWQqAAAAAEgx2NgQO-AqevtV0dZwPSVt4Av2"
                        onChange={handleReCaptchaChange}
                        className="mx-auto"
                    />
                    <Button formAction={action} className="w-full bg-[#b91c1c]">
                        Contactar
                    </Button>
                </form>
            </CardContent>
        </Card>

    )
}
