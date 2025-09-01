"use client";
import EmbedPopup from "@/components/popup/EmbedPopup";
import ImageView from "@/components/popup/ImageView";
import { roveloUtility } from "@/utility";
import { useEffect } from "react";
import niceSelect from "react-nice-select";
import FooterRevelo from "./FooterRovelo";
import NavbarRovelo from "./Navbar-Rovelo";
import { usePathname } from "next/navigation";

const ReveloLayout = ({ children, header, footer, insta, sideBar }) => {
  const pathname = usePathname();

  useEffect(() => {
    roveloUtility.animation();
    roveloUtility.fixedHeader();
  }, []);

  useEffect(() => {
    return () => {
      niceSelect();
    };
  }, []);
  if (pathname.includes("team") || pathname.includes("dashboard")) {
    console.log("Estás en la página del equipo");
    return <div>
      {children}
    </div>
  }
  return (
    <div className={`page-wrapper  for-sidebar-menu `}>
      <EmbedPopup />
      <ImageView />
      <NavbarRovelo />
      {children}
      <FooterRevelo />
    </div>
  );
};
export default ReveloLayout;
