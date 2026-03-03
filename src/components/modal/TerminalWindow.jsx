import React, { useState, useEffect } from "react";

const TerminalWindow = ({ title, children, delay = 0, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div
            className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${className}`}
            style={{
                background: 'rgba(0, 0, 0, 0.8)',
                border: '2px solid var(--primary)',
                borderRadius: '8px',
                boxShadow: '0 0 20px rgba(var(--primary-rgb), 0.3), inset 0 0 20px rgba(var(--primary-rgb), 0.1)',
            }}
        >
            <div
                className="flex items-center justify-between px-4 py-2 border-b-2"
                style={{ borderColor: 'var(--secondary)', background: 'var(--primary-lightest)' }}
            >
                <div className="w-16" />
                <span className="text-sm font-mono font-bold flex-1 text-center" style={{ color: 'var(--accent)', textShadow: '0 0 8px var(--accent)' }}>
        {title}
    </span>
                <div className="flex gap-2 justify-end w-16">
                    <svg width="16" height="16" viewBox="0 0 16 16" className="align-middle">
                        <rect x="4" y="12" width="8" height="2" fill="var(--accent)"/>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 16 16">
                        <rect x="4" y="4" width="8" height="8" fill="none" stroke="var(--accent)" strokeWidth="2"/>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 16 16">
                        <line x1="4" y1="4" x2="12" y2="12" stroke="var(--accent)" strokeWidth="2"/>
                        <line x1="12" y1="4" x2="4" y2="12" stroke="var(--accent)" strokeWidth="2"/>
                    </svg>
                </div>
            </div>
            <div className="p-4 font-mono">
                {children}
            </div>
        </div>
    );
};

export default TerminalWindow;
