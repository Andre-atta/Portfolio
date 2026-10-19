"use client";

const TagBadge = ({ tag }) => {
    return (
        <span
            className="px-3 py-1 rounded-full text-xs font-mono border transition-all"
            style={{
                borderColor: 'var(--secondary)',
                background: 'rgba(255, 0, 110, 0.2)',
                color: 'var(--secondary)'
            }}
        >
            #{tag}
        </span>
    );
};

export default TagBadge;