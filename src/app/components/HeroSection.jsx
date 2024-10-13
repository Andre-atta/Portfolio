"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

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
                    <h1 className="text-text mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">
                        <span className="text-primary bg-clip-text">
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
                    <p className="text-text text-base sm:text-lg mb-6 lg:text-xl">
                        I am a student of Information Technologies and Sciences at Ca&apos; Foscari University in Venice.
                        With a passion for coding and a keen interest in data analysis, I am eager to apply my skills in dynamic
                        projects and contribute to the evolving tech landscape.
                    </p>
                    <div>
                        <Link
                            href="/cv.pdf"
                            className="px-1 inline-block mr-5 py-1 w-full sm:w-fit rounded-full bg-primary text-secondary mt-3"
                        >
                              <span className="block hover:bg-slate-800 rounded-full px-5 py-2">
                                Download CV
                              </span>
                        </Link>
                        <Link
                            href="/#contact"
                            className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-primary text-secondary mt-3"
                        >
                            <span className="block hover:bg-slate-800 rounded-full px-5 py-2">
                                Hire Me
                            </span>
                        </Link>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="col-span-4 place-self-center mt-4 lg:mt-0"
                >
                    <div className="rounded-full bg-foreground w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative">
                        <Image
                            src="/images/hero-image.png"
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
