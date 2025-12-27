"use client";
import dynamic from "next/dynamic";
import projectsData from "@/app/utils/projectsData";
import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const ProjectCard = dynamic(() => import("@/app/components/projects/ProjectCard"), { ssr: false });
const ProjectModal = dynamic(() => import("./modal/ProjectModal"), { ssr: false });

const ProjectsSection = () => {
    const [activeTag, setActiveTag] = useState("All");
    const [selectedProject, setSelectedProject] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(6);
    const loadMoreRef = useRef(null);

    const prefersReducedMotion = useReducedMotion();

    // tags
    const tags = useMemo(() => {
        const tagSet = new Set(["All"]);
        projectsData.forEach((p) => p.tag?.forEach((t) => t !== "All" && tagSet.add(t)));
        return Array.from(tagSet);
    }, []);

    // filtro
    const filteredProjects = useMemo(() => {
        return projectsData.filter(
            (project) => activeTag === "All" || project.tag?.includes(activeTag)
        );
    }, [activeTag]);

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
                    if (entry.isIntersecting) {
                        setVisibleCount((prev) => Math.min(prev + 3, filteredProjects.length));
                    }
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
            {/* ================= HOLOGRAPHIC PROJECT CARDS ================= */}
            <div className="w-full max-w-6xl">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 font-mono">
                    {filteredProjects.length === 0 ? (
                        <div className="col-span-full text-center p-8 text-[var(--secondary)]">
                            NO PROJECTS AVAILABLE
                        </div>
                    ) : (
                        filteredProjects.slice(0, visibleCount).map((project) => (
                            <ProjectCard key={project.id} project={project} onClick={openModal} prefersReducedMotion={prefersReducedMotion} />
                        ))
                    )}
                </div>
            </div>
            <div ref={loadMoreRef} />

            <ProjectModal open={modalOpen} onClose={closeModal} project={selectedProject} />

            {/* ================= CONSOLE ================= */}
            <div className="w-full max-w-6xl border-4 border-[var(--primary)] rounded-lg overflow-hidden">
                {/* Header */}
                <div
                    className="flex items-center justify-between px-4 py-2 border-b-2"
                    style={{
                        borderColor: "var(--secondary)",
                        background: "var(--background)",
                    }}
                >
          <span
              className="text-lg font-bold font-mono"
              style={{ color: "var(--accent)", textShadow: "0 0 8px var(--accent)" }}
          >
            ◆ PROJECT.CONSOLE
          </span>
                    <div className="text-xs text-[var(--secondary)] font-mono">
                        PROJECTS: {filteredProjects.length}/{projectsData.length}
                    </div>
                </div>

                {/* Console input (filter simulation) */}
                <div className="bg-[var(--background)] p-3 font-mono text-sm">
                    <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-[var(--secondary)]">$</span>
                        <span className="text-[var(--accent)]">projects --filter</span>
                        <div className="flex gap-2">
                            {tags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => setActiveTag(tag)}
                                    className={`px-2 py-1 border-2 transition-all ${
                                        activeTag === tag
                                            ? "bg-[var(--primary)] text-black"
                                            : "border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--terminal-header)]"
                                    }`}
                                >
                                    {tag.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default ProjectsSection;
