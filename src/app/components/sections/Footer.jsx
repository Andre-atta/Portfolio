import React from "react";
import GlowBlob from "@/app/components/ui/GlowBlob";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer overflow-b-hidden border-t z-10 border-[var(--primary)] border-l-transparent border-r-transparent text-[var(--text)]">
            <div className="container-full relative z-10 p-4 sm:p-8 md:p-12 mx-auto text-center">
            <GlowBlob className="hidden md:flex absolute -top-1/2 "/>
                <p className="text-[var(--text)] text-sm md:text-base">
                    © {currentYear} Andreatta Andrea Francesco Ivo. No rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;