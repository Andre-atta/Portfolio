import { motion } from "framer-motion"

const Tile = ({ className = "" }) => {
    return (
        <motion.div
            whileHover={{
                zIndex: 1,
                backgroundColor: "#7c3aed",
            }}
            whileTap={{
                scale: 1.2,
                backgroundColor: "var(--primary)"
            }}

            transition={{
                duration: 0.3,
                ease: "easeOut",
            }}
            className={`aspect-square bg-background border border-neutral-950 ${className}`}
        />
    )
}

export default Tile
