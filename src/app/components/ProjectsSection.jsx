"use client";
import Header from "./projects/Header";
import { motion } from "framer-motion";
import SearchBar from "./projects/SearchBar";
import ProjectCard from "./card/ProjectCard";
import RoundedEmpty from "./button/RoundedEmpty";
import ProjectControls from "./ui/ProjectControls";
import projectsData from "@/app/utils/projectsData";
import ProjectCardList from "./card/ProjectCardList";
import ProjectDetailCard from "./card/ProjectDetailCard";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useRef, useState } from "react";

const ProjectsSection = () => {
    const filterMenuRef = useRef(null);
    const [expandedProject] = useState(null);
    const [tag, setTag] = useState("All");
    const [viewMode, setViewMode] = useState("list");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProject, setSelectedProject] = useState(null);
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [showAllProjects, setShowAllProjects] = useState(false);

    const handleTagChange = (newTag) => {
        setTag(newTag);
        setShowFilterMenu(false);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleProjectClick = (project) => {
        if (window.innerWidth < 680 && showAllProjects) {
            setShowAllProjects(true);
            setSelectedProject(project);
        } else if (window.innerWidth < 640)
            setShowAllProjects(true);
        else if (showAllProjects)
            setSelectedProject(project);
    };

    const handleCloseDetail = () => {
        setSelectedProject(null);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterMenuRef.current && !filterMenuRef.current.contains(event.target)) {
                setShowFilterMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const filteredProjects = projectsData.filter((project) =>
        project.tag.includes(tag) && project.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const initialProjects = filteredProjects.slice(0, 3);

    return (
        <section id="projects" className={`p-6 ${showAllProjects ? "fixed inset-0 bg-[var(--background)] z-50 overflow-y-auto" : ""}`}>
            <div className={`container mx-auto ${showAllProjects ? "max-w-4xl" : ""}`}>

                <Header showAllProjects={showAllProjects} setShowAllProjects={setShowAllProjects} />
                {showAllProjects && (
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                        <div className="hidden sm:flex">
                            <RoundedEmpty
                                text="Back to Portfolio"
                                onClick={() => setShowAllProjects(false)}
                            >
                                <ArrowLeftIcon className="h-6 w-5" />
                            </RoundedEmpty>
                        </div>

                        <div className="flex flex-row gap-4 w-full sm:w-auto">
                            <SearchBar searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
                            <ProjectControls
                                tag={tag}
                                handleTagChange={handleTagChange}
                                viewMode={viewMode}
                                setViewMode={setViewMode}
                                showFilterMenu={showFilterMenu}
                                setShowFilterMenu={setShowFilterMenu}
                                filterMenuRef={filterMenuRef}
                            />
                        </div>
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`${viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-6" : "space-y-8"}`}
                >
                    {(showAllProjects ? filteredProjects : initialProjects).map((project) => (
                        viewMode === "grid" ? (
                            <ProjectCard
                                key={project.id}
                                id={project.id}
                                imgUrl={project.image}
                                {...project}
                                isExpanded={expandedProject === project.id}
                                onClick={() => handleProjectClick(project)}
                            />
                        ) : (
                            <ProjectCardList
                                key={project.id}
                                id={project.id}
                                imgUrl={project.image}
                                {...project}
                                isExpanded={expandedProject === project.id}
                                onClick={() => handleProjectClick(project)}
                            />
                        )
                    ))}
                </motion.div>
            </div>
            {selectedProject && (
                <ProjectDetailCard project={selectedProject} onClose={handleCloseDetail} />
            )}
        </section>
    );
};

export default ProjectsSection;