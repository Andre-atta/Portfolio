"use client";
import dynamic from "next/dynamic";
import projectsData from "@/lib/projectsData";
import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const ProjectCard = dynamic(() => import("../ui/ProjectCard"), { ssr: false });
const ProjectModal = dynamic(() => import("../modal/ProjectModal"), { ssr: false });

const ProjectsSection = () => {
    const [activeTag, setActiveTag] = useState("All");
    const [selectedProject, setSelectedProject] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(6);
    const loadMoreRef = useRef(null);

    const prefersReducedMotion = useReducedMotion();

    const tags = useMemo(() => {
        const tagSet = new Set(["All"]);
        projectsData.forEach((p) => p.tag?.forEach((t) => t !== "All" && tagSet.add(t)));
        return Array.from(tagSet);
    }, []);

    const filteredProjects = useMemo(
        () => projectsData.filter((p) => activeTag === "All" || p.tag?.includes(activeTag)),
        [activeTag]
    );

    const openModal = useCallback((project) => {
        setSelectedProject(project);
        setModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setModalOpen(false);
        setTimeout(() => setSelectedProject(null), 200);
    }, []);

    useEffect(() => {
        if (!loadMoreRef.current) return undefined;
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting)
                        setVisibleCount((prev) => Math.min(prev + 3, filteredProjects.length));
                });
            },
            { threshold: 0.1 }
        );
        obs.observe(loadMoreRef.current);
        return () => obs.disconnect();
    }, [filteredProjects.length]);

    return (
        <section
            className="w-full min-h-screen flex flex-col items-center justify-center py-12 px-4 space-y-8"
            id="projects"
        >
            {/* ===== CONSOLE FILTER ===== */}
            <div
                className="w-full max-w-6xl rounded-lg overflow-hidden"
                style={{ border: "4px solid var(--primary)" }}
            >
                <div
                    className="flex items-center justify-between px-4 py-2 border-b-2"
                    style={{ borderColor: "var(--secondary)", background: "var(--background)" }}
                >
                    <span
                        className="text-lg font-bold font-mono"
                        style={{ color: "var(--accent)", textShadow: "0 0 8px var(--accent)" }}
                    >
                        ◆ PROJECT.CONSOLE
                    </span>
                    <div className="text-xs font-mono" style={{ color: "var(--secondary)" }}>
                        PROJECTS: {filteredProjects.length}/{projectsData.length}
                    </div>
                </div>

                <div className="p-3 font-mono text-sm" style={{ background: "var(--background)" }}>
                    <div className="flex flex-wrap gap-2 items-center">
                        <span style={{ color: "var(--secondary)" }}>$</span>
                        <span style={{ color: "var(--accent)" }}>projects --filter</span>
                        {tags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => { setActiveTag(tag); setVisibleCount(6); }}
                                className="px-2 py-1 border-2 transition-all duration-200 font-mono text-xs"
                                style={
                                    activeTag === tag
                                        ? { background: "var(--primary)", color: "var(--text)", borderColor: "var(--primary)" }
                                        : { background: "transparent", color: "var(--primary)", borderColor: "var(--primary)" }
                                }
                            >
                                {tag.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ===== CARDS GRID ===== */}
            <div className="w-full max-w-6xl">
                {filteredProjects.length === 0 ? (
                    <div
                        className="text-center p-8 font-mono"
                        style={{ color: "var(--secondary)" }}
                    >
                        NO PROJECTS FOUND
                    </div>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 font-mono">
                        {filteredProjects.slice(0, visibleCount).map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={openModal}
                                prefersReducedMotion={prefersReducedMotion}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div ref={loadMoreRef} className="h-1" />

            <ProjectModal open={modalOpen} onClose={closeModal} project={selectedProject} />
        </section>
    );
};

export default ProjectsSection;
