import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import TechnologyTag from "@/app/components/ui/TechnologyTag";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";

const ProjectCardList = ({ imgUrl, title, description, gitUrl, previewUrl, technologies, status, onClick }) => {
    if (status === "Not Started")
        return null;

    return (
        <motion.div
            className="flex flex-col md:flex-row items-center bg-[var(--background)] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[var(--primary)]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            onClick={onClick}
        >
            <div className="w-full md:w-1/3 h-48 md:h-64 bg-cover bg-center relative">
                <div
                    className="w-full h-full bg-cover bg-center rounded-l-lg"
                    style={{ backgroundImage: `url(${imgUrl})` }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-l-lg"></div>
                <motion.div
                    className="absolute inset-0 flex items-center justify-center gap-4"
                    whileHover={{ opacity: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    transition={{ duration: 0.3 }}
                    initial={{ opacity: 0 }}
                >
                    <Link
                        href={gitUrl}
                        className="text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-colors duration-300"
                    >
                        <CodeBracketIcon className="h-6 w-6" />
                    </Link>
                    <Link
                        href={previewUrl}
                        className="text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-colors duration-300"
                    >
                        <EyeIcon className="h-6 w-6" />
                    </Link>
                </motion.div>
            </div>

            <div className="w-full md:w-2/3 p-6 h-48 md:h-64 flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-2xl font-bold text-[var(--secondary)] truncate">
                            {title}
                        </h5>
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full 
                                        ${status === "Completed" ? "bg-green-500" : "bg-yellow-500"}`}
                        >
                            {status}
                        </span>
                    </div>
                    <p className="text-[var(--text)] text-justify text-sm lg:text-lg leading-relaxed line-clamp-3">
                        {description}
                    </p>
                </div>
                <div className="mb-4">
                    <h6 className="text-lg font-semibold text-[var(--secondary)] mt-2 mb-2">
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

export default ProjectCardList;