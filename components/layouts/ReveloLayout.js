"use client";
import EmbedPopup from "@/components/popup/EmbedPopup";
import ImageView from "@/components/popup/ImageView";
import { roveloUtility } from "@/utility";
import { useEffect } from "react";
import niceSelect from "react-nice-select";
import FooterRevelo from "./FooterRovelo";
import NavbarRovelo from "./Navbar-Rovelo";
const ReveloLayout = ({ children, header, footer, insta, sideBar }) => {
  useEffect(() => {
    roveloUtility.animation();
    roveloUtility.fixedHeader();
  }, []);

  useEffect(() => {
    return () => {
      niceSelect();
    };
  }, []);

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
