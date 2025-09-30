import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut",
            type: "spring",
            damping: 20
        }
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        y: 50,
        transition: { duration: 0.2 }
    },
};

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
};

const ProjectModal = ({ open, onClose, project }) => {
    const [glitch, setGlitch] = useState(false);

    useEffect(() => {
        if (!open) return;
        const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [open, onClose]);

    useEffect(() => {
        if (!open) return;

        const glitchInterval = setInterval(() => {
            if (Math.random() > 0.9) {
                setGlitch(true);
                setTimeout(() => setGlitch(false), 150);
            }
        }, 4000);

        return () => clearInterval(glitchInterval);
    }, [open]);

    if (!open || !project) return null;

    const getHexId = (id) => `0x00${id}`;

    return (
        <AnimatePresence>
            {/* Backdrop */}
            <motion.div
                className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={overlayVariants}
                onClick={onClose}
                aria-label="Close project details"
            />

            {/* Modal */}
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center px-4"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalVariants}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <div
                    className={`
                        relative
                        border-2 border-cyan-400/70 
                        bg-slate-950/40 backdrop-blur-md
                        rounded-lg max-w-3xl w-full font-mono 
                        shadow-[0_0_60px_rgba(34,211,238,0.4),inset_0_0_40px_rgba(34,211,238,0.1)]
                        animate-float-slow
                        ${glitch ? 'animate-glitch-card' : ''}
                    `}
                    style={{
                        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.5) 0%, rgba(30, 41, 59, 0.4) 100%)',
                    }}
                >
                    {/* Pixelated Overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-30 rounded-lg"
                        style={{
                            backgroundImage: `
                                repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 211, 238, 0.03) 2px, rgba(34, 211, 238, 0.03) 4px),
                                repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(34, 211, 238, 0.03) 2px, rgba(34, 211, 238, 0.03) 4px)
                            `
                        }}
                    />

                    {/* Scan Line */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent animate-scan pointer-events-none rounded-lg" />

                    {/* Glitch Overlays */}
                    {glitch && (
                        <>
                            <div
                                className="absolute inset-0 pointer-events-none bg-cyan-400/20 mix-blend-screen animate-glitch-fast rounded-lg"
                                style={{ clipPath: 'inset(20% 0 60% 0)' }}
                            />
                            <div
                                className="absolute inset-0 pointer-events-none bg-purple-400/20 mix-blend-screen animate-glitch-fast rounded-lg"
                                style={{ clipPath: 'inset(60% 0 20% 0)', animationDelay: '50ms' }}
                            />
                        </>
                    )}

                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-cyan-400/80 rounded-tl-lg" />
                    <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-cyan-400/80 rounded-tr-lg" />
                    <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-cyan-400/80 rounded-bl-lg" />
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-cyan-400/80 rounded-br-lg" />

                    {/* Header */}
                    <div className="relative border-b-2 border-cyan-400/50 p-4 md:p-5 flex justify-between items-center bg-slate-900/40">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                            <span
                                className={`text-sm md:text-lg font-bold text-cyan-400 ${glitch ? 'animate-glitch-text' : ''}`}
                                style={{ textShadow: '0 0 10px rgba(34, 211, 238, 0.6)' }}
                            >
                                ◆ INSPECT:
                            </span>
                            <span
                                className={`text-sm md:text-lg font-bold text-cyan-300 truncate ${glitch ? 'animate-glitch-text' : ''}`}
                                style={{ textShadow: '0 0 8px rgba(34, 211, 238, 0.5)' }}
                            >
                                {project.title}
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-cyan-400 text-2xl md:text-3xl font-bold hover:text-cyan-300 hover:rotate-90 focus:outline-none ml-3 flex-shrink-0 transition-all duration-300"
                            style={{ textShadow: '0 0 10px rgba(34, 211, 238, 0.6)' }}
                        >
                            ✕
                        </button>
                    </div>

                    {/* Content */}
                    <div className="relative p-5 md:p-7 text-cyan-400 space-y-5 md:space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">

                        {/* Process Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="text-xs text-cyan-400/70 block mb-2 font-bold">PROCESS.ID:</span>
                                <div
                                    className="text-base md:text-lg font-bold text-cyan-300"
                                    style={{ textShadow: '0 0 8px rgba(34, 211, 238, 0.5)' }}
                                >
                                    {getHexId(project.id)}
                                </div>
                            </div>
                            <div>
                                <span className="text-xs text-cyan-400/70 block mb-2 font-bold">STATUS:</span>
                                <div className={`text-xs md:text-sm border-2 inline-block px-3 py-1 ${
                                    project.status === "Completed"
                                        ? "border-green-400/80 text-green-400 bg-green-400/10"
                                        : project.status === "In Progress"
                                            ? "border-yellow-400/80 text-yellow-400 bg-yellow-400/10"
                                            : "border-gray-500/80 text-gray-500 bg-gray-500/10"
                                }`}>
                                    {project.status?.toUpperCase() || "IDLE"}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <span className="text-xs text-cyan-400/70 block mb-3 font-bold">DESCRIPTION:</span>
                            <div className="text-sm md:text-base text-cyan-100 leading-relaxed whitespace-pre-line">
                                {project.description}
                            </div>
                        </div>

                        {/* Tech Stack */}
                        {project.technologies && project.technologies.length > 0 && (
                            <div>
                                <span className="text-xs text-cyan-400/70 block mb-3 font-bold">TECH.STACK:</span>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="border-2 border-purple-400/70 text-purple-300 bg-purple-400/10 px-3 md:px-4 py-1.5 text-xs md:text-sm font-bold"
                                            style={{ boxShadow: '0 0 10px rgba(168, 85, 247, 0.3)' }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Categories */}
                        {project.tag && project.tag.length > 0 && (
                            <div>
                                <span className="text-xs text-cyan-400/70 block mb-3 font-bold">CATEGORIES:</span>
                                <div className="flex flex-wrap gap-2">
                                    {project.tag.filter(t => t !== "All").map((tag, i) => (
                                        <span
                                            key={i}
                                            className="border border-cyan-400/60 text-cyan-300 bg-cyan-400/10 px-3 md:px-4 py-1 text-xs"
                                        >
                                            {tag.toUpperCase()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="pt-4 flex flex-col sm:flex-row gap-3">
                            {project.previewUrl && project.previewUrl !== "/" && (
                                <a
                                    href={project.previewUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border-2 border-cyan-400/80 text-cyan-400 bg-cyan-400/5 px-5 md:px-7 py-2.5 hover:bg-cyan-400 hover:text-black font-bold transition-all duration-300 text-center text-sm md:text-base"
                                    style={{ boxShadow: '0 0 15px rgba(34, 211, 238, 0.3)' }}
                                >
                                    [EXECUTE] ▸
                                </a>
                            )}
                            {project.gitUrl && project.gitUrl !== "/" && (
                                <a
                                    href={project.gitUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border-2 border-cyan-400/80 text-cyan-400 bg-cyan-400/5 px-5 md:px-7 py-2.5 hover:bg-cyan-400 hover:text-black font-bold transition-all duration-300 text-center text-sm md:text-base"
                                    style={{ boxShadow: '0 0 15px rgba(34, 211, 238, 0.3)' }}
                                >
                                    [SOURCE.CODE] ▸
                                </a>
                            )}
                        </div>

                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

ProjectModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    project: PropTypes.object,
};

export default ProjectModal;