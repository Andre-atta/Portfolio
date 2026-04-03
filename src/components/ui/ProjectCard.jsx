"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import TechnologyTag from "@/components/ui/TechnologyTag";

const ProjectCard = ({project, onClick}) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 20}}
            whileHover={{y: -6}}
            transition={{duration: 0.3}}
            onClick={onClick}
            className="flex flex-col w-[90vw] max-w-[340px] sm:max-w-none sm:w-96 rounded-2xl overflow-hidden border-2 border-[var(--primary)] bg-black/40 backdrop-blur-sm cursor-pointer shrink-0"
            style={{boxShadow: "0 0 20px rgba(75, 0, 130, 0.15)"}}
        >
            <div
                className="relative w-full h-56 sm:h-64 flex items-center justify-center overflow-hidden rounded-t-2xl"
                style={{
                    background: "radial-gradient(ellipse at center, rgba(var(--primary-rgb),0.12) 0%, #0a0a0a 70%)",
                }}
            >
                <div className="relative w-[88%] h-[82%] rounded-lg overflow-hidden"
                     style={{ filter: "drop-shadow(0 4px 18px rgba(0,0,0,0.7))" }}>
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-contain rounded-lg transition-transform duration-500 hover:scale-105"
                    />
                </div>
            </div>

            <div className="flex flex-col flex-1 p-5 gap-3">
                <div className="flex justify-between items-center w-full">
                    <h3 className="text-lg font-bold font-mono text-[var(--text)]">
                        {project.title}
                    </h3>
                    <span
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 rounded ml-3 shrink-0"
                        style={{
                            color: "var(--text)",
                            background: "transparent",
                            border: `1.5px solid ${project.status === "Completed" ? "var(--primary)" : "var(--secondary)"}`,
                        }}
                    >
                        {project.status}
                    </span>
                </div>

                <p className="text-sm text-neutral-400 leading-relaxed flex-1"
                   style={{textAlign: "justify"}}>
                    {project.preview}
                </p>
                <div className="flex justify-center flex-wrap gap-2 mt-1">
                    {project.technologies?.map((tech, i) => (
                        <TechnologyTag key={i} name={tech.name} icon={tech.icon} />
                    ))}
                </div>

                <p className="text-sm font-mono text-center" style={{color: "var(--accent)"}}>
                    Click to read more →
                </p>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
