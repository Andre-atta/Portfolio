"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSpotify } from "react-icons/fa";
import { Spotify } from "react-spotify-embed";

const SpotifyWidget = () => {
    const [spotifyData, setSpotifyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState("nowPlaying"); // "nowPlaying" | "stats"
    
    const spotifyProfileUrl = "https://open.spotify.com/user/vgjmmtcjkole4pkx5n11wi6nc";
    
    useEffect(() => {
        // Initial load: only fetch "now playing" for faster load
        fetchSpotifyData(true);
        
        // Load full stats after initial render (lazy load)
        const statsTimeout = setTimeout(() => {
            fetchSpotifyData(false);
        }, 1000);
        
        // Refresh "now playing" every 30 seconds
        const interval = setInterval(() => {
            fetchSpotifyData(true);
        }, 30000);
        
        return () => {
            clearInterval(interval);
            clearTimeout(statsTimeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    // Fetch stats when switching to stats view
    useEffect(() => {
        if (viewMode === "stats" && !spotifyData?.stats && !loading) {
            fetchSpotifyData(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewMode]);
    
    const fetchSpotifyData = async (onlyNowPlaying = false) => {
        try {
            if (!onlyNowPlaying && !spotifyData?.stats) {
                setLoading(true);
            }
            
            const url = onlyNowPlaying ? "/api/spotify?onlyNowPlaying=true" : "/api/spotify";
            const response = await fetch(url);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || data.message || "Failed to fetch Spotify data");
            }
            
            // Merge data if we already have some
            if (onlyNowPlaying && spotifyData) {
                setSpotifyData({
                    ...spotifyData,
                    currentlyPlaying: data.currentlyPlaying,
                });
            } else {
                setSpotifyData(data);
            }
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    const formatDuration = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const hours = Math.floor(minutes / 60);
        if (hours > 0) {
            return `${hours}h ${minutes % 60}m`;
        }
        return `${minutes}m`;
    };
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="block rounded-xl sm:rounded-2xl border-2 overflow-hidden p-3 sm:p-4"
            style={{
                borderColor: '#1DB954',
                background: 'rgba(29, 185, 84, 0.08)',
            }}
        >
            {/* Header */}
            <div className="flex flex-col gap-2 sm:gap-3 sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-3">
                    <FaSpotify className="text-2xl sm:text-3xl lg:text-4xl" style={{ color: '#1DB954' }} />
                    <div>
                        <div className="font-bold text-white text-sm sm:text-base lg:text-lg">Spotify</div>
                        <div className="text-xs opacity-60 text-white">
                            {viewMode === "nowPlaying" ? "Now Playing" : "Your Stats"}
                        </div>
                    </div>
                </div>
                <div className="flex gap-1 sm:gap-2">
                    <button
                        onClick={() => setViewMode("nowPlaying")}
                        className={`px-2 sm:px-3 py-1 text-xs rounded transition-all ${
                            viewMode === "nowPlaying"
                                ? "bg-[#1DB954] text-black font-semibold"
                                : "bg-transparent border border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954] hover:text-black"
                        }`}
                    >
                        Now
                    </button>
                    <button
                        onClick={() => setViewMode("stats")}
                        className={`px-2 sm:px-3 py-1 text-xs rounded transition-all ${
                            viewMode === "stats"
                                ? "bg-[#1DB954] text-black font-semibold"
                                : "bg-transparent border border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954] hover:text-black"
                        }`}
                    >
                        Stats
                    </button>
                </div>
            </div>
            
            {/* Content */}
            {loading && !spotifyData ? (
                <div className="flex items-center justify-center h-32 sm:h-40 text-white/40">
                    <div className="text-center">
                        <div className="text-xs sm:text-sm mb-2">Loading Spotify data...</div>
                    </div>
                </div>
            ) : error ? (
                <div className="flex items-center justify-center h-32 sm:h-40 text-red-400">
                    <div className="text-center max-w-md px-4">
                        <div className="text-xs sm:text-sm mb-2 font-semibold">Unable to load Spotify data</div>
                        <div className="text-xs opacity-60 mb-3">{error}</div>
                    </div>
                </div>
            ) : viewMode === "nowPlaying" && spotifyData?.currentlyPlaying ? (
                <div className="space-y-3 sm:space-y-4">
                    {/* Now Playing Track */}
                    {spotifyData.currentlyPlaying.trackUrl && (
                        <div className="w-full scale-90 sm:scale-100 origin-top-left">
                            <Spotify
                                link={spotifyData.currentlyPlaying.trackUrl}
                                width="100%"
                                height="120"
                            />
                        </div>
                    )}
                </div>
            ) : viewMode === "stats" && spotifyData?.stats ? (
                <div className="space-y-3 sm:space-y-4">
                    {/* Listening Time */}
                    {spotifyData.stats.totalListeningTime && (
                        <div className="bg-black/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <div className="text-xs text-white/60 mb-1">Total Listening Time</div>
                            <div className="text-lg sm:text-2xl font-bold text-white">
                                {formatDuration(spotifyData.stats.totalListeningTime)}
                            </div>
                        </div>
                    )}
                    
                    {/* Top Artists */}
                    {spotifyData.stats.topArtists && spotifyData.stats.topArtists.length > 0 && (
                        <div className="bg-black/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <div className="text-xs text-white/60 mb-2 sm:mb-3">Top Artists</div>
                            <div className="space-y-1 sm:space-y-2">
                                {spotifyData.stats.topArtists.slice(0, 3).map((artist, index) => (
                                    <div key={index} className="flex items-center gap-2 sm:gap-3">
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#1DB954] flex items-center justify-center text-black font-bold text-xs sm:text-sm">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs sm:text-sm font-semibold text-white truncate">
                                                {artist.name}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* Top Genres */}
                    {spotifyData.stats.topGenres && spotifyData.stats.topGenres.length > 0 && (
                        <div className="bg-black/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <div className="text-xs text-white/60 mb-2">Top Genres</div>
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                                {spotifyData.stats.topGenres.slice(0, 5).map((genre, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 rounded text-xs bg-[#1DB954]/20 text-[#1DB954] border border-[#1DB954]/30"
                                    >
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                // No data available
                <div className="flex items-center justify-center h-32 sm:h-40 text-white/60">
                    <div className="text-center">
                        <div className="text-xs sm:text-sm">No track data available</div>
                    </div>
                </div>
            )}
            
            {/* Profile Link */}
            <div className="mt-3 text-center">
                <a 
                    href={spotifyProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/60 hover:text-white transition-colors"
                >
                    View my profile →
                </a>
            </div>
        </motion.div>
    );
};

export default SpotifyWidget;
