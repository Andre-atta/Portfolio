import React from "react";
import { motion } from "framer-motion";

const RoundedEmpty = ({ text, onClick, children }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block w-full rounded-xl
                 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)]
                 p-[2px] shadow-md hover:shadow-[0_0_12px_var(--secondary)]
                 transition-all duration-300"
            onClick={onClick}
        >
      <span className="bg-[var(--background)] rounded-xl text-sm px-6 py-2 flex items-center justify-center w-full text-[var(--text)] font-semibold">
        {children &&
            <span className="mr-3">
                {children}
            </span>
        }
          {text}
      </span>
        </motion.button>
    );
};

export default RoundedEmpty;