import React from "react";
import {FooterStyle} from "@/pages/global/styles/Footer";

export const Footer: React.FC = () => {
    return (
        <FooterStyle>
            <div className="bar">
                <span>created by <b>Digital Rise Dorset</b></span>
                <span>Powered with NextJS framework</span>
            </div>
        </FooterStyle>
    )
}