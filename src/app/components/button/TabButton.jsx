import React from "react";
import { motion } from "framer-motion";

const variants = {
    default: { width: 0 },
    active: { width: "calc(100% - 0.75rem)" },
    hover: { width: "calc(100% - 0.75rem)" },
};

const TabButton = ({ active, selectTab, children }) => {
    return (
        <motion.div
            className="relative"
            whileHover="hover"
            initial="initial"
        >
            <button onClick={selectTab}>
                <p className={`mr-3 font-semibold hover:text-[var(--secondary)] ${active ? "text-[var(--secondary)]" : "text-[var(--text)]"}`}>
                    {children}
                </p>
                <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-[var(--primary)] -mb-1"
                    variants={variants}
                    animate={active ? "active" : "default"}
                    transition={{ duration: 0.4 }}
                />
            </button>
        </motion.div>
    );
};

export default TabButton;