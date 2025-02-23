import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import TechnologyTag from "@/app/components/ui/TechnologyTag";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl, technologies, status }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
            <div
                className="h-48 md:h-64 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${imgUrl})` }}
            >
                <div className="overlay absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                    <Link
                        href={gitUrl}
                        className="text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-colors duration-300"
                    >
                        <CodeBracketIcon className="h-6 w-6" />
                    </Link>
                    <Link
                        href={previewUrl}
                        className="text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-colors duration-300 ml-2"
                    >
                        <EyeIcon className="h-6 w-6" />
                    </Link>
                </div>
            </div>
            <div className="p-4 bg-[var(--background)]">
                <div className="flex items-center justify-between">
                    <h5 className="text-[var(--text)] text-xl font-semibold mb-2">{title}</h5>
                    <span className={`text-sm font-semibold px-2 py-1 rounded-full ${status === "Completed" ? "bg-green-500" : status === "In Progress" ? "bg-yellow-500" : "bg-gray-500"}`}>
                        {status}
                    </span>
                </div>
                <p className="text-[var(--text)]">{description}</p>
                <div className="mt-4">
                    <h6 className="text-[var(--text)] text-sm font-semibold mb-2">Technologies:</h6>
                    <div className="flex flex-wrap">
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