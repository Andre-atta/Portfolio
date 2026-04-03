"use client";
import projectsData from "@/lib/projectsData";
import ProjectCard from "@/components/ui/ProjectCard";
import TabButton from "@/components/button/TabButton";
import { motion, AnimatePresence } from "framer-motion";
import ProjectModal from "@/components/modal/ProjectModal";
import React, { useState, useMemo, useCallback } from "react";

const TABS = ["REACT", "UNI", "ALL", "WEB", "MOBILE"];

const ProjectsSection = () => {
    const [activeTab, setActiveTab] = useState("ALL");
    const [selectedProject, setSelectedProject] = useState(null);

    const openModal = useCallback((project) => setSelectedProject(project), []);
    const closeModal = useCallback(() => setSelectedProject(null), []);

    const filteredProjects = useMemo(() => {
        if (activeTab === "ALL") return projectsData;
        return projectsData.filter((p) =>
            p.tag?.some((t) => t.toUpperCase() === activeTab)
        );
    }, [activeTab]);

    // TODO: quando i progetti superano 1 riga (> ~6 card con w-72),
    // il controller scende fuori dallo snap-screen e la UX ne risente.
    // Soluzioni future da valutare:
    //   1. Paginazione: mostrare N card per pagina con prev/next nel controller
    //   2. Scroll interno: dare un'altezza fissa al wrapper card con overflow-y-auto
    //   3. Aumentare h-screen a min-h-screen e gestire lo snap diversamente
    //   4. Carousel orizzontale per le card

    return (
        <section
            className="relative w-full min-h-screen md:h-screen flex flex-col justify-start md:justify-between items-center gap-10 md:gap-16 px-4 sm:px-6 xl:px-8 pt-24 md:pt-40 pb-10 md:pb-12"
            id="projects"
        >
            {/* GRIGLIA CARD */}
            <div className="flex flex-wrap justify-center gap-10 md:gap-24 w-full">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={() => openModal(project)}
                            />
                        ))
                    ) : (
                        <p className="text-center text-neutral-500 font-mono py-12">
                            Nessun progetto in questa categoria.
                        </p>
                    )}
                </AnimatePresence>
            </div>

            {/* CONTROLLER */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="mt-2 md:mt-4 flex flex-col rounded-2xl overflow-hidden border-b-2 border-transparent bg-black/40 backdrop-blur-sm cursor-pointer px-4 md:px-6"
                style={{
                    borderImage: "linear-gradient(to bottom right, var(--primary), var(--accent)) 1",
                    background: "transparent"
                }}
            >
                <div className="w-full flex justify-center">
                    <div className="flex gap-4 md:gap-8 flex-wrap justify-center">
                        {TABS.map((tab) => (
                            <TabButton
                                key={tab}
                                isActive={activeTab === tab}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </TabButton>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Modale progetto */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal project={selectedProject} onClose={closeModal} />
                )}
            </AnimatePresence>
        </section>
    );
};

export default ProjectsSection;
