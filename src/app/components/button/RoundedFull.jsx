import React from "react";

const RoundedFull = ({ text, onClick }) => {
    return (
        <button
            className="inline-block w-full  rounded-xl mr-6 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)]
            text-[var(--text)] px-8 py-3 text-sm font-semibold transition-colors duration-200"
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default RoundedFull;