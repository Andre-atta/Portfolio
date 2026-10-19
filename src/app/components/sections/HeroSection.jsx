"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useAnimationControls, useMotionValue, useSpring } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import RoundedFull from "@/app/components/button/RoundedFull";
import RoundedEmpty from "@/app/components/button/RoundedEmpty";
import TerminalWindow from "@/app/components/modal/TerminalWindow";

const HeroSection = () => {
    const prefersReducedMotion = useReducedMotion();
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [flipped, setFlipped] = useState(false);

    const controls = useAnimationControls();
    const flippedRef = useRef(false);   // valore corrente leggibile dall'interval
    const lastActionRef = useRef(0);    // timestamp dell'ultimo flip
    const cardRef = useRef(null);

    // Tilt 3D che segue la posizione del cursore
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { stiffness: 260, damping: 20 };
    const tiltRotateX = useSpring(mouseY, springConfig);
    const tiltRotateY = useSpring(mouseX, springConfig);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const offsetX = (e.clientX - centerX) / (rect.width / 2);
        const offsetY = (e.clientY - centerY) / (rect.height / 2);

        mouseX.set(offsetX * 14);
        mouseY.set(-offsetY * 14);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // flip vero e proprio
    useEffect(() => {
        flippedRef.current = flipped;
        lastActionRef.current = Date.now();
        controls.start({
            rotateY: flipped ? 180 : 0,
            transition: { duration: prefersReducedMotion ? 0 : 0.9, ease: "easeInOut" },
        });
    }, [flipped, controls, prefersReducedMotion]);

    // accenno ogni 7s: piccola oscillazione per suggerire che si può girare
    useEffect(() => {
        if (prefersReducedMotion) return;
        const id = setInterval(() => {
            // salta se l'utente ha appena girato il cerchio
            if (Date.now() - lastActionRef.current < 3000) return;
            const base = flippedRef.current ? 180 : 0;
            controls.start({
                rotateY: [base, base + 18, base - 7, base],
                transition: { duration: 0.8, ease: "easeInOut" },
            });
        }, 7000);
        return () => clearInterval(id);
    }, [controls, prefersReducedMotion]);


    return (
        <section className="relative w-full min-h-screen overflow-hidden flex justify-center items-center pt-20 sm:pt-24 lg:pt-28">
            <div className="relative w-full flex justify-center items-center">
                <div className="mx-auto w-full  px-6 sm:px-8 xl:px-12 max-w-screen-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16 lg:gap-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center md:text-left"
                        >
                            <h1 className="mb-8 text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-[var(--text)]">
                                <span className="block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-display">
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
                                    className="text-[var(--text)]"
                                />
                            </h1>

                            <p className="text-[var(--text)] text-lg sm:text-xl lg:text-2xl leading-relaxed mb-6 max-w-prose md:max-w-xl lg:max-w-2xl">
                                Building things for the web. <br/>
                                Building things for me. <br/>
                                <span
                                    onClick={() => setIsVideoOpen(true)}
                                    className="inline-flex cursor-default"
                                >
                                    {"Bob the builder".split("").map((char, index) => (
                                        <motion.span
                                            key={index}
                                            className="inline-block"
                                            animate={prefersReducedMotion ? undefined : {
                                                scale: [1, 1, 1.25, 1, 1],
                                                y: [0, 0, -2, 0, 0]
                                            }}
                                            transition={prefersReducedMotion ? undefined : {
                                                duration: 12,
                                                repeat: Infinity,
                                                delay: index * 0.05,
                                                times: [0, 0.85, 0.88, 0.91, 1],
                                                ease: "easeInOut"
                                            }}
                                        >
                                            {char === " " ? "\u00A0" : char}
                                        </motion.span>
                                    ))}
                                </span> is my mentor._.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
                                <Link href="/CV_Andrea_Andreatta.pdf">
                                    <RoundedFull text="Download CV" />
                                </Link>
                                <Link href="#contact">
                                    <RoundedEmpty text="Hire Me" />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Image Section — responsive sizing */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="flex justify-center md:justify-end"
                        >
                            {/* Livello 1: floating verticale isolato */}
                            <motion.div
                                className="[perspective:1000px]"
                                animate={prefersReducedMotion ? undefined : { y: [0, -20, 0] }}
                                transition={prefersReducedMotion ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            >
                                {/* Livello 2: interazione cursore, tilt 3D e hover/tap */}
                                <motion.div
                                    ref={cardRef}
                                    className="relative rounded-full shadow-2xl cursor-pointer
                                               w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] lg:w-[420px] lg:h-[420px]"
                                    style={{
                                        rotateX: tiltRotateX,
                                        rotateY: tiltRotateY,
                                        transformStyle: "preserve-3d",
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.97 }}
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => setFlipped((f) => !f)}
                                >
                                    {/* Livello 3: rotazione 180 flip e accenno periodico (controls) */}
                                    <motion.div
                                        className="relative size-full [transform-style:preserve-3d]"
                                        initial={{ rotateY: 0 }}
                                        animate={controls}
                                    >
                                        {/* fronte: mago (girato a sinistra verso il testo) */}
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] [backface-visibility:hidden]">
                                            <Image
                                                src="/images/hero-image.svg"
                                                alt="wizard hero"
                                                width={340}
                                                height={340}
                                                priority
                                                fetchPriority="high"
                                                loading="eager"
                                                className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 drop-shadow-xl -scale-x-100"
                                            />
                                        </div>
                                        {/* retro: pixel art in b/n su sfondo gradiente identico al mago */}
                                        <div className="absolute inset-0 rounded-full overflow-hidden isolate bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                                            <Image
                                                src="/images/me.png"
                                                alt="Ivo"
                                                fill
                                                sizes="(min-width: 1024px) 420px, (min-width: 640px) 300px, 220px"
                                                className="object-cover drop-shadow-xl"
                                            />
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Video Modal Overlay */}
            {isVideoOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={() => setIsVideoOpen(false)}
                >
                    <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
                        <TerminalWindow title="bob.mp4" onClose={() => setIsVideoOpen(false)}>
                            <div className="relative w-full aspect-video">
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full rounded-md"
                                    src="https://www.youtube.com/embed/daVKiNdfCu4?autoplay=1"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </TerminalWindow>
                    </div>
                </div>
            )}
        </section>
    );
};

export default HeroSection;
