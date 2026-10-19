"use client";
import React, { useState } from "react"

const TabButton = ({ isActive, onClick, children }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative pb-2 font-mono text-md font-semibold transition-colors duration-300 capitalize"
            style={{
                color: isActive || isHovered ? "var(--secondary)" : "var(--text)",
            }}
        >
            {children}
        </button>
    );
};

export default TabButton;


