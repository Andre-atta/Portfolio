import React from "react";

const ProjectTag = ({ name, onClick, isSelected }) => {
    const buttonStyles = isSelected
        ? "text-[var(--text)] border-[var(--primary)]"
        : "text-[var(--text)] border-[var(--secondary)] hover:border-[var(--primary)]";
    return (
        <button
            className={`${buttonStyles} rounded-full border-2 px-6 py-3 text-xl cursor-pointer`}
            onClick={() => onClick(name)}
        >
            {name}
        </button>
    );
};

export default ProjectTag;
