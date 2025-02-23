import React from "react";

const TechnologyTag = ({ technology }) => {
    return (
        <span className="inline-block border-2 border-[var(--primary)] bg-[var(--background)] text-[var(--text)] text-sm px-3 py-1 rounded-xl mr-2 mb-2">
            {technology}
        </span>
    );
};

export default TechnologyTag;