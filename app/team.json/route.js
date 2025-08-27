import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json([
        {
            name: "Diana Sabogal",
            job: "Ingeniera de Sistemas",
            imgProfile: "https://avatars.githubusercontent.com/u/99158883?v=4",
            socials: {
                facebook: "https://www.facebook.com/K.nnis",
                instagram: "https://www.instagram.com/dianitasab27/",
                tiktok: "https://www.tiktok.com/@dianitasabogal27",
            },
            phone: "+573103433298",
            email:'dianac_md@gmail.com',
            website: "https://vivemonterrey.com.co",
            imgBackground: "/assets/users/focus-on-laptop-screen-with-coded-data-and-pen-hel-2025-02-11-15-42-45-utc.jpg"
        },
        {
            name: "Michael Forero", 
            job: "Desarrollador Web",
            imgProfile: "https://avatars.githubusercontent.com/u/55849070?v=4",
            socials: {
                facebook: "https://www.facebook.com/michaeldanielf/",
                instagram: "https://www.instagram.com/michaeldanielf/",
                tiktok: "https://www.tiktok.com/@michaeldanielforero",
                github:"https://github.com/MDForero/",
                linkedin:"https://www.linkedin.com/in/mdforeroro/"
            },
            phone:"+573108854737",
            email:"mforeroroldan@gmail.com",
            website: "https://vivemonterrey.com.co",
            imgBackground: "/assets/users/focus-on-laptop-screen-with-coded-data-and-pen-hel-2025-02-11-15-42-45-utc.jpg"

        },
    ]);
}