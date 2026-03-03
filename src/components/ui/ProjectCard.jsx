"use client";
import React from "react";
import { motion } from "framer-motion";
import TechnologyTag from "@/components/ui/TechnologyTag";

/**
 * ProjectCard — card olografica con luce proiettata dal basso.
 * Solo whileHover, nessuna animazione infinita per risparmiare GPU.
 */
const ProjectCard = ({ project, onClick, prefersReducedMotion = false }) => {
    return (
        <div className="relative flex flex-col items-center pt-6 sm:pt-8">

            {/* ── Projector base glow ── */}
            <div
                className="absolute bottom-0 w-20 sm:w-28 h-2 sm:h-3 rounded-full blur-md"
                style={{
                    background: "var(--accent-lighter)",
                    boxShadow: "0 0 20px var(--accent-lightest)",
                }}
            />

            {/* ── Triangular beam (outer) ── nascosto su schermi piccoli */}
            <div
                className="absolute bottom-0 left-1/2 pointer-events-none hidden sm:block"
                style={{
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: "50px solid transparent",
                    borderRight: "50px solid transparent",
                    borderBottom: "220px solid rgba(var(--accent-rgb), 0.06)",
                    filter: "blur(10px)",
                    zIndex: 0,
                }}
            />

            {/* ── Triangular beam (inner) ── nascosto su schermi piccoli */}
            <div
                className="absolute bottom-0 left-1/2 pointer-events-none hidden sm:block"
                style={{
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: "30px solid transparent",
                    borderRight: "30px solid transparent",
                    borderBottom: "220px solid rgba(var(--accent-rgb), 0.12)",
                    filter: "blur(3px)",
                    zIndex: 1,
                }}
            />

            {/* ── Holographic Card ── */}
            <motion.div
                onClick={() => onClick(project)}
                className="relative w-full mb-8 sm:mb-10 flex flex-col justify-between rounded cursor-pointer font-mono"
                style={{
                    zIndex: 10,
                    minHeight: "12rem",
                    background: "linear-gradient(135deg, rgba(15,23,42,0.45) 0%, rgba(30,41,59,0.35) 100%)",
                    border: "2px solid var(--accent-lightest)",
                    boxShadow: "0 0 20px rgba(var(--accent-rgb), 0.15), inset 0 0 15px rgba(var(--accent-rgb), 0.05)",
                    backdropFilter: "blur(12px)",
                }}
                whileHover={
                    !prefersReducedMotion
                        ? {
                              scale: 1.03,
                              y: -6,
                              boxShadow: "0 0 45px rgba(var(--accent-rgb), 0.35), inset 0 0 25px rgba(var(--accent-rgb), 0.1)",
                              borderColor: "var(--accent-lighter)",
                          }
                        : undefined
                }
                whileTap={!prefersReducedMotion ? { scale: 0.98 } : undefined}
                transition={{ duration: 0.25, ease: "easeOut" }}
            >
                {/* Grid overlay — solo decorativo, statico */}
                <div
                    className="absolute inset-0 pointer-events-none rounded opacity-15"
                    style={{
                        backgroundImage: `
                            repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(var(--accent-rgb), 0.03) 3px, rgba(var(--accent-rgb), 0.03) 4px),
                            repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(var(--accent-rgb), 0.03) 3px, rgba(var(--accent-rgb), 0.03) 4px)
                        `,
                    }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between h-full p-3 sm:p-4 gap-2">
                    {/* Header row */}
                    <div className="flex items-center justify-between text-xs" style={{ color: "var(--accent)" }}>
                        <span className="font-bold tracking-wider opacity-60 text-[10px] sm:text-xs">0x00{project.id}</span>
                        <span
                            className="px-1.5 sm:px-2 py-0.5 border text-[9px] sm:text-[10px] font-bold"
                            style={
                                project.status === "Completed"
                                    ? { borderColor: "var(--success)", color: "var(--success)", background: "rgba(34,197,94,0.1)" }
                                    : project.status === "In Progress"
                                    ? { borderColor: "var(--warning)", color: "var(--warning)", background: "rgba(234,179,8,0.1)" }
                                    : { borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.04)" }
                            }
                        >
                            {project.status?.toUpperCase() ?? "IDLE"}
                        </span>
                    </div>

                    {/* Title */}
                    <h3
                        className="text-sm sm:text-base font-bold leading-snug"
                        style={{ color: "var(--accent)", textShadow: "0 0 8px rgba(var(--accent-rgb), 0.3)" }}
                    >
                        {project.title}
                    </h3>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                        {project.technologies?.map((tech, i) => (
                            <TechnologyTag key={i} technology={tech} />
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-[10px] sm:text-xs" style={{ color: "var(--accent)" }}>
                        <span>▸</span>
                        <span className="opacity-60">[INSPECT] →</span>
                    </div>
                </div>

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-l-2" style={{ borderColor: "var(--accent-lighter)" }} />
                <div className="absolute top-0 right-0 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-r-2" style={{ borderColor: "var(--accent-lighter)" }} />
                <div className="absolute bottom-0 left-0 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-l-2" style={{ borderColor: "var(--accent-lighter)" }} />
                <div className="absolute bottom-0 right-0 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-r-2" style={{ borderColor: "var(--accent-lighter)" }} />
            </motion.div>
        </div>
    );
};

export default ProjectCard;
