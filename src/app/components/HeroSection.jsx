"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import RoundedFull from "@/app/components/button/RoundedFull"; // Importa RoundedFull
import RoundedEmpty from "@/app/components/button/RoundedEmpty"; // Importa RoundedEmpty

const HeroSection = () => {
    return (
        <section className="lg:py-16">
            <div className="grid grid-cols-1 sm:grid-cols-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
                >
                    <h1 className="text-[var(--text)] mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                          Hello, I&apos;m{" "}
                        </span>
                        <br/>
                        <TypeAnimation
                            sequence={[
                                "Andrea...",
                                1000,
                                "Francesco...",
                                1000,
                                "Ivo...",
                                1000,
                                "Confused",
                                3000,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        />
                    </h1>
                    <p className="text-[var(--text)] text-base sm:text-lg mb-6 lg:text-xl max-w-prose md:max-w-2xl lg:max-w-4xl text-justify mx-auto sm:mx-0">
                        I am a student of Information Technologies and Sciences at Ca&apos; Foscari University in Venice.
                        Driven by curiosity and creativity, I enjoy tackling challenges and exploring new ideas.
                        While coding may not be my greatest strength, I embrace problem-solving with enthusiasm.
                        Beyond tech, I have a passion for photography and stay active through calisthenics.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/cv.pdf">
                            <RoundedFull text="Download CV" />
                        </Link>
                        <Link href="/#contact">
                            <RoundedEmpty text="Hire Me" />
                        </Link>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="col-span-4 place-self-center mt-8 sm:mt-4 lg:mt-0"
                >
                    <div className="rounded-full lg:ml-32 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[400px] lg:h-[400px] relative">
                        <Image
                            src="/images/hero-image.svg"
                            alt="hero image"
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            width={300}
                            height={300}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;