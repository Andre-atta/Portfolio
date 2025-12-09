"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LetterboxdWidget = () => {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const letterboxdUser = "7DcNB";

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/letterboxd?user=${letterboxdUser}&limit=6`);
                const data = await res.json();

                if (data.items && data.items.length > 0) {
                    setFilms(data.items);
                    setError(null);
                } else {
                    setError("No films found");
                }
            } catch (err) {
                console.error("Error fetching Letterboxd data:", err);
                setError("Failed to load films");
            } finally {
                setLoading(false);
            }
        };

        fetchFilms();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const renderStars = (rating) => {
        if (!rating) return null;
        const stars = Math.round(rating);
        return (
            <div className="flex gap-0.5 text-[10px]">
                {[...Array(5)].map((_, i) => (
                    <span
                        key={i}
                        className={i < stars ? 'text-[var(--secondary)]' : 'text-white/20'}
                    >
                        ★
                    </span>
                ))}
            </div>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-md sm:max-w-lg mx-auto rounded-2xl border border-white/10 px-4 py-5 sm:px-6 backdrop-blur"
            style={{
                background: 'linear-gradient(145deg, rgba(5, 8, 15, 0.92), rgba(5, 8, 15, 0.75))',
                boxShadow: '0 18px 40px rgba(0, 0, 0, 0.45)'
            }}
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--secondary)' }}>
                    <span className="text-black font-semibold">LB</span>
                </div>
                <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--secondary)' }}>Letterboxd</p>
                    <p className="text-xs text-white/60">Latest screenings</p>
                </div>
            </div>
            
            {/* Films Grid */}
            {loading ? (
                <div className="flex min-h-[180px] items-center justify-center text-white/40 text-sm">Loading films...</div>
            ) : error ? (
                <div className="flex min-h-[180px] items-center justify-center text-white/60 text-sm">{error}</div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-4">
                    {films.map((film, idx) => (
                        <motion.a
                            key={idx}
                            href={film.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.08 }}
                            className="relative block aspect-[2/3] overflow-hidden rounded-xl border border-white/10 bg-black/40"
                        >
                            {film.image ? (
                                <>
                                    <img src={film.image} alt={film.title} className="h-full w-full object-cover" />
                                    <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/90 via-black/65 to-transparent">
                                        <p className="text-[11px] font-semibold text-white line-clamp-2">{film.title}</p>
                                        {film.rating && <div className="mt-1">{renderStars(film.rating)}</div>}
                                        {film.date && (
                                            <span className="text-[10px] text-white/60">{formatDate(film.date)}</span>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="flex h-full items-center justify-center px-2 text-center text-xs text-white/60">
                                    {film.title}
                                </div>
                            )}
                        </motion.a>
                    ))}
                </div>
            )}

            {/* Profile Link */}
            <div className="text-center">
                <a
                    href={`https://boxd.it/${letterboxdUser}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold transition-colors"
                    style={{
                        background: 'var(--secondary)',
                        color: '#05080F',
                    }}
                >
                    View diary →
                </a>
            </div>
        </motion.div>
    );
};

export default LetterboxdWidget;
