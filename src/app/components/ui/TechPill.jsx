"use client";

const TechPill = ({ tech, variant = "default" }) => {
    const variants = {
        default: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        modal: "bg-purple-500/20 border-purple-500/50 text-purple-300 hover:bg-purple-500/30"
    };

    return (
        <span
            className={`text-xs px-2 py-1 rounded-full border font-mono transition-all ${variants[variant]}`}
            style={{
                borderColor: 'var(--primary)',
                background: 'rgba(75, 0, 130, 0.2)',
                color: 'var(--accent)'
            }}
        >
            {tech}
        </span>
    );
};

export default TechPill;