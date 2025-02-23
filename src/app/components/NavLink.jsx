import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const NavLink = ({ href, title }) => {
    return (
        <motion.div
            className="relative"
            whileHover="hover"
            initial="initial"
        >
            <Link
                href={href}
                className="block py-2 pl-3 pr-4 text-[var(--text)] sm:text-xl rounded md:p-0 hover:text-[var(--secondary)]"
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