import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TechnologyTag from "@/app/components/ui/TechnologyTag";

const ProjectCard = ({ project, onClick, prefersReducedMotion = false }) => {
    const [glitch, setGlitch] = useState(false);

    useEffect(() => {
        if (prefersReducedMotion) return undefined;
        const glitchInterval = setInterval(() => {
            if (Math.random() > 0.85) {
                setGlitch(true);
                setTimeout(() => setGlitch(false), 200);
            }
        }, 3000);

        return () => clearInterval(glitchInterval);
    }, [prefersReducedMotion]);

    return (
        <div className="relative flex flex-col items-center pt-8">
            {/* Projector Base */}
            <div className="absolute bottom-0 w-32 h-4 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent rounded-full blur-md animate-pulse shadow-[0_0_30px_#22d3ee80]" />

            {/* Triangular Projection Beam - Left Side */}
            <div
                className="absolute bottom-0 left-1/2 w-0 h-0 pointer-events-none blur-lg"
                style={{
                    transform: 'translateX(-50%)',
                    borderLeft: '60px solid transparent',
                    borderRight: '60px solid transparent',
                    borderBottom: '280px solid rgba(34, 211, 238, 0.15)',
                    zIndex: 0
                }}
            />

            {/* Inner Glow Beam */}
            <div
                className="absolute bottom-0 left-1/2 w-0 h-0 pointer-events-none blur"
                style={{
                    transform: 'translateX(-50%)',
                    borderLeft: '40px solid transparent',
                    borderRight: '40px solid transparent',
                    borderBottom: '280px solid rgba(34, 211, 238, 0.25)',
                    zIndex: 1
                }}
            />

            {/* Holographic Card con motion.div */}
            <motion.div
                onClick={() => onClick(project)}
                className={`
                    relative w-full h-52 mb-10 flex flex-col justify-between
                    border-2 border-cyan-400/70
                    rounded cursor-pointer font-mono
                    bg-slate-900/30 backdrop-blur-md
                    transition-all duration-300
                    hover:border-cyan-300
                    hover:shadow-[0_0_40px_rgba(34,211,238,0.4),inset_0_0_30px_rgba(34,211,238,0.15)]
                    shadow-[0_0_25px_rgba(34,211,238,0.3),inset_0_0_20px_rgba(34,211,238,0.1)]
                    ${!prefersReducedMotion && 'animate-float'}
                    ${glitch ? 'animate-glitch-card' : ''}
                `}
                style={{
                    zIndex: 10,
                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.4) 0%, rgba(30, 41, 59, 0.3) 100%)',
                }}
                whileHover={!prefersReducedMotion ? { scale: 1.05, y: -8, boxShadow: "0 0 60px 10px #22d3ee55" } : undefined}
                whileTap={!prefersReducedMotion ? { scale: 0.98 } : undefined}
                animate={!prefersReducedMotion ? { y: [0, -12, 0], boxShadow: [
                    "0 0 25px #22d3ee4d, inset 0 0 20px #22d3ee1a",
                    "0 0 40px #22d3ee66, inset 0 0 30px #22d3ee26",
                    "0 0 25px #22d3ee4d, inset 0 0 20px #22d3ee1a"
                ] } : undefined}
                transition={!prefersReducedMotion ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : undefined}
            >
                {/* Pixelated Overlay */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-30"
                    style={{
                        backgroundImage: `
                            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 211, 238, 0.03) 2px, rgba(34, 211, 238, 0.03) 4px),
                            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(34, 211, 238, 0.03) 2px, rgba(34, 211, 238, 0.03) 4px)
                        `
                    }}
                />

                {/* Scan Line Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-scan pointer-events-none" />

                {/* Glitch Layers */}
                {glitch && (
                    <>
                        <div
                            className="absolute inset-0 pointer-events-none bg-cyan-400/30 mix-blend-screen animate-glitch-fast"
                            style={{ clipPath: 'inset(20% 0 60% 0)' }}
                        />
                        <div
                            className="absolute inset-0 pointer-events-none bg-purple-400/30 mix-blend-screen animate-glitch-fast"
                            style={{ clipPath: 'inset(60% 0 20% 0)', animationDelay: '50ms' }}
                        />
                        <div
                            className="absolute inset-0 pointer-events-none bg-pink-400/20 mix-blend-screen animate-glitch-fast"
                            style={{ clipPath: 'inset(40% 0 40% 0)', animationDelay: '100ms' }}
                        />
                    </>
                )}

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between h-full p-4">
                    {/* Header */}
                    <div className="flex items-center justify-between text-xs text-[var(--accent)]">
                        <span className={`font-bold tracking-wider ${glitch ? 'animate-glitch-text' : ''}`}>
                            0x00{project.id}
                        </span>
                        <span
                            className={`px-2 py-0.5 border ${
                                project.status === "Completed"
                                    ? "border-green-400/80 text-green-400 bg-green-400/10"
                                    : project.status === "In Progress"
                                        ? "border-yellow-400/80 text-yellow-400 bg-yellow-400/10"
                                        : "border-gray-500/80 text-gray-500 bg-gray-500/10"
                            }`}
                        >
                            {project.status?.toUpperCase() || "IDLE"}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className={`text-lg font-bold text-cyan-200 leading-tight ${glitch ? 'animate-glitch-text' : ''}`}
                        style={{
                            textShadow: '0 0 10px rgba(34, 211, 238, 0.5)'
                        }}
                    >
                        {project.title}
                    </h3>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 text-xs">
                        {project.technologies?.map((tech, i) => (
                            <TechnologyTag key={i} technology={tech} />
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-2 text-sm text-[var(--accent)] flex items-center gap-2">
                        <span className="animate-pulse">▸</span>
                        <span>[INSPECT] →</span>
                    </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--accent)]" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--accent)]" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--accent)]" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--accent)]" />
            </motion.div>
        </div>
    );
};

export default ProjectCard;
