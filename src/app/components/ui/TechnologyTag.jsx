import React from "react";

const TechnologyTag = ({ technology }) => {
    return (
        <span
            className="relative px-2 py-1 rounded border-2 border-cyan-400/70 bg-slate-900/30 backdrop-blur-md shadow-[0_0_8px_#22d3ee33] text-xs text-cyan-200 font-mono tracking-wide transition-all duration-300 hover:border-cyan-300 hover:shadow-[0_0_16px_#22d3ee66]"
            style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.4) 0%, rgba(30, 41, 59, 0.3) 100%)',
                textShadow: '0 0 6px rgba(34, 211, 238, 0.4)'
            }}
        >
            {/* Glow base */}
            <span className="absolute left-1/2 -bottom-1 w-8 h-1 bg-cyan-400/40 rounded-full blur-md -translate-x-1/2 z-0" />
            <span className="relative z-10">{technology}</span>
        </span>
    );
};

export default TechnologyTag;