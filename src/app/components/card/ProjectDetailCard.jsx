import React from "react";
import Link from "next/link";
import Image from "next/image";
import TechnologyTag from "../ui/TechnologyTag";
import { CodeBracketIcon, EyeIcon, XMarkIcon} from "@heroicons/react/16/solid";

const ProjectDetailCard = ({ project, onClose }) => {
    return (
        <div className="fixed inset-0 bg-[#121212] bg-opacity-85 z-50 flex items-center justify-center p-6">
            <div className="bg-[var(--background)] rounded-lg border-2 border-[var(--primary)] p-8 max-w-2xl w-full shadow-xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-[var(--primary)]">
                        {project.title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-[var(--text)] hover:text-[var(--primary)] transition-colors"
                    >
                        <XMarkIcon className="h-8 w-8" />
                    </button>
                </div>

                <Image
                    width={800}
                    height={400}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <p className="text-[var(--text)] text-lg mb-6 text-center leading-relaxed">
                    {project.description}
                </p>
                <div className="mb-6">
                    <h6 className="text-lg font-semibold text-[var(--secondary)] border-b-2 border-[var(--primary)] mb-4 text-center">
                        TECHNOLOGIES:
                    </h6>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {project.technologies.map((tech, index) => (
                            <TechnologyTag key={index} technology={tech} />
                        ))}
                    </div>
                </div>
                <div className="flex justify-center gap-4">
                    <Link
                        href={project.gitUrl}
                        className="flex items-center gap-2 px-6 py-3 bg-[var(--secondary)] text-white rounded-lg hover:bg-[var(--primary)] transition-colors"
                    >
                        <CodeBracketIcon className="h-6 w-6" />
                        <span>View Code</span>
                    </Link>
                    <Link
                        href={project.previewUrl}
                        className="flex items-center gap-2 px-6 py-3 bg-[var(--secondary)] text-white rounded-lg hover:bg-[var(--primary)] transition-colors"
                    >
                        <EyeIcon className="h-6 w-6" />
                        <span>Live Demo</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailCard;