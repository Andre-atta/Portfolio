import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import TechnologyTag from "@/app/components/ui/TechnologyTag";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl, technologies, status, isExpanded, onClick }) => {
    if (status === "Not Started")
        return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className={`rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[var(--primary)] ${isExpanded ? "col-span-2" : ""}`}
            onClick={onClick}
        >
            <div className="w-full h-36 md:h-48 bg-cover bg-center relative">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${imgUrl})` }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-t-lg"></div>
                <motion.div
                    className='absolute inset-0 flex items-center justify-center gap-4 opacity-0 hover:opacity-100 transition-opacity duration-300'
                    whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                >
                    {gitUrl && (
                        <Link
                            href={gitUrl}
                            className="text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-colors duration-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <CodeBracketIcon className="h-6 w-6" />
                        </Link>
                    )}
                    {previewUrl && (
                        <Link
                            href={previewUrl}
                            className="text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-colors duration-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <EyeIcon className="h-6 w-6" />
                        </Link>
                    )}
                </motion.div>
            </div>

            {/* Contenuto della card */}
            <div className="w-full p-4 bg-[var(--background)]">
                <div className="flex items-center justify-between mb-2">
                    <h5 className="text-xl font-bold text-[var(--secondary)] truncate">
                        {title}
                    </h5>
                    <span className={`text-sm font-semibold px-2 py-1 rounded-full 
                            ${status === "Completed" ? "bg-green-500" : "bg-yellow-500"}`}
                    >
                        {status}
                    </span>
                </div>
                <p className="text-[var(--text)] text-justify text-sm leading-relaxed line-clamp-3 mb-2">
                    {description}
                </p>
                <div className="mb-2">
                    <h6 className="text-base font-semibold text-[var(--secondary)] mb-1">
                        Technologies:
                    </h6>
                    <div className="flex flex-wrap gap-1">
                        {technologies.map((tech, index) => (
                            <TechnologyTag key={index} technology={tech} />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;