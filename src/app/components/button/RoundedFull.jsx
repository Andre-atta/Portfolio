import React from "react";
import { motion } from "framer-motion";

const RoundedFull = ({ text, onClick }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block w-full rounded-xl mr-6
                 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)]
                 text-[var(--text)] px-8 py-3 text-sm font-semibold
                 shadow-lg hover:shadow-[0_0_15px_var(--primary)]
                 transition-all duration-300"
            onClick={onClick}
        >
            {text}
        </motion.button>
    );
};

export default RoundedFull;