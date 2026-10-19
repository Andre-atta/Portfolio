"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import TagBadge from "@/app/components/ui/TagBadge";

const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.18 } }
};

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.18 } },
    exit: { opacity: 0, transition: { duration: 0.15 } }
};

const ProjectModal = ({ project, onClose }) => {
    useEffect(() => {
        if (!project) return;
        const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [project, onClose]);

    if (!project) return null;

    return (
        <>
            <motion.div
                className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={onClose}
            />
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="relative rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden font-mono"
                    style={{
                        background: 'rgba(0, 0, 0, 0.9)',
                        border: '2px solid var(--primary)',
                        boxShadow: '0 0 30px rgba(var(--primary-rgb), 0.5), inset 0 0 20px rgba(var(--primary-rgb), 0.1)',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    {/* Header */}
                    <div
                        className="flex items-center justify-between px-4 py-3 border-b-2"
                        style={{
                            borderColor: 'var(--secondary)',
                            background: 'rgba(var(--primary-rgb), 0.3)'
                        }}
                    >
                        {/* Left: Status */}
                        <div className="flex flex-col items-start min-w-[120px]">
                            <span className={`text-xs px-2 py-1 rounded border mt-1 ${
                                project.status === "Completed" ? "border-green-500 text-green-500" :
                                    project.status === "In Progress" ? "border-yellow-500 text-yellow-500" : "border-red-500 text-red-500"
                            }`}>
                            {project.status}
                        </span>
                        </div>
                        {/* Center: Title */}
                        <span
                            className="text-lg md:text-xl font-bold truncate text-center flex-1"
                            style={{ color: 'var(--accent)', textShadow: '0 0 8px var(--accent)' }}
                        >
                            {project.title}
                        </span>
                        {/* Right: Close button */}
                        <div className="flex gap-2 justify-end min-w-[60px]">
                            <div className="flex gap-2 justify-end w-16">
                            <svg width="14" height="14" viewBox="0 0 16 16" className="align-middle">
                                <rect x="4" y="12" width="8" height="2" fill="var(--accent)"/>
                            </svg>
                            <svg width="14" height="14" viewBox="0 0 16 16">
                                <rect x="4" y="4" width="8" height="8" fill="none" stroke="var(--accent)" strokeWidth="2"/>
                            </svg>
                            <button
                                onClick={onClose}
                                className="text-xs font-mono hover:text-white transition-colors p-0 m-0 leading-none"
                                style={{ color: 'var(--accent)' }}
                                aria-label="Close modal"
                            >
                                ✕
                            </button>
                        </div>
                        </div>
                    </div>



                    {/* Image */}
                    <div className="w-full px-0 pt-0 pb-6 flex justify-center items-center">
                        <div className="w-full max-w-3xl aspect-[16/7] bg-gray-800 border border-[var(--primary)] overflow-hidden flex items-center justify-center">
                            <Image
                                src={project.image}
                                alt="[Project Image]"
                                className="object-cover w-full h-full"
                                draggable={false}
                                width={800}
                                height={350}
                            />
                        </div>
                    </div>


                    {/* Description */}
                    <div className="overflow-y-auto max-h-[calc(90vh-60px)] p-6 pt-0 space-y-6">
                        <section>
                            <div className="flex items-center gap-2 mb-3">
                                <span style={{ color: 'var(--accent)' }}>$</span>
                                <h3 className="text-sm font-bold" style={{ color: 'var(--primary)' }}>
                                    cat description.txt
                                </h3>
                            </div>
                            <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--text)' }}>
                                {project.description}
                            </p>
                        </section>

                        {/* Process ID moved here */}
                        <div className="mt-4">
                            <span className="text-xs" style={{ color: 'var(--secondary)' }}>PROCESS.ID</span>
                            <div className="text-sm font-bold mt-1" style={{ color: 'var(--accent)' }}>
                                0x00{project.id}
                            </div>
                        </div>

                        {/* Technologies */}
                        {project.technologies?.length > 0 && (
                            <section>
                                <div className="flex items-center gap-2 mb-3">
                                    <span style={{ color: 'var(--accent)' }}>$</span>
                                    <h3 className="text-sm font-bold" style={{ color: 'var(--primary)' }}>
                                        ls technologies/
                                    </h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1.5 rounded-lg border text-xs transition-all"
                                            style={{
                                                background: 'rgba(var(--primary-rgb), 0.2)',
                                                borderColor: 'var(--primary)',
                                                color: 'var(--accent)'
                                            }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Tags */}
                        {project.tag?.length > 0 && (
                            <section>
                                <div className="flex items-center gap-2 mb-3">
                                    <span style={{ color: 'var(--accent)' }}>$</span>
                                    <h3 className="text-sm font-bold" style={{ color: 'var(--primary)' }}>
                                        tags --list
                                    </h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {project.tag.map((tag, i) => (
                                        <TagBadge key={i} tag={tag} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3 pt-4">
                            {project.gitUrl && project.gitUrl !== "/" && (
                                <a
                                    href={project.gitUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 text-center px-4 py-2 rounded-lg border-2 transition-all text-sm font-bold"
                                    style={{
                                        background: 'rgba(var(--primary-rgb), 0.2)',
                                        borderColor: 'var(--primary)',
                                        color: 'var(--text)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--primary)';
                                        e.currentTarget.style.boxShadow = '0 0 15px var(--primary)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(var(--primary-rgb), 0.2)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    [SOURCE.CODE]
                                </a>
                            )}
                            {project.previewUrl && project.previewUrl !== "/" && (
                                <a
                                    href={project.previewUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 text-center px-4 py-2 rounded-lg border-2 transition-all text-sm font-bold"
                                    style={{
                                        background: 'rgba(var(--secondary-rgb), 0.2)',
                                        borderColor: 'var(--secondary)',
                                        color: 'var(--text)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--secondary)';
                                        e.currentTarget.style.boxShadow = '0 0 15px var(--secondary)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(var(--secondary-rgb), 0.2)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    [EXECUTE]
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default ProjectModal;