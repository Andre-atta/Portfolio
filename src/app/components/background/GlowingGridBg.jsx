"use client";
import SocialTile from "./SocialTile";
import { useState, useEffect } from "react";

const GlowingGridBg = ({ socials = [] }) => {
    const [isPulsing, setIsPulsing] = useState(false);

    useEffect(() => {
        const pulseInterval = setInterval(() => {
            setIsPulsing(true);
            setTimeout(() => setIsPulsing(false), 2000);
        }, 8000);


        const initialTimeout = setTimeout(() => {
            setIsPulsing(true);
            setTimeout(() => setIsPulsing(false), 2000);
        }, 3000);

        return () => {
            clearInterval(pulseInterval);
            clearTimeout(initialTimeout);
        };
    }, []);


    const totalTiles = 380;
    const socialPositions = [
        45,  /* Spotify - top-left area */ 63,  /* Letterboxd - top-right area */
        301, /* Instagram - bottom-left area */
    ];

    const tiles = Array.from({ length: totalTiles }, (_, i) => {
        const socialIndex = socialPositions.indexOf(i);
        const social = socialIndex !== -1 ? socials[socialIndex] : null;
        return { index: i, social };
    });

    return (
        <div
            className="absolute inset-0 w-full h-full grid"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))" }}
        >
            {tiles.map((tile) => (
                <SocialTile
                    key={tile.index}
                    social={tile.social}
                    isPulsing={isPulsing}
                />
            ))}
        </div>
    );
};

export default GlowingGridBg;