import React from "react";

const RoundedEmpty = ({ text, onClick, children }) => {
    return (
        <button
            className="inline-block w-full  rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] hover:bg-slate-800 text-[var(--text)] transition-colors duration-200 p-1"
            onClick={onClick}
        >
            <span className="bg-[var(--background)] hover:bg-slate-800 rounded-xl text-sm px-6 py-2 flex items-center justify-center w-full">
                {children && <span className="mr-3">{children}</span>}
                {text && <span className="text-sm font-semibold">{text}</span>}
            </span>
        </button>
    );
};

export default RoundedEmpty;