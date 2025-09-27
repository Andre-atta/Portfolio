"use client";
import { motion } from "framer-motion";
import React, { useMemo, useEffect, useState } from "react";

const generateLines = (count, width, height) => {
    const lines = [];
    for (let i = 0; i < count; i++) {
        const x1 = Math.random() * width;
        const y1 = 0;
        const x2 = Math.random() * width;
        const y2 = height;
        lines.push({ x1, y1, x2, y2 });
    }
    return lines;
};

const NeonGrid = ({ width = 1440, height = 900, lineCount = 20, active = false }) => {
    const [key, setKey] = useState(0);

    useEffect(() => {
        if (active) {
            setKey(prev => prev + 1);
        }
    }, [active]);

    const lines = useMemo(() => generateLines(lineCount, width, height), [lineCount, width, height]);

    return (
        <svg
            key={key}
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
        >
            {lines.map((line, i) => (
                <line
                    key={`base-${i}`}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="var(--primary)"
                    strokeWidth="0.5"
                    strokeOpacity="0.3"
                />
            ))}

            {lines.map((line, i) => {
                const length = Math.hypot(line.x2 - line.x1, line.y2 - line.y1);
                const dash = length * 0.05;
                return (
                    <motion.line
                        key={`glow-${i}`}
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke={`url(#gradient-${i})`}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeDasharray={`${dash} ${length}`}
                        strokeDashoffset={length}
                        filter="url(#glow)"
                        initial={{ strokeDashoffset: length }}
                        animate={active ? { strokeDashoffset: 0 } : false}
                        transition={{
                            duration: 7,
                            repeat: active ? Infinity : 0,
                            delay: i * 1.5,
                            ease: "linear",
                        }}
                    />

                );
            })}

            {/* Gradient dinamico per coda */}
            <defs>
                {lines.map((_, i) => (
                    <linearGradient id={`gradient-${i}`} key={i}>
                        <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0" />
                    </linearGradient>
                ))}

                <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
        </svg>
    );
};

export default NeonGrid;
