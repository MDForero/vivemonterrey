"use client";
import Link from "next/link";
import { Fragment, use, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { usePathname } from "next/navigation";


export default function NavbarRovelo() {

    const supabase = createClient()
    const path = usePathname()

    const links = [
        { name: 'Inicio', url: '/' },
        { name: '¿Que hacer?', url: '/que-hacer' },
        { name: 'Eventos', url: '/eventos' },
        { name: 'Vivir en Monterrey', url: '/vivir-en-monterrey' },
    ]

    const socialAccounts = [
        { name: 'Facebook', url: 'https://www.facebook.com/vivemonterrey.com.co/', icon: 'fab fa-facebook-f' },
        { name: 'Instagram', url: 'https://www.instagram.com/vivemonterrey.com.co/', icon: 'fab fa-instagram' },
        { name: 'TikTok', url: 'https://www.tiktok.com/@vivemonterrey.com.co', icon: 'fab fa-tiktok' },
        { name: 'YouTube', url: 'https://www.youtube.com/@vivemonterreyCO', icon: 'fab fa-youtube' },
    ];
    

    const [activeMenu, setActiveMenu] = useState("");
    const [multiMenu, setMultiMenu] = useState("");
    const [categories, setCategories] = useState(null)



    const sidebarClick = () => {
        document.querySelector("body").classList.toggle("side-content-visible");
    }

    const closeSidebar = () => {
        document.querySelector("body").classList.remove("side-content-visible");
    }

    useEffect(() => {
        async function getCategory() {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
            if (data) {
                setCategories(data)
            } else {
                console.log('Error fetching categories:', error)
            }
        }
        getCategory()
    }, [])

    useEffect(() => {
        closeSidebar()
    }, [path])

    const activeMenuSet = (value) =>
        setActiveMenu(activeMenu === value ? "" : value),
        activeLi = (value) =>
            value === activeMenu ? { display: "block" } : { display: "none" };

    const multiMenuSet = (value) =>
        setMultiMenu(multiMenu === value ? "" : value),
        multiMenuActiveLi = (value) =>
            value === multiMenu ? { display: "block" } : { display: "none" };

    return (
        <Fragment>
            <header className="main-header header-two">
                {/*Header-Upper*/}
                <div className="header-upper">
                    <div className="container-fluid clearfix">
                        <div className="header-inner rel d-flex align-items-center justify-content-between">
                            <div className="logo-outer d-block">
                                <div className="logo">
                                    <Link href="/">
                                        <Image loading='lazy' src="/assets/images/logos/logo-two.png" className="w-full" alt="Logo" title="Logo" width={0} height={0} />
                                    </Link>
                                </div>
                            </div>
                            {/* Menu Button */}
                            <div className="menu-btns py-10">
                                {/* menu sidbar */}
                                <div className="menu-sidebar" onClick={() => sidebarClick()}>
                                    <button className="bg-transparent">
                                        <span className="icon-bar" />
                                        <span className="icon-bar" />
                                        <span className="icon-bar" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*End Header Upper*/}
            </header>
            <section className="hidden-bar">
                <div className="inner-box">
                    <div className="cross-icon" onClick={() => sidebarClick()}>
                        <span className="fal fa-times" />
                    </div>
                    <div className="logo text-lg-center">
                        <Link href="/">
                            <Image loading='lazy' src="/assets/images/logos/logo-two.png" alt="Logo" width={0} height={0} className="w-full" />
                        </Link>
                    </div>
                    <hr className="my-40" />
                    <ul className="sidebar-menu">
                        {links.map((link, index) => <li key={link.name}>
                            <Link href={link.url}>
                                {link.name}
                            </Link>
                        </li>)}
                        {categories &&
                            <li className="dropdown">
                                <a href="#" onClick={() => activeMenuSet("Pages")}>
                                    Categorías
                                </a>
                                <ul style={activeLi("Pages")}>
                                    {categories?.map((category, index) => <li key={index}>
                                        <Link href={`/${category?.name?.split(' ').join('-')}`}>{category.name}</Link>
                                    </li>)}
                                </ul>
                                <div className="dropdown-btn" onClick={() => activeMenuSet("Pages")}
                                >
                                    <span className="far fa-angle-down" />
                                </div>
                            </li>
                        }
                        <li>
                            <Link href="/contacto">
                                Contacto
                            </Link>
                        </li>
                    </ul>
                    {/* <Link href="contact" className="theme-btn style-two style-three mt-15 mb-55">
                        <span data-hover="Book Now">Book Now</span>
                        <i className="fal fa-arrow-right" />
                    </Link> */}
                    <hr className="mb-65" />
                    <h6>Redes Sociales</h6>
                    {/*Social Icons*/}
                    <div className="social-style-two mt-10">
                        {socialAccounts.map(social =><Link key={social.name} href={social.url}>
                            <i className={social.icon} />
                        </Link>)}
                    </div>
                </div>
            </section>

            <div className="form-back-drop" onClick={() => sidebarClick()} />
        </Fragment>
    );
};
