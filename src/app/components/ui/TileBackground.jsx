"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

// 1. Definiamo il singolo quadratino (Componente interno)
const Tile = () => {
    return (
        <motion.div
            // Stato iniziale (trasparente)
            initial={{
                backgroundColor: "rgba(0,0,0,0)"
            }}

            // Quando il mouse è sopra: Accensione ISTANTANEA
            whileHover={{
                backgroundColor: "var(--primary)",
                transition: { duration: 0, ease: "linear" }
            }}

            // Quando il mouse esce: Torna trasparente LENTAMENTE (effetto scia)
            animate={{
                backgroundColor: "rgba(0,0,0,0)",
                transition: { duration: 1, ease: "easeOut" }
            }}

            className="aspect-square bg-background border border-neutral-950 pointer-events-auto cursor-pointer"
        />
    );
};

// 2. Definiamo la griglia di sfondo (Componente principale esportato)
const TileBackground = () => {
    // Riduciamo i tile se l'utente ha impostazioni di accessibilità attive (opzionale ma consigliato)
    const prefersReducedMotion = useReducedMotion();
    const tilesToRender = useMemo(() => (prefersReducedMotion ? 200 : 400), [prefersReducedMotion]);

    return (
        <div
            className="fixed inset-0 w-screen h-screen grid"
            // Layout a griglia che si adatta automaticamente
            style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))",
                pointerEvents: "none"
            }}
        >
            {Array.from({ length: tilesToRender }, (_, i) => (
                <Tile key={i} />
            ))}
        </div>
    );
};

export default TileBackground;