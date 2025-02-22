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
                    <p className="text-[var(--text)] text-base sm:text-lg mb-6 lg:text-xl">
                        I am a student of Information Technologies and Sciences at Ca&apos; Foscari University in Venice.
                        Driven by curiosity and creativity, I enjoy tackling challenges and exploring new ideas.
                        While coding may not be my greatest strength, I embrace problem-solving with enthusiasm.
                        Beyond tech, I have a passion for photography and stay active through calisthenics.
                    </p>
                    <div>
                        <Link
                            href="/cv.pdf"
                            className="inline-block w-full sm:w-fit rounded-full mr-6 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] hover:bg-slate-200 text-[var(--text)]"
                        >
                              <span className="block hover:bg-[var(--primary)] rounded-full px-6 py-3">
                                Download CV
                              </span>
                        </Link>
                        <Link
                            href="/#contact"
                            className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] hover:bg-slate-800 text-[var(--text)] mt-3"
                        >
                              <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-6 py-2">
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
                    <div className="rounded-full lg:ml-32 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative">
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
