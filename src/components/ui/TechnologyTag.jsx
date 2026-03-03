import React from "react";

const TechnologyTag = ({ technology }) => {
    return (
        <span
            className="relative px-2 py-1 rounded border-2 bg-slate-900/30 backdrop-blur-md text-xs font-mono tracking-wide transition-all duration-300"
            style={{
                borderColor: 'var(--accent)',
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.4) 0%, rgba(30, 41, 59, 0.3) 100%)',
                color: 'var(--accent)',
                textShadow: `0 0 6px rgba(var(--accent-rgb), 0.4)`,
                boxShadow: `0 0 8px rgba(var(--accent-rgb), 0.2)`,
            }}
        >
            {/* Glow base */}
            <span
                className="absolute left-1/2 -bottom-1 w-8 h-1 rounded-full blur-md -translate-x-1/2 z-0"
                style={{ background: `rgba(var(--accent-rgb), 0.4)` }}
            />
            <span className="relative z-10">{technology}</span>
        </span>
    );
};

export default TechnologyTag;