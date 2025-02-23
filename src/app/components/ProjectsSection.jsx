"use client";
import Link from "next/link";
import ProjectTag from "./ProjectTag";
import { motion } from "framer-motion";
import React, { useState } from "react";
import ProjectCard from "./card/ProjectCard";
import projectsData from "@/app/utils/projectsData";
import ProjectCardList from "./card/ProjectCardList";
import TechnologyTag from "@/app/components/ui/TechnologyTag";
import RoundedEmpty from "@/app/components/button/RoundedEmpty";
import { AdjustmentsHorizontalIcon, ArrowLeftIcon, Squares2X2Icon, RectangleStackIcon, CodeBracketIcon, EyeIcon } from "@heroicons/react/16/solid";

const ProjectsSection = () => {
    const [tag, setTag] = useState("All");
    const [viewMode, setViewMode] = useState("list");
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [showAllProjects, setShowAllProjects] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const handleTagChange = (newTag) => {
        setTag(newTag);
        setShowFilterMenu(false);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredProjects = projectsData.filter((project) =>
        project.tag.includes(tag) && project.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const initialProjects = filteredProjects.slice(0, 3);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
    };

    const handleCloseDetail = () => {
        setSelectedProject(null);
    };

    return (
        <section id="projects" className={`p-6 ${showAllProjects ? "fixed inset-0 bg-[var(--background)] z-50 overflow-y-auto" : ""}`}>
            {/* Applica la larghezza ridotta solo quando showAllProjects è true */}
            <div className={`container mx-auto ${showAllProjects ? "max-w-4xl" : ""}`}>
                <div className="border-b-2 border-[var(--primary)] flex justify-between items-center mt-4 mb-4">
                    <h2 className="text-left text-4xl font-bold text-[var(--secondary)]">
                        My Projects
                    </h2>
                    {!showAllProjects && (
                        <button
                            className="block text-[var(--text)] sm:text-xl rounded md:p-0 hover:text-[var(--secondary)]"
                            onClick={() => setShowAllProjects(true)}
                        >
                            MORE ABOUT
                        </button>
                    )}
                </div>
                {showAllProjects && (
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                        <div className="hidden sm:flex">
                            <RoundedEmpty
                                text="Back to Portfolio"
                                onClick={() => setShowAllProjects(false)}
                            >
                                <ArrowLeftIcon className="h-5 w-5" />
                            </RoundedEmpty>
                        </div>
                        <div className="sm:hidden flex items-center gap-2">
                            <button
                                onClick={() => setShowAllProjects(false)}
                                className="text-[var(--text)] hover:text-[var(--primary)] transition-colors"
                            >
                                <ArrowLeftIcon className="h-6 w-6" />
                            </button>
                            <h2 className="text-2xl font-bold text-[var(--secondary)]">
                                📖My Projects
                            </h2>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full sm:w-auto px-4 py-2 border border-[var(--primary)] rounded-lg text-[var(--text)] bg-transparent"
                            />
                            <div className="relative flex items-center gap-4">
                                <div className="hidden sm:flex gap-4">
                                    <button
                                        onClick={() => setViewMode("list")}
                                        className={`p-2 border border-[var(--primary)] rounded-lg text-[var(--text)] hover:bg-[var(--primary)] hover:text-white transition-colors ${viewMode === "list" ? "bg-[var(--primary)] text-white" : ""}`}
                                    >
                                        <RectangleStackIcon className="h-6 w-6" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode("grid")}
                                        className={`p-2 border border-[var(--primary)] rounded-lg text-[var(--text)] hover:bg-[var(--primary)] hover:text-white transition-colors ${viewMode === "grid" ? "bg-[var(--primary)] text-white" : ""}`}
                                    >
                                        <Squares2X2Icon className="h-6 w-6" />
                                    </button>
                                </div>
                                <button
                                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                                    className="p-2 border border-[var(--primary)] rounded-lg text-[var(--text)] hover:bg-[var(--primary)] hover:text-white transition-colors"
                                >
                                    <AdjustmentsHorizontalIcon className="h-6 w-6" />
                                </button>
                                {showFilterMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-[var(--background)] border border-[var(--primary)] rounded-lg shadow-lg z-10">
                                        <div className="p-2">
                                            <ProjectTag onClick={handleTagChange} name="All" isSelected={tag === "All"} />
                                            <ProjectTag onClick={handleTagChange} name="Web" isSelected={tag === "Web"} />
                                            <ProjectTag onClick={handleTagChange} name="Mobile" isSelected={tag === "Mobile"} />
                                            <ProjectTag onClick={handleTagChange} name="Other" isSelected={tag === "Other"} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`${viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-6" : "space-y-8"}`}
                >
                    {(showAllProjects ? filteredProjects : initialProjects).map((project, index) => (
                        viewMode === "grid" ? (
                            <ProjectCard
                                key={project.id}
                                title={project.title}
                                description={project.description}
                                imgUrl={project.image}
                                gitUrl={project.gitUrl}
                                previewUrl={project.previewUrl}
                                technologies={project.technologies}
                                status={project.status}
                                onClick={() => handleProjectClick(project)}
                            />
                        ) : (
                            <ProjectCardList
                                key={project.id}
                                title={project.title}
                                description={project.description}
                                imgUrl={project.image}
                                gitUrl={project.gitUrl}
                                previewUrl={project.previewUrl}
                                technologies={project.technologies}
                                status={project.status}
                                onClick={() => handleProjectClick(project)}
                            />
                        )
                    ))}
                </motion.div>
            </div>

            {/* Visualizzazione dettagliata del progetto */}
            {selectedProject && (
                <div className="fixed inset-0 bg-[var(--background)] bg-opacity-95 z-50 flex items-center justify-center p-6">
                    <div className="bg-[var(--background)] border-2 border-[var(--primary)] rounded-lg p-6 max-w-2xl w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-[var(--secondary)]">{selectedProject.title}</h2>
                            <button
                                onClick={handleCloseDetail}
                                className="text-[var(--text)] hover:text-[var(--primary)] transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-48 md:h-64 object-cover rounded-lg mb-4" />
                        <p className="text-[var(--text)] mb-4">{selectedProject.description}</p>
                        <div className="mb-4">
                            <h6 className="text-sm font-semibold mb-2">Technologies:</h6>
                            <div className="flex flex-wrap">
                                {selectedProject.technologies.map((tech, index) => (
                                    <TechnologyTag key={index} technology={tech} />
                                ))}
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <Link
                                href={selectedProject.gitUrl}
                                className="text-[var(--text)] p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-colors duration-300"
                            >
                                <CodeBracketIcon className="h-6 w-6" />
                            </Link>
                            <Link
                                href={selectedProject.previewUrl}
                                className="text-[var(--text)] p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-colors duration-300"
                            >
                                <EyeIcon className="h-6 w-6" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProjectsSection;