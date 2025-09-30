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
                style={{ borderColor: 'var(--secondary)', background: 'rgba(75, 0, 130, 0.3)' }}
            >
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm font-mono font-bold" style={{ color: 'var(--accent)', textShadow: '0 0 8px var(--accent)' }}>
                    {title}
                </span>
                <div className="w-3 h-3"></div>
            </div>
            <div className="p-4 font-mono">
                {children}
            </div>
        </div>
    );
};

export default TerminalWindow;

