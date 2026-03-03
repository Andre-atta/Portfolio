import React from "react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer border z-10 border-[var(--primary)] border-l-transparent border-r-transparent text-[var(--text)]">
            <div className="container-full p-8 sm:p-10 md:p-14 mx-auto text-center md:text-left">
                <p className="text-[var(--text)] text-sm md:text-base">
                    © {currentYear} Andreatta Andrea Francesco Ivo. No rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;