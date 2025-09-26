"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Tile from "@/app/components/ui/Tile";
import RoundedFull from "@/app/components/button/RoundedFull";
import RoundedEmpty from "@/app/components/button/RoundedEmpty";

const HeroSection = () => {
    return (
        <section className="relative w-full min-h-screen overflow-hidden flex justify-center items-center pt-24 sm:pt-32 lg:pt-36">
            <div
                className="absolute inset-0 w-full h-full grid"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))" }}
            >
                {Array.from({ length: 380 }, (_, i) => (
                    <Tile key={i} />
                ))}
            </div>

            <div className="relative z-10 w-full flex justify-center items-center pointer-events-none">
                <div className="mx-auto px-6 sm:px-8 xl:px-12 max-w-screen-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16 lg:gap-24">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="text-center md:text-left px-4 sm:px-8 md:px-0"
                        >
                            <h1 className="mb-8 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-[var(--text)]">
                                <span className="block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display">
                                  Hello, I&apos;m
                                </span>

                                <TypeAnimation
                                    sequence={[
                                        "Andrea...",
                                        1200,
                                        "Francesco...",
                                        1200,
                                        "Ivo...",
                                        1200,
                                        "Confused 🤔",
                                        2500,
                                    ]}
                                    wrapper="span"
                                    speed={50}
                                    repeat={Infinity}
                                    className="text-white"
                                />
                            </h1>

                            <p className="text-[var(--text)] text-lg sm:text-xl lg:text-2xl leading-relaxed mb-10 max-w-prose md:max-w-xl lg:max-w-2xl">
                                Student in <span className="font-bold text-[var(--primary)]">Information Technology</span> at Ca&apos;Foscari,
                                passionate about learning and building. I love exploring ideas
                                hands-on, from coding to design. Outside of tech, I&apos;m into{" "}
                                <span className="italic">photography, music, movies</span> and{" "}
                                <span className="italic">calisthenics</span>.
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-5 pointer-events-auto justify-center md:justify-start">
                                <Link href="/cv.pdf">
                                    <RoundedFull text="Download CV" />
                                </Link>
                                <Link href="/#contact">
                                    <RoundedEmpty text="Hire Me" />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Image Section */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="flex justify-center md:justify-end"
                        >
                            <motion.div
                                className="rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)]
                           w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] lg:w-[420px] lg:h-[420px]
                           relative shadow-2xl"
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Image
                                    src="/images/hero-image.svg"
                                    alt="wizard hero"
                                    className="absolute transform -translate-x-1/2 -translate-y-1/2
                             top-1/2 left-1/2 drop-shadow-xl"
                                    width={340}
                                    height={340}
                                />
                            </motion.div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
