import React from "react";
import NavLink from "@/app/components/NavLink";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

const Header = ({ showAllProjects, setShowAllProjects }) => {
    return (
        <div className="border-b-2 border-[var(--primary)] flex justify-between items-center mt-4 mb-4">
            <div className="flex items-center gap-2">
                {showAllProjects && (
                    <button
                        className="sm:hidden text-[var(--text)] hover:text-[var(--primary)] transition-colors"
                        onClick={() => setShowAllProjects(false)}
                    >
                        <ArrowLeftIcon className="h-6 w-6" />
                    </button>
                )}
                <h2 className="text-left text-4xl font-bold text-[var(--secondary)] mb-2">
                    My Projects
                </h2>
            </div>

            {!showAllProjects && (
                <NavLink
                    href=" "
                    title="MORE ABOUT"
                    onClick={() => setShowAllProjects(true)}
                />
            )}
        </div>
    );
};

export default Header;