"use client";
import React, { useMemo, useEffect, useRef, useState } from "react";

const TILE_SIZE = 70;

const Tile = React.memo(({ id }) => (
    <div id={`tile-${id}`} className="tile border-r border-b border-white/[0.02]" />
));
Tile.displayName = "Tile";

const TileBackground = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [tileCount, setTileCount] = useState(0);
    const gridColsRef = useRef(0);

    useEffect(() => {
        const calcTiles = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) {
                const cols = Math.ceil(window.innerWidth / TILE_SIZE);
                const rows = Math.ceil(window.innerHeight / TILE_SIZE);
                gridColsRef.current = cols;
                setTileCount(cols * rows);
            }
        };
        calcTiles();
        window.addEventListener("resize", calcTiles);
        return () => window.removeEventListener("resize", calcTiles);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const handleMouseMove = (e) => {
            const col   = Math.floor(e.clientX / TILE_SIZE);
            const row   = Math.floor(e.clientY / TILE_SIZE);
            const index = row * gridColsRef.current + col;

            const tile = document.getElementById(`tile-${index}`);
            if (!tile) return;

            tile.style.backgroundColor = "var(--primary)";
            tile.style.transition = "none";
            setTimeout(() => {
                tile.style.backgroundColor = "transparent";
                tile.style.transition = "background-color 1000ms ease-out";
            }, 10);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isMobile]);

    const tiles = useMemo(
        () => Array.from({ length: tileCount }, (_, i) => <Tile key={i} id={i} />),
        [tileCount]
    );

    // MOBILE: griglia CSS pura, zero tile nel DOM, zero JS overhead
    if (isMobile) {
        return (
            <div
                className="fixed inset-0 w-screen h-screen z-0 pointer-events-none"
                aria-hidden="true"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)",
                    backgroundSize: `${TILE_SIZE}px ${TILE_SIZE}px`,
                }}
            />
        );
    }

    // DESKTOP: tile interattivi, numero esatto calcolato sulla viewport
    return (
        <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div
                className="w-full h-full border-t border-l border-white/[0.02]"
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${gridColsRef.current}, ${TILE_SIZE}px)`,
                    gridAutoRows: `${TILE_SIZE}px`,
                }}
            >
                {tiles}
            </div>
        </div>
    );
};

export default TileBackground;
