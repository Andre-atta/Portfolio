import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TechnologyTag from "@/components/ui/TechnologyTag";

const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut", type: "spring", damping: 20 } },
    exit: { opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.2 } },
};
const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
};

const ProjectModal = ({ open, onClose, project }) => {
    useEffect(() => {
        if (!open) return;
        const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [open, onClose]);

    if (!open || !project) return null;

    const statusStyle =
        project.status === "Completed"
            ? { borderColor: "var(--success)", color: "var(--success)", background: "rgba(34,197,94,0.1)" }
            : project.status === "In Progress"
            ? { borderColor: "var(--warning)", color: "var(--warning)", background: "rgba(234,179,8,0.1)" }
            : { borderColor: "rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.05)" };

    return (
        <AnimatePresence>
            {/* Backdrop */}
            <motion.div
                className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
                variants={overlayVariants}
                initial="hidden" animate="visible" exit="exit"
                onClick={onClose}
                aria-label="Close project details"
            />

            {/* Modal wrapper */}
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center px-4"
                variants={modalVariants}
                initial="hidden" animate="visible" exit="exit"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <div
                    className="relative rounded-lg max-w-3xl w-full font-mono animate-float-slow"
                    style={{
                        background: "linear-gradient(135deg, rgba(15,23,42,0.55) 0%, rgba(30,41,59,0.45) 100%)",
                        border: "2px solid var(--accent-lighter)",
                        boxShadow: "0 0 60px rgba(var(--accent-rgb), 0.35), inset 0 0 40px rgba(var(--accent-rgb), 0.08)",
                        backdropFilter: "blur(16px)",
                    }}
                >
                    {/* Grid overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-20 rounded-lg"
                        style={{
                            backgroundImage: `
                                repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(var(--accent-rgb), 0.04) 3px, rgba(var(--accent-rgb), 0.04) 4px),
                                repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(var(--accent-rgb), 0.04) 3px, rgba(var(--accent-rgb), 0.04) 4px)
                            `,
                        }}
                    />

                    {/* Scan line */}
                    <div
                        className="absolute inset-0 pointer-events-none rounded-lg animate-scan"
                        style={{ background: "linear-gradient(to bottom, transparent, rgba(var(--accent-rgb), 0.05), transparent)" }}
                    />

                    {/* Corner accents */}
                    {["top-0 left-0 border-t-2 border-l-2 rounded-tl-lg", "top-0 right-0 border-t-2 border-r-2 rounded-tr-lg",
                      "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-lg", "bottom-0 right-0 border-b-2 border-r-2 rounded-br-lg"
                    ].map((c, i) => (
                        <div key={i} className={`absolute w-10 h-10 ${c}`} style={{ borderColor: "var(--accent-light)" }} />
                    ))}

                    {/* Header */}
                    <div
                        className="relative border-b-2 p-4 md:p-5 flex justify-between items-center"
                        style={{ borderColor: "var(--accent-lightest)", background: "rgba(var(--primary-rgb), 0.2)" }}
                    >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                            <span className="text-sm md:text-base font-bold" style={{ color: "var(--accent)", textShadow: "0 0 10px rgba(var(--accent-rgb), 0.5)" }}>
                                ◆ INSPECT:
                            </span>
                            <span className="text-sm md:text-base font-bold truncate" style={{ color: "var(--text)", textShadow: "0 0 8px rgba(var(--accent-rgb), 0.4)" }}>
                                {project.title}
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-2xl font-bold ml-3 flex-shrink-0 transition-all duration-300 hover:rotate-90 focus:outline-none"
                            style={{ color: "var(--accent)" }}
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Scrollable content */}
                    <div className="relative p-5 md:p-7 space-y-5 md:space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">

                        {/* Process info */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="text-xs font-bold block mb-1 opacity-50" style={{ color: "var(--accent)" }}>PROCESS.ID:</span>
                                <div className="text-base font-bold font-mono" style={{ color: "var(--accent)" }}>
                                    0x00{project.id}
                                </div>
                            </div>
                            <div>
                                <span className="text-xs font-bold block mb-1 opacity-50" style={{ color: "var(--accent)" }}>STATUS:</span>
                                <span className="text-xs border-2 inline-block px-3 py-1 font-bold" style={statusStyle}>
                                    {project.status?.toUpperCase() ?? "IDLE"}
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <span className="text-xs font-bold block mb-2 opacity-50" style={{ color: "var(--accent)" }}>DESCRIPTION:</span>
                            <p className="text-sm md:text-base leading-relaxed whitespace-pre-line" style={{ color: "var(--text)", opacity: 0.85 }}>
                                {project.description}
                            </p>
                        </div>

                        {/* Tech Stack */}
                        {project.technologies?.length > 0 && (
                            <div>
                                <span className="text-xs font-bold block mb-2 opacity-50" style={{ color: "var(--accent)" }}>TECH.STACK:</span>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, i) => (
                                        <TechnologyTag key={i} technology={tech} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Categories */}
                        {project.tag?.filter(t => t !== "All").length > 0 && (
                            <div>
                                <span className="text-xs font-bold block mb-2 opacity-50" style={{ color: "var(--accent)" }}>CATEGORIES:</span>
                                <div className="flex flex-wrap gap-2">
                                    {project.tag.filter(t => t !== "All").map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 text-xs border font-mono"
                                            style={{ borderColor: "var(--primary-lighter)", color: "var(--primary-light)" }}
                                        >
                                            {tag.toUpperCase()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="pt-2 flex flex-col sm:flex-row gap-3">
                            {project.previewUrl && project.previewUrl !== "/" && (
                                <a
                                    href={project.previewUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border-2 px-5 py-2.5 font-bold text-sm text-center transition-all duration-300"
                                    style={{
                                        borderColor: "var(--accent-lighter)",
                                        color: "var(--accent)",
                                        boxShadow: "0 0 12px rgba(var(--accent-rgb), 0.2)",
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "#000"; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent)"; }}
                                >
                                    [EXECUTE] ▸
                                </a>
                            )}
                            {project.gitUrl && project.gitUrl !== "/" && (
                                <a
                                    href={project.gitUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border-2 px-5 py-2.5 font-bold text-sm text-center transition-all duration-300"
                                    style={{
                                        borderColor: "var(--secondary-lighter)",
                                        color: "var(--secondary)",
                                        boxShadow: "0 0 12px rgba(var(--secondary-rgb), 0.2)",
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.background = "var(--secondary)"; e.currentTarget.style.color = "#000"; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--secondary)"; }}
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


export default ProjectModal;

