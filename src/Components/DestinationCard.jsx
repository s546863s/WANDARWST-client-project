// Components/DestinationCard.jsx
'use client';

import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

const DestinationCard = ({ destination }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const rating = destination.rating || 4.5;

    const handleBookNow = () => {
        toast.success(`✨ "${destination.destinationName}" booking started!`, {
            position: "bottom-right",
            autoClose: 3000,
            theme: "light",
        });
    };

    return (
        <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            {/* ইমেজ কন্টেইনার */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-linear-to-br from-gray-100 to-gray-200">
                <Image
                    src={destination.imageUrl || "/placeholder.jpg"}
                    alt={destination.destinationName || "Destination"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`
                        object-cover transition-all duration-700 
                        group-hover:scale-110 
                        ${isImageLoaded ? 'blur-0' : 'blur-sm'}
                    `}
                    onLoadingComplete={() => setIsImageLoaded(true)}
                    priority={false}
                />
                
                {/* লোডিং স্কেলিটন */}
                {!isImageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
                )}

                {/* রেটিং ব্যাজ */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg z-10">
                    <span className="text-white">{rating.toFixed(1)}</span>
                    <span className="text-yellow-400">★</span>
                </div>

                {/* ক্যাটাগরি ব্যাজ */}
                {destination.category && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-lg z-10">
                        {destination.category}
                    </div>
                )}

                {/* হোভার ওভারলে */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* কন্টেন্ট এরিয়া */}
            <div className="p-4 flex flex-col flex-grow bg-white">
                {/* লোকেশন */}
                <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                    <span className="text-base">📍</span>
                    <span className="truncate">{destination.country || "Nepal"}</span>
                </div>

                {/* টাইটেল ও প্রাইস */}
                <div className="mt-2 flex justify-between items-start gap-3">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2 flex-1 hover:text-sky-600 transition-colors">
                        {destination.destinationName}
                    </h3>
                    <div className="text-right shrink-0">
                        <span className="text-xl font-bold text-sky-600">
                            ${Number(destination.price).toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500 block">/person</span>
                    </div>
                </div>

                {/* ডিউরেশন */}
                <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-600">
                    <span className="text-base">📅</span>
                    <span className="font-medium">
                        {destination.duration} Days / {Math.max(0, destination.duration - 1)} Nights
                    </span>
                </div>

                {/* এক্সট্রা ইনফো (আইকন সহ) */}
                <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                    {destination.bestSeason && (
                        <div className="flex items-center gap-1">
                            <span>🌸</span>
                            <span>{destination.bestSeason}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-1">
                        <span>👥</span>
                        <span>2-10 people</span>
                    </div>
                </div>

                {/* ডিসক্রিপশন */}
                {destination.description && (
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {destination.description}
                    </p>
                )}

                {/* বুকিং বাটন */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                    <button
                        onClick={handleBookNow}
                        className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:from-sky-600 hover:to-sky-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg group/btn"
                    >
                        <span>Book Now</span>
                        <span className="text-base transition-transform group-hover/btn:translate-x-1">→</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DestinationCard;