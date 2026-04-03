"use client";
import { SiCplusplus } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaFigma, FaPython, FaReact } from "react-icons/fa";
import Image from "next/image";


const skills = [
    { name: "Figma", level: 85, icon: <FaFigma className="text-xl" /> },
    { name: "C++", level: 75, icon: <SiCplusplus className="text-xl" /> },
    { name: "React", level: 60, icon: <FaReact className="text-xl" /> },
    { name: "Python", level: 50, icon: <FaPython className="text-xl" /> },
    { name: "Next.js", level: 40, icon: <TbBrandNextjs className="text-xl" /> },
];

const TABS = ["skills", "education", "learning"];

const AboutSection = () => {
    const [activeTab, setActiveTab] = useState("skills");
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

    const renderTabContent = () => {
        switch (activeTab) {
            case "skills":
                return (
                    <motion.div
                        key="skills"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35 }}
                        className="space-y-5"
                    >
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.08 }}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3 text-white">
                                        <span style={{ color: "var(--accent)" }}>{skill.icon}</span>
                                        <span className="font-semibold text-base">{skill.name}</span>
                                    </div>
                                    <span className="text-sm font-bold font-mono" style={{ color: "var(--secondary)" }}>
                                        [{skill.level}%]
                                    </span>
                                </div>
                                <div
                                    className="h-2.5 relative overflow-hidden rounded-full"
                                    style={{
                                        background: "var(--primary-lightest)",
                                        border: "1px solid var(--secondary-lightest)",
                                    }}
                                >
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{
                                            background: "linear-gradient(90deg, var(--secondary), var(--accent))",
                                            boxShadow: "0 0 10px var(--accent)",
                                        }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${skill.level}%` }}
                                        transition={{ duration: 1, delay: 0.2 + index * 0.08, ease: "easeOut" }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                );

            case "education":
                return (
                    <motion.div
                        key="education"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35 }}
                        className="space-y-6 text-white"
                    >
                        {[
                            {
                                school: "Ca'Foscari University of Venice",
                                degree: "Bachelor of Science in ICT (2023 – Present)",
                                details: "Data Structures, Algorithms, OOP",
                            },
                            {
                                school: "IIS G.A. Remondini",
                                degree: "Logistics & Transportation (2018 – 2023)",
                                details: "Supply chain management & analytics",
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={item.school}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-3"
                            >
                                <span className="text-xl font-bold mt-0.5" style={{ color: "var(--accent)" }}>{">"}</span>
                                <div>
                                    <div className="font-bold text-lg" style={{ color: "var(--secondary)" }}>
                                        {item.school}
                                    </div>
                                    <div className="text-sm mt-1 font-semibold" style={{ color: "var(--accent)" }}>
                                        {item.degree}
                                    </div>
                                    <div className="text-sm mt-2 opacity-75">→ {item.details}</div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                );

            case "learning":
                return (
                    <motion.div
                        key="learning"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35 }}
                        className="space-y-5 text-white"
                    >
                        {[
                            { name: "Flutter & Dart", desc: "Mobile apps with Riverpod state management" },
                            { name: "Firebase", desc: "Auth, Firestore, cloud storage" },
                            { name: "Next.js", desc: "React, Tailwind CSS, SSR" },
                        ].map((item, index) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-3"
                            >
                                <span className="font-bold font-mono mt-0.5" style={{ color: "var(--accent)" }}>[+]</span>
                                <div>
                                    <div className="font-bold text-base" style={{ color: "var(--secondary)" }}>
                                        {item.name}
                                    </div>
                                    <div className="text-sm mt-1 opacity-75">{item.desc}</div>
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
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
                >
                    {/* Left - Visual placeholder */}
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
                        {/*<Image*/}
                        {/*    /!* Prima o poi capisco cosa metterci *!/*/}
                        {/*/>*/}
                    </motion.div>

                    {/* Right - Content */}
                    <div className="flex flex-col gap-6 lg:min-h-[420px]">
                        <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)]  via-[var(--secondary)]">
                            ABOUT ME
                        </h2>

                        <p className="text-[var(--text)] leading-relaxed text-base lg:text-lg opacity-90">
                            I&apos;m a student of Information Technologies and Sciences at Ca&apos;Foscari University in Venice,
                            currently exploring and experimenting with web and mobile development.<br/>
                            Beyond tech, I have a passion for photography, cinema, music and calisthenics.
                        </p>

                        <div
                            className="flex gap-0 border-b-2 flex-wrap"
                            style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
                        >
                            {TABS.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className="relative pb-3 px-4 font-mono text-sm font-semibold transition-all duration-300 capitalize"
                                    style={{
                                        color: activeTab === tab ? "var(--secondary)" : "rgba(255, 255, 255, 0.4)",
                                    }}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5"
                                            style={{ background: "var(--secondary)" }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="flex-1">
                            <AnimatePresence mode="wait">
                                {renderTabContent()}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;

