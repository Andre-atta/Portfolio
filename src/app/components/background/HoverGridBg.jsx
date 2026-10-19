import React from "react";
import Tile from "@/app/components/background/Tile";

const HoverGridBg = () => {
    return (
        <div
            className="absolute inset-0 w-full h-full grid"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))" }}
        >
            {Array.from({ length: 380 }, (_, i) => (
                <Tile key={i} />
            ))}
        </div>
    );
};

export default HoverGridBg;