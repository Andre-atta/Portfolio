import React from "react";

const TechnologyTag = ({ name, icon: Icon }) => {
    return (
        <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono tracking-wide rounded transition-all duration-200 hover:brightness-110"
            style={{
                background: "rgba(255,255,255,0.06)",
                color: "#d1d5db",
            }}
        >
            {Icon && (
                <Icon
                    className="text-sm shrink-0"
                    style={{ color: "var(--secondary)" }}
                    aria-hidden="true"
                />
            )}
            {name}
        </span>
    );
};

export default TechnologyTag;