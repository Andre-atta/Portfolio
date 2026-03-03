import React from "react";

const GlowBlob = ({ className = "" }) => (
    <div
        className={`bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--primary)] to-transparent rounded-full h-80 w-80 blur-lg ${className}`}
    />
);

export default GlowBlob;