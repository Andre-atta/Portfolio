import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import TechnologyTag from "@/app/components/ui/TechnologyTag";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";

const ProjectCardList = ({ imgUrl, title, description, gitUrl, previewUrl, technologies, status }) => {
    return (
        <motion.div
            className="flex flex-col md:flex-row items-center bg-[white] bg-opacity-5 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-[var(--primary)] mt-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
        >
            {/* Contenitore per l'immagine e i bottoni */}
            <div className="w-full md:w-1/3 h-48 md:h-64 bg-cover bg-center relative">
                {/* Immagine del progetto */}
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${imgUrl})` }}
                />
                {/* Overlay con i bottoni */}
                <motion.div
                    className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center gap-4"
                    whileHover={{ opacity: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    transition={{ duration: 0.3 }}
                    initial={{ opacity: 0 }}
                >
                    {/* Bottone per la repository GitHub */}
                    <Link
                        href={gitUrl}
                        className="text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-colors duration-300"
                    >
                        <CodeBracketIcon className="h-6 w-6" />
                    </Link>
                    {/* Bottone per il link alla pagina web */}
                    <Link
                        href={previewUrl}
                        className="text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-colors duration-300"
                    >
                        <EyeIcon className="h-6 w-6" />
                    </Link>
                </motion.div>
            </div>

            {/* Contenuto della card (titolo, descrizione, tecnologie, ecc.) */}
            <div className="w-full md:w-2/3 p-4">
                <div className="flex items-center justify-between">
                    <h5 className="text-[var(--secondary)] text-xl font-semibold mb-2">{title}</h5>
                    <span className={`text-sm font-semibold px-2 py-1 rounded-full ${status === "Completed" ? "bg-green-500" : status === "In Progress" ? "bg-yellow-500" : "bg-gray-500"}`}>
                        {status}
                    </span>
                </div>
                <p className="text-[var(--text)] mb-4">{description}</p>
                <div className="mt-4">
                    <h6 className="text-sm text-[var(--text)] font-semibold mb-2">Technologies:</h6>
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

export default ProjectCardList;