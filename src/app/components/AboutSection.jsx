"use client";
import Link from 'next/link';
import Pill from "@/app/components/button/Pill";
import SpotifyIcon from "./icons/spotify-icon.svg";
import LetterboxdIcon from "./icons/letterboxd-icon.svg";
import InstagramIcon from "./icons/instagram-icon.svg";
import { SiFlutter, SiCplusplus } from "react-icons/si";
import { FaFigma, FaJava, FaReact } from "react-icons/fa";
import React, { useState, useRef, useEffect } from "react";
import StarryBackground from "./ui/StarryBackground";

const spaceshipPositions = [
    { top: '10%', left: '5%', size: 'w-20 h-20 sm:w-24 sm:h-24', z: 20 },
    { top: '20%', left: '80%', size: 'w-16 h-16 sm:w-20 sm:h-20', z: 20 },
    { top: '70%', left: '10%', size: 'w-16 h-16 sm:w-20 sm:h-20', z: 20 },
    { top: '60%', left: '70%', size: 'w-14 h-14 sm:w-16 sm:h-16', z: 10 },
    { top: '40%', left: '50%', size: 'w-12 h-12 sm:w-14 sm:h-14', z: 10 },
];

const spaceships = [
    { logo: <SpotifyIcon className="w-full h-full" />, link: "https://open.spotify.com/user/vgjmmtcjkole4pkx5n11wi6nc?si=938d5eaac1da4aeb", color: "#1DB954" },
    { logo: <LetterboxdIcon className="w-full h-full" />, link: "https://boxd.it/7DcNB", color: "#00D735" },
    { logo: <InstagramIcon className="w-full h-full" />, link: "https://www.instagram.com/andre__atta/", color: "#E1306C" },
    { logo: null, link: null, color: "var(--secondary)" },
    { logo: null, link: null, color: "var(--accent)" },
];

const skills = [
    { name: "Figma", level: 85, icon: <FaFigma className="text-xl" /> },
    { name: "C++", level: 75, icon: <SiCplusplus className="text-xl" /> },
    { name: "Java", level: 50, icon: <FaJava className="text-xl" /> },
    { name: "Flutter", level: 30, icon: <SiFlutter className="text-xl" /> },
    { name: "Next.js", level: 30, icon: <FaReact className="text-xl" /> },
];

const TerminalWindow = ({ title, children, delay = 0, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div
            className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${className}`}
            style={{
                background: 'rgba(0, 0, 0, 0.8)',
                border: '2px solid var(--primary)',
                borderRadius: '8px',
                boxShadow: '0 0 20px rgba(var(--primary-rgb), 0.3), inset 0 0 20px rgba(var(--primary-rgb), 0.1)',
            }}
        >
            <div
                className="flex items-center justify-between px-4 py-2 border-b-2"
                style={{ borderColor: 'var(--secondary)', background: 'rgba(75, 0, 130, 0.3)' }}
            >
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm font-mono font-bold" style={{ color: 'var(--accent)', textShadow: '0 0 8px var(--accent)' }}>
                    {title}
                </span>
                <div className="w-3 h-3"></div>
            </div>
            <div className="p-4 font-mono">
                {children}
            </div>
        </div>
    );
};

const AboutSection = () => {
    const [activeTab, setActiveTab] = useState("skills");

    const renderContent = () => {
        switch(activeTab) {
            case "skills":
                return (
                    <div className="space-y-4">
                        {skills.map((skill, index) => (
                            <div key={skill.name} className="skill-item" style={{ animationDelay: `${index * 100}ms` }}>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3 text-white">
                                        <span style={{ color: 'var(--accent)' }}>{skill.icon}</span>
                                        <span className="font-semibold text-base">{skill.name}</span>
                                    </div>
                                    <span className="text-sm font-bold" style={{ color: 'var(--secondary)' }}>[{skill.level}%]</span>
                                </div>
                                <div className="h-2 relative overflow-hidden rounded" style={{
                                    background: 'rgba(75, 0, 130, 0.4)',
                                    border: '1px solid var(--secondary)'
                                }}>
                                    <div className="h-full transition-all duration-1000 ease-out" style={{
                                        width: `${skill.level}%`,
                                        background: `linear-gradient(90deg, var(--secondary), var(--accent))`,
                                        boxShadow: '0 0 10px var(--accent)'
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case "education":
                return (
                    <div className="space-y-5 text-white">
                        <div className="flex items-start gap-3">
                            <span className="text-lg font-bold" style={{ color: 'var(--accent)' }}>{'>'}</span>
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
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-lg font-bold" style={{ color: 'var(--accent)' }}>{'>'}</span>
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
                        </div>
                    </div>
                );
            case "learning":
                return (
                    <div className="space-y-4 text-white">
                        {[
                            { name: 'Flutter & Dart', desc: 'Mobile apps with Riverpod state management' },
                            { name: 'Firebase', desc: 'Auth, Firestore, cloud storage' },
                            { name: 'Next.js', desc: 'React, Tailwind CSS, SSR' }
                        ].map((item) => (
                            <div key={item.name} className="flex items-start gap-3">
                                <span className="text-lg font-bold" style={{ color: 'var(--accent)' }}>{'[+]'}</span>
                                <div>
                                    <div className="font-bold text-base" style={{ color: 'var(--secondary)' }}>{item.name}</div>
                                    <div className="text-sm mt-1 opacity-90">{item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    // Estrai le navicelle social (solo quelle con link)
    const socialSpaceships = spaceships.filter(ship => ship.link && ship.logo);

    return (
        <section className="relative w-full min-h-screen overflow-hidden flex items-center pt-10 sm:pt-16 lg:pt-20" id="about">
            <StarryBackground />
            {/* Navicelle decorative: visibili solo su schermi >= sm */}
            <div className="hidden sm:block">
                {spaceships.map((ship, i) => (
                    <div
                        key={i}
                        className={`pointer-events-auto absolute ${spaceshipPositions[i].size}`}
                        style={{
                            top: spaceshipPositions[i].top,
                            left: spaceshipPositions[i].left,
                            zIndex: spaceshipPositions[i].z,
                        }}
                    >
                        <Pill logo={ship.logo} link={ship.link} color={ship.color} />
                    </div>
                ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <Link
                    href="#about"
                    className="flex justify-center items-center text-3xl md:text-4xl lg:text-6xl font-semibold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent mb-10 md:pr-5 lg:pr-9 text-center w-full relative"
                    style={{ textShadow: '0 0 3px var(--accent)' }}
                >
                    {'>'} ABOUT_ME.exe
                </Link>
                <div className="grid lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        {/* Terminale Bio */}
                        <TerminalWindow title="bio.txt" delay={0}>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-lg font-bold" style={{ color: 'var(--accent)' }}>$</span>
                                <span className="font-semibold text-sm" style={{ color: 'var(--secondary)' }}>cat bio.txt</span>
                            </div>
                            <p className="leading-relaxed text-sm text-[var(--text)]">
                                <span className="font-bold" style={{ color: 'var(--accent)' }}>{'>> '}</span>
                                I&apos;m a student of Information Technologies and Sciences at Ca&apos;Foscari University in Venice.
                                I enjoy experimenting with web and mobile apps, building small projects, and learning by doing.
                            </p>
                            <p className="leading-relaxed mt-3 text-sm text-[var(--text)]">
                                <span className="font-bold" style={{ color: 'var(--accent)' }}>{'>> '}</span>
                                Beyond tech, I have a passion for photography, cinema, music and calisthenics.
                            </p>
                        </TerminalWindow>

                        {/* Terminale Tab Selector */}
                        <TerminalWindow title="navigation.sh" delay={200}>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-lg font-bold" style={{ color: 'var(--accent)' }}>$</span>
                                <span className="font-semibold text-sm" style={{ color: 'var(--secondary)' }}>./select_view</span>
                            </div>
                            <div className="space-y-2">
                                {/* Tab normali sempre visibili */}
                                {['skills', 'education', 'learning'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className="w-full text-left px-4 py-2.5 transition-all duration-300 font-mono text-sm font-semibold rounded"
                                        style={{
                                            color: activeTab === tab ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                                            background: activeTab === tab ? 'rgba(255, 0, 110, 0.2)' : 'transparent',
                                            border: `2px solid ${activeTab === tab ? 'var(--secondary)' : 'transparent'}`,
                                            boxShadow: activeTab === tab ? '0 0 15px rgba(255, 0, 110, 0.4)' : 'none'
                                        }}
                                    >
                                        <span style={{ color: 'var(--accent)' }}>{activeTab === tab ? '▶' : '▷'}</span> {tab + '.sh'}
                                    </button>
                                ))}
                                {/* Tab social solo su mobile */}
                                <div className="block sm:hidden">
                                    <button
                                        onClick={() => setActiveTab('social')}
                                        className="w-full text-left px-4 py-2.5 transition-all duration-300 font-mono text-sm font-semibold rounded"
                                        style={{
                                            color: activeTab === 'social' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                                            background: activeTab === 'social' ? 'rgba(255, 0, 110, 0.2)' : 'transparent',
                                            border: `2px solid ${activeTab === 'social' ? 'var(--secondary)' : 'transparent'}`,
                                            boxShadow: activeTab === 'social' ? '0 0 15px rgba(255, 0, 110, 0.4)' : 'none'
                                        }}
                                    >
                                        <span style={{ color: 'var(--accent)' }}>{activeTab === 'social' ? '▶' : '▷'}</span> social-links.sh
                                    </button>
                                </div>
                            </div>
                        </TerminalWindow>
                    </div>

                    {/* Colonna destra: Contenuto dinamico */}
                    <div>
                        <TerminalWindow
                            title={`${activeTab}.log`}
                            delay={400}
                            key={activeTab}
                            className="h-full"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-lg font-bold" style={{ color: 'var(--accent)' }}>$</span>
                                <span className="font-semibold text-sm" style={{ color: 'var(--secondary)' }}>./run {activeTab}</span>
                                <span className="animate-pulse text-lg" style={{ color: 'var(--accent)' }}>_</span>
                            </div>
                            {/* Social solo su mobile e tab attiva */}
                            {activeTab === 'social' ? (
                                <div className="block sm:hidden">
                                    <div className="flex flex-wrap justify-center gap-4 py-4">
                                        {socialSpaceships.map((ship, i) => (
                                            <a
                                                key={i}
                                                href={ship.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex flex-col items-center group"
                                            >
                                                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] group-hover:scale-110 transition-transform">
                                                    {ship.logo}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                renderContent()
                            )}
                        </TerminalWindow>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;