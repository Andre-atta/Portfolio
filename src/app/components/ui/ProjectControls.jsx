import React from "react";
import ProjectTag from "@/app/components/ProjectTag";
import {RectangleStackIcon, Squares2X2Icon, FunnelIcon} from "@heroicons/react/16/solid";

const ProjectControls = ({ tag, handleTagChange, setViewMode, showFilterMenu, setShowFilterMenu, filterMenuRef }) => {
    return (
        <div className="flex items-center gap-4">
            <div className="hidden sm:flex gap-4">
                <button
                    onClick={() => setViewMode("list")}
                    className="p-2 border border-[var(--primary)] rounded-lg text-[var(--text)] hover:bg-[var(--secondary)]"
                >
                    <RectangleStackIcon className="h-6 w-6" />
                </button>
                <button
                    onClick={() => setViewMode("grid")}
                    className="p-2 border border-[var(--primary)] rounded-lg text-[var(--text)] hover:bg-[var(--secondary)]"
                >
                    <Squares2X2Icon className="h-6 w-6" />
                </button>
            </div>

            <div className="relative">
                <button
                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                    className="p-2 border border-[var(--primary)] rounded-lg text-[var(--text)] hover:bg-[var(--secondary)]"
                >
                    <FunnelIcon className="h-6 w-6" />
                </button>
                {showFilterMenu && (
                    <div ref={filterMenuRef} className="absolute right-0 mt-2 w-48 bg-[var(--background)] border border-[var(--primary)] rounded-lg shadow-lg z-10">
                        <div className="p-2">
                            <ProjectTag onClick={handleTagChange} name="All" isSelected={tag === "All"} />
                            <ProjectTag onClick={handleTagChange} name="Web" isSelected={tag === "Web"} />
                            <ProjectTag onClick={handleTagChange} name="Uni" isSelected={tag === "Uni"} />
                            <ProjectTag onClick={handleTagChange} name="Mobile" isSelected={tag === "Mobile"} />
                            <ProjectTag onClick={handleTagChange} name="Other" isSelected={tag === "Other"} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectControls;