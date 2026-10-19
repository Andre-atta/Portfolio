"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CodeBracketIcon } from "@heroicons/react/24/outline";
import TechnologyTag from "@/app/components/ui/TechnologyTag";
import RoundedFull from "@/app/components/button/RoundedFull";
import RoundedEmpty from "@/app/components/button/RoundedEmpty";

const StatusBadge = ({ status }) => {
    const isCompleted = status === "Completed";
    return (
        <span
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded"
            style={{
                color: "var(--text)",
                background: "transparent",
                border: `1.5px solid ${isCompleted ? "var(--primary)" : "var(--secondary)"}`,
            }}
        >
            {status}
        </span>
    );
};

const ModalHeader = ({ title, onClose }) => (
    <div
        className="flex items-center justify-between px-4 py-2 border-b-2 shrink-0"
        style={{ borderColor: "var(--secondary)", background: "var(--primary-lightest)" }}
    >
        <div className="w-16" />
        <span
            className="text-sm font-mono font-bold flex-1 text-center"
            style={{ color: "var(--text)" }}
        >
            {title}
        </span>
        <div className="flex gap-2 justify-end w-16 items-center">
            <svg width="16" height="16" viewBox="0 0 16 16" className="cursor-default opacity-40 hover:opacity-80 transition-opacity">
                <rect x="4" y="12" width="8" height="2" fill="var(--text)" />
            </svg>
            <svg width="16" height="16" viewBox="0 0 16 16" className="cursor-default opacity-40 hover:opacity-80 transition-opacity">
                <rect x="4" y="4" width="8" height="8" fill="none" stroke="var(--text)" strokeWidth="2" />
            </svg>
            <svg
                width="16" height="16" viewBox="0 0 16 16"
                className="cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                onClick={onClose}
            >
                <line x1="4" y1="4" x2="12" y2="12" stroke="var(--secondary)" strokeWidth="2" />
                <line x1="12" y1="4" x2="4" y2="12" stroke="var(--secondary)" strokeWidth="2" />
            </svg>
        </div>
    </div>
);

const ProjectModal = ({ project, onClose }) => {
    useEffect(() => {
        const handleKey = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-20 sm:pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

                <motion.div
                    className="relative z-10 w-full max-w-3xl flex flex-col rounded-lg overflow-hidden max-h-[85vh] mt-4 sm:mt-0"
                    style={{
                        background: "rgba(0,0,0,0.92)",
                        border: "2px solid var(--primary)",
                    }}
                    initial={{ opacity: 0, scale: 0.92, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 24 }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <ModalHeader title="modal.sh" onClose={onClose} />

                    <div className="flex flex-col md:flex-row gap-0 p-4 sm:p-6 font-mono overflow-y-auto no-scrollbar">

                        {/* COLONNA SX */}
                        <div
                            className="flex flex-col items-center gap-4 md:w-48 shrink-0 md:pr-6 md:border-r"
                            style={{ borderColor: "var(--primary-lightest)" }}
                        >
                            {/* Immagine — bordo netto, niente glow */}
                            <div
                                className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0"
                                style={{
                                    border: "2px solid var(--primary)",
                                }}
                            >
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    sizes="128px"
                                    className="object-cover"
                                />
                            </div>

                            <StatusBadge status={project.status} />

                            <div className="flex flex-col gap-2 w-full mt-auto pt-2 sm:pt-4">
                                {project.gitUrl && project.gitUrl !== "/" && (
                                    <RoundedEmpty
                                        text="View Code"
                                        onClick={() => window.open(project.gitUrl, "_blank")}
                                    >
                                        <CodeBracketIcon className="w-4 h-4" />
                                    </RoundedEmpty>
                                )}
                                {project.previewUrl && project.previewUrl !== "/" && (
                                    <RoundedFull
                                        text="Live Preview"
                                        onClick={() => window.open(project.previewUrl, "_blank")}
                                    />
                                )}
                            </div>
                        </div>

                        {/* COLONNA DX */}
                        <div className="flex flex-col gap-4 flex-1 md:pl-6 mt-6 md:mt-0">
                            <div className="flex items-baseline gap-2">
                                <span style={{ color: "var(--secondary)" }} className="text-sm select-none">❯</span>
                                <h2 className="text-lg sm:text-xl font-bold text-[var(--text)]">
                                    {project.title}
                                </h2>
                            </div>

                            <div
                                className="text-sm leading-relaxed max-h-none md:max-h-64 text-neutral-300"
                                style={{
                                    textAlign: "justify"
                                }}
                            >
                                {project.description}
                            </div>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.technologies?.map((tech, i) => (
                                    <TechnologyTag key={i} name={tech.name} icon={tech.icon} />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProjectModal;

