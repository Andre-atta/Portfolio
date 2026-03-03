"use client";
import React from "react";
import { useMemo, useState, useEffect, useRef } from "react";

const TILE_COUNT_DESKTOP = 400;
const TILE_COUNT_MOBILE = 100;
const MOBILE_BREAKPOINT = 768;

const Tile = React.memo(({ id }) => (
    <div
        id={`tile-${id}`}
        className="tile aspect-square border border-neutral-900"
    />
));

Tile.displayName = "Tile";

const TileBackground = ({ className }) => {
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if(!containerRef.current) return;

            const firstTile = containerRef.current.firstElementChild;
            if(!firstTile) return;

            // 1. calcola dimensioni tile -> ma di base noi la dimensione la abbiamo varia solo in base allo schermo
            const tileRect = firstTile.getBoundingClientRect();
            const tileWidth = tileRect.width;
            const tileHeight = tileRect.height;

            if (tileWidth === 0 || tileHeight === 0) return;

            // 2. calcola colonna e riga basandosi sulla pos mouse
            const col = Math.floor(e.clientX / tileWidth);
            const row = Math.floor(e.clientY / tileHeight);

            // 3. Calcola il numero di colonne attuali
            const gridStyle = window.getComputedStyle(containerRef.current);
            const gridCols = gridStyle.gridTemplateColumns.split(" ").length;

            // 4. trova l'indice
            const index = row * gridCols + col;

            // 5. trova elemento a cui applicare l'effetto
            const targetTile = document.getElementById(`tile-${index}`);

            if(targetTile) {
                // tile acceso
                targetTile.style.backgroundColor = "var(--primary)";
                targetTile.style.opacity = "0.2";
                targetTile.style.transition = "none";

                // tile spento
                setTimeout (() => {
                    targetTile.style.backgroundColor = "transparent";
                    targetTile.style.opacity = "1";
                    targetTile.style.transition = "background-color 1000ms ease-out";
                }, 10);
            }
        };

        // usa passive epr performance dello scroll
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isMobile]);

    const count = isMobile ? TILE_COUNT_MOBILE : TILE_COUNT_DESKTOP;
    const tiles = useMemo(
        () => Array.from({ length: count }, (_, i) => <Tile key={i} id={i} />),
        [count]
    );

    return (
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
            <div
                ref={containerRef}
                className="w-full h-full grid overflow-hidden opacity-30"
                style={{
                    // Usa auto-fill con dimensione fissa per calcoli matematici precisi
                    gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? "60px" : "70px"}, 1fr))`,
                }}
            >
                {tiles}
            </div>
        </div>
    );
};

export default TileBackground;