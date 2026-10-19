import React, {useState} from "react";
import {motion} from "framer-motion";

const ProjectEntry = ({ project, type, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="pl-4 relative group"
        >
            {/* Connector Line */}
            <div
                className="absolute left-0 top-3 w-4 h-0.5"
                style={{ background: 'var(--primary)' }}
            />

            {/* Main Content */}
            <div className="space-y-1">
                {/* Title Line */}
                <div className="flex items-center gap-2 flex-wrap">
          <span style={{ color: 'var(--secondary)' }} className="text-xs sm:text-sm">
            &gt;
          </span>
                    <span className="text-xs opacity-60">[{project.year}]</span>
                    <span
                        className="font-bold text-sm sm:text-base transition-all"
                        style={{
                            color: isHovered ? 'var(--accent)' : 'var(--text)',
                            textShadow: isHovered ? '0 0 8px var(--accent)' : 'none'
                        }}
                    >
            {project.title}
          </span>
                    {type === 'inProgress' && (
                        <span className="blink text-accent ml-1">_</span>
                    )}
                </div>

                {/* Tech Stack */}
                <div className="pl-4 text-xs sm:text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    <span style={{ color: 'var(--primary)' }}>└─</span> Tech:{" "}
                    <span style={{ color: 'var(--accent)' }}>
            {project.technologies.join(', ')}
          </span>
                </div>

                {/* Summary */}
                <div className="pl-4 text-xs sm:text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    <span style={{ color: 'var(--primary)' }}>└─</span> {project.summary}
                </div>

                {/* Progress Bar (for In Progress projects) */}
                {type === 'inProgress' && project.progress && (
                    <div className="pl-4 mt-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs" style={{ color: 'var(--primary)' }}>└─</span>
                            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden border border-purple-500/30">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${project.progress}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="h-full rounded-full"
                                    style={{
                                        background: 'linear-gradient(90deg, var(--primary), var(--secondary))'
                                    }}
                                />
                            </div>
                            <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>
                {project.progress}%
              </span>
                        </div>
                    </div>
                )}

                {/* Links */}
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pl-4 flex gap-3 mt-2 text-xs"
                    >
                        {project.link && project.link !== "/" && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 rounded border transition-all"
                                style={{
                                    borderColor: 'var(--primary)',
                                    color: 'var(--primary)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(75, 0, 130, 0.3)';
                                    e.currentTarget.style.boxShadow = '0 0 10px var(--primary)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                &gt; View Repo
                            </a>
                        )}
                        {project.demo && project.demo !== "/" && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 rounded border transition-all"
                                style={{
                                    borderColor: 'var(--secondary)',
                                    color: 'var(--secondary)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 0, 110, 0.3)';
                                    e.currentTarget.style.boxShadow = '0 0 10px var(--secondary)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                &gt; Demo
                            </a>
                        )}
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default ProjectEntry;