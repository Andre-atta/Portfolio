import React, {useState} from "react";
import Link from "next/link";
import {motion} from "framer-motion";
import Stu from "../icons/Stu.svg";
import NoStu from "../icons/NoStu.svg";

/**
 * Pill (Alien Spaceship) Component con hover effect
 * @param {Object} props
 * @param {JSX.Element} props.logo - Logo da mostrare nel cockpit in hover
 * @param {string} props.link - URL da aprire al click
 * @param {string} [props.color] - Colore navicella (default: var(--secondary))
 */
const Pill = ({logo, link, color = "var(--secondary)"}) => {
    const [hovered, setHovered] = useState(false);

    const Wrapper = ({children}) =>
        link && typeof link === "string" && link.trim() !== "" ? (
            <Link href={link} passHref legacyBehavior>
                <a
                    className="group block relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 cursor-pointer transition-transform duration-300 ease-in-out active:scale-95"
                    style={{WebkitTapHighlightColor: "transparent"}}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    {children}
                </a>
            </Link>
        ) : (
            <span
                className="group block relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 cursor-not-allowed opacity-60"
                aria-label="Spaceship (no link)"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
        {children}
      </span>
        );

    return (
        <Wrapper>
            <div className="relative w-full h-full">
                <div className="absolute inset-0 transition-opacity duration-300">
                    <motion.div
                        className="w-full h-full"
                        animate={{y: [0, -12, 0]}}
                        transition={{duration: 3, repeat: Infinity, ease: "easeInOut"}}
                        style={{position: 'relative'}}
                    >
                        {hovered ? (
                            <NoStu className="w-full h-full transition-all duration-500 ease-in-out z-0" style={{color}}/>
                        ) : (
                            <Stu className="w-full h-full transition-all duration-500 ease-in-out z-0" style={{color}}/>
                        )}
                        {hovered && logo && (
                            <div
                                className="absolute flex items-center justify-center w-[20%] h-[20%] z-1 transition-all duration-500 ease-in-out"
                                style={{
                                    left: '47%',
                                    top: '20%',
                                    transform: 'translate(-50%, -50%)',
                                    color: color,
                                }}
                            >
                                {logo}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Pill;