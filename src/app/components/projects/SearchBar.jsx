import React from "react";

const SearchBar = ({ searchQuery, handleSearchChange }) => {
    return (
        <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-4 py-2 border border-[var(--primary)] rounded-lg bg-transparent"
        />
    );
};

export default SearchBar;