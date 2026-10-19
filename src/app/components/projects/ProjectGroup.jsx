import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectEntry from "./ProjectEntry";

const ProjectGroup = ({ title, items, icon, isExpanded, onToggle, type }) => {
    return (
        <div className="mb-6">
            <button
                onClick={onToggle}
                className="flex items-center gap-3 w-full text-left mb-4 group transition-all"
                style={{
                    color: 'var(--accent)',
                    textShadow: isExpanded ? '0 0 10px var(--accent)' : 'none'
                }}
            >
                <motion.span
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-lg"
                >
                    ▶
                </motion.span>
                <span className="text-base sm:text-lg font-bold group-hover:translate-x-1 transition-transform">
          {icon} {title}
        </span>
                <span className="text-xs opacity-60 ml-2">({items.length})</span>
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="space-y-4 pl-6 border-l-2" style={{ borderColor: 'var(--primary)' }}>
                            {items.map((project, idx) => (
                                <ProjectEntry key={idx} project={project} type={type} index={idx} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectGroup;