import React from "react";

const ProjectTag = ({ name, onClick, isSelected }) => {
    const buttonStyles = isSelected
        ? "text-[var(--text)] bg-[var(--primary)]"
        : "text-[var(--text)] bg-transparent hover:bg-[var(--primary)]";

    return (
        <button
            className={`${buttonStyles} w-full text-left px-4 py-2 rounded-lg transition-colors duration-200`}
            onClick={() => onClick(name)}
        >
            {name}
        </button>
    );
};

export default ProjectTag;