"use client";

export default function AnimatedLogo() {
    return (
        <div className="relative overflow-hidden select-none">
            <h1 className="text-4xl md:text-6xl font-semibold bg-gradient-to-r
                    from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
                Andre-atta
            </h1>

            <div className="absolute top-0 left-0 w-full animate-cascade">
                {Array.from({ length: 10 }).map((_, i) => (
                    <p
                        key={i}
                        className="text-4xl md:text-6xl font-semibold bg-gradient-to-r
                                from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent"
                        style={{
                            marginTop: i === 0 ? "1.5rem" : "0.5rem",
                            opacity: Math.max(0.6 - i * 0.055, 0.08),
                        }}
                    >
                        Andre-atta
                    </p>
                ))}
            </div>
        </div>
    );
}

