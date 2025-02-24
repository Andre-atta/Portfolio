import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const NavLink = ({ href, title, onClick }) => {
    return (
        <motion.div
            className="relative"
            whileHover="hover"
            initial="initial"
        >
            <Link
                href={href}
                className="block py-2 pl-3 pr-4 text-[var(--text)] sm:text-xl rounded md:p-0 hover:text-[var(--secondary)]"
                onClick={(e) => {
                    if (onClick) {
                        e.preventDefault(); // Previene la navigazione se onClick è definito
                        onClick();
                    }
                }}
            >
                {title}
            </Link>
            <motion.div
                className="absolute bottom-0 left-0 h-1 bg-[var(--primary)] -mb-1"
                variants={{
                    initial: { width: 0 },
                    hover: { width: "100%" },
                }}
                transition={{ duration: 0.4 }}
            />
        </motion.div>
    );
};

export default NavLink;