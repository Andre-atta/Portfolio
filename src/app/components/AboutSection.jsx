"use client";
import { SiCplusplus } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaFigma, FaPython, FaReact } from "react-icons/fa";
import dynamic from "next/dynamic";


// Skills data
const skills = [
    { name: "Figma", level: 85, icon: <FaFigma className="text-xl" /> },
    { name: "C++", level: 75, icon: <SiCplusplus className="text-xl" /> },
    { name: "React", level: 60, icon: <FaReact className="text-xl" /> },
    { name: "Python", level: 50, icon: <FaPython className="text-xl" /> },
    { name: "Next.js", level: 40, icon: <TbBrandNextjs className="text-xl" /> },
];

// Dynamic imports for widgets
const SpotifyWidget = dynamic(() => import("./widgets/SpotifyWidget"), {
    loading: () => (
        <div className="w-full h-48 rounded-2xl bg-white/5 animate-pulse" />
    ),
    ssr: false,
});
const LetterboxdWidget = dynamic(() => import("./widgets/LetterboxdWidget"), {
    loading: () => (
        <div className="w-full h-64 rounded-2xl bg-white/5 animate-pulse" />
    ),
    ssr: false,
});

// Main About Section
const AboutSection = () => {
    const [activeTab, setActiveTab] = useState("skills");
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

    const isDeveloperMode = ["skills", "education", "learning"].includes(activeTab);

    // Developer Mode Content
    const renderDeveloperContent = () => {
        switch(activeTab) {
            case "skills":
                return (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-5"
                    >
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="skill-item"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3 text-white">
                                        <span style={{ color: 'var(--accent)' }}>{skill.icon}</span>
                                        <span className="font-semibold text-base">{skill.name}</span>
                                    </div>
                                    <span className="text-sm font-bold" style={{ color: 'var(--secondary)' }}>
                                        [{skill.level}%]
                                    </span>
                                </div>
                                <div className="h-2.5 relative overflow-hidden rounded-full" style={{
                                    background: 'rgba(75, 0, 130, 0.3)',
                                    border: '1px solid rgba(255, 0, 110, 0.3)'
                                }}>
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{
                                            background: `linear-gradient(90deg, var(--secondary), var(--accent))`,
                                            boxShadow: '0 0 10px var(--accent)'
                                        }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${skill.level}%` }}
                                        transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                );
            case "education":
                return (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6 text-white"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-start gap-3"
                        >
                            <span className="text-xl font-bold" style={{ color: 'var(--accent)' }}>{'>'}</span>
                            <div>
                                <div className="font-bold text-lg" style={{ color: 'var(--secondary)' }}>
                                    Ca&apos;Foscari University of Venice
                                </div>
                                <div className="text-sm mt-1 font-semibold" style={{ color: 'var(--accent)' }}>
                                    Bachelor of Science in ICT (2023 - Present)
                                </div>
                                <div className="text-sm mt-2 opacity-90">
                                    → Data Structures, Algorithms, OOP
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex items-start gap-3"
                        >
                            <span className="text-xl font-bold" style={{ color: 'var(--accent)' }}>{'>'}</span>
                            <div>
                                <div className="font-bold text-lg" style={{ color: 'var(--secondary)' }}>
                                    IIS G.A. Remondini
                                </div>
                                <div className="text-sm mt-1 font-semibold" style={{ color: 'var(--accent)' }}>
                                    Logistics & Transportation (2018 - 2023)
                                </div>
                                <div className="text-sm mt-2 opacity-90">
                                    → Supply chain management & analytics
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                );
            case "learning":
                return (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-5 text-white"
                    >
                        {[
                            { name: 'Flutter & Dart', desc: 'Mobile apps with Riverpod state management' },
                            { name: 'Firebase', desc: 'Auth, Firestore, cloud storage' },
                            { name: 'Next.js', desc: 'React, Tailwind CSS, SSR' }
                        ].map((item, index) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-3"
                            >
                                <span className="text-xl font-bold" style={{ color: 'var(--accent)' }}>{'[+]'}</span>
                                <div>
                                    <div className="font-bold text-base" style={{ color: 'var(--secondary)' }}>
                                        {item.name}
                                    </div>
                                    <div className="text-sm mt-1 opacity-90">{item.desc}</div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen overflow-hidden flex items-center pt-20 sm:pt-24 lg:pt-28 pb-10"
            id="about"
        >

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

                {/* Content Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
                >
                    {/* Left - Visual */}
                    <AnimatePresence mode="wait">
                        {isDeveloperMode ? (
                            <motion.div
                                key="dev-visual"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                                className="relative rounded-2xl overflow-hidden aspect-square lg:aspect-auto lg:min-h-[500px]"
                                style={{
                                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                }}
                            >
                            </motion.div>
                        ) : (
                            <motion.div
                                key="human-visual"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                                className="relative flex justify-center lg:justify-start"
                            >
                                <div className="w-full">
                                    <LetterboxdWidget />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Right - Content */}
                    <div className="flex flex-col gap-6 lg:min-h-[500px]">
                        {/* Bio */}
                        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] font-display">
                            <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] font-display">{'>>'}
                            </span> About_Me
                        </h2>
                        <AnimatePresence mode="wait">
                            {isDeveloperMode ? (
                                <motion.div
                                    key="dev-bio"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="text-[var(--text)] leading-relaxed space-y-4"
                                >
                                    <p className="text-base lg:text-lg">
                                        I&apos;m a student of Information Technologies and Sciences at Ca&apos;Foscari University in Venice.
                                        I enjoy experimenting with web and mobile apps, building small projects, and learning by doing.
                                    </p>
                                    <p className="text-base lg:text-lg">
                                        Beyond tech, I have a passion for photography, cinema, music and calisthenics.
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="human-bio"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="text-[var(--text)] leading-relaxed"
                                >
                                    <p className="text-base lg:text-lg mb-6">
                                        <span className="font-bold text-xl" style={{ color: 'var(--accent)' }}>{'>> '}</span>
                                        When I&apos;m not coding, I&apos;m capturing moments through my lens, discovering new music,
                                        watching films, or training calisthenics. These passions fuel my creativity and keep me balanced.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Tabs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex gap-0 border-b-2 flex-wrap"
                            style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                        >
                            {['skills', 'education', 'learning'].map((tab) => ( //temporaneamente tolto human va sistemato
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className="relative pb-3 px-4 font-mono text-sm font-semibold transition-all duration-300 capitalize"
                                    style={{
                                        color: activeTab === tab ? 'var(--secondary)' : 'rgba(255, 255, 255, 0.5)'
                                    }}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5"
                                            style={{ background: 'var(--secondary)' }}
                                        />
                                    )}
                                </button>
                            ))}
                        </motion.div>

                        {/* Tab Content */}
                        <AnimatePresence mode="wait">
                            {isDeveloperMode ? (
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="flex-1"
                                >
                                    {renderDeveloperContent()}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="human-content"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-5 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8 auto-rows-max"
                                >
                                    <LetterboxdWidget />
                                    <SpotifyWidget />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;