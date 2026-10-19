"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const SocialTile = ({ social, isPulsing, className = "" }) => {
    const [isRevealed, setIsRevealed] = useState(false);

    const handleClick = () => {
        if (social?.link) {
            window.open(social.link, '_blank', 'noopener,noreferrer');
        }
    };

    const isSocial = social?.link && social?.logo;

    return (
        <motion.div
            onClick={handleClick}
            onHoverStart={() => isSocial && setIsRevealed(true)}
            onHoverEnd={() => setIsRevealed(false)}
            whileHover={isSocial ? {
                scale: 1.1,
                zIndex: 10,
            } : {}}
            whileTap={isSocial ? {
                scale: 0.95,
            } : {}}
            animate={{
                backgroundColor: (isPulsing && isSocial) || isRevealed
                    ? social.color
                    : "rgba(0, 0, 0, 0.3)",
                borderColor: (isPulsing && isSocial) || isRevealed
                    ? social.color
                    : "rgba(75, 0, 130, 0.3)",
            }}
            transition={{
                duration: 0.3,
                ease: "easeOut",
            }}
            className={`aspect-square border flex items-center justify-center ${
                isSocial ? 'cursor-pointer' : ''
            } ${className}`}
            style={{
                boxShadow: ((isPulsing && isSocial) || isRevealed)
                    ? `0 0 20px ${social.color}80, inset 0 0 20px ${social.color}40`
                    : 'none',
            }}
        >
            {isSocial && ((isPulsing && isSocial) || isRevealed) && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                    className="w-8 h-8 sm:w-10 sm:h-10"
                >
                    {social.logo}
                </motion.div>
            )}
        </motion.div>
    );
};

export default SocialTile;