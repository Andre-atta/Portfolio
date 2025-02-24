import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import TechnologyTag from "@/app/components/ui/TechnologyTag";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl, technologies, status, isExpanded, onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className={`rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[var(--primary)] ${isExpanded ? "col-span-2" : ""}`}
            onClick={onClick}
        >
            {/* Immagine del progetto */}
            <div className="w-full h-48 md:h-64 bg-cover bg-center relative">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${imgUrl})` }}
                />
                {/* Overlay scuro per migliorare il contrasto */}
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                {/* Bottoni visibili solo al passaggio del mouse */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
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
            <div className="w-full p-6 bg-[var(--background)]">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-2xl font-bold text-[var(--secondary)] truncate">
                        {title}
                    </h5>
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full 
                            ${status === "Completed" ? "bg-green-500" : status === "In Progress" ? "bg-yellow-500" : "bg-gray-500"}`}
                    >
                        {status}
                    </span>
                </div>
                <p className="text-[var(--text)] text-justify text-sm lg:text-lg leading-relaxed line-clamp-3 mb-4">
                    {description}
                </p>
                <div className="mb-4">
                    <h6 className="text-lg font-semibold text-[var(--secondary)] mb-2">
                        Technologies:
                    </h6>
                    <div className="flex flex-wrap gap-2">
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