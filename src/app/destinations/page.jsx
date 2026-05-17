// app/destination/page.jsx

import Image from "next/image";
import FilterSection from "@/Components/FilterSection";
import DestinationCard from "@/Components/DestinationCard"; // 👈 ইমপোর্ট করুন

const DestinationPage = async ({ searchParams }) => {
    const category = searchParams?.category || "";
    const priceRange = searchParams?.priceRange || "";
    const sortBy = searchParams?.sortBy || "low-to-high";

    let destinations = [];
    try {
        const res = await fetch('http://localhost:5000/destination', { 
            cache: 'no-store' 
        });
        destinations = await res.json();
        
        if (!Array.isArray(destinations)) {
            destinations = [];
        }
    } catch (error) {
        console.error("Error fetching destinations:", error);
        destinations = [];
    }

    let filteredDestinations = [...destinations];

    if (category && category !== "all") {
        filteredDestinations = filteredDestinations.filter(
            dest => dest.category === category
        );
    }

    if (priceRange && priceRange !== "all") {
        const [min, max] = priceRange.split("-").map(Number);
        if (!isNaN(min) && !isNaN(max)) {
            filteredDestinations = filteredDestinations.filter(dest => {
                const price = Number(dest.price);
                return price >= min && price <= max;
            });
        }
    }

    if (sortBy === "low-to-high") {
        filteredDestinations.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "high-to-low") {
        filteredDestinations.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "name") {
        filteredDestinations.sort((a, b) => 
            (a.destinationName || "").localeCompare(b.destinationName || "")
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 bg-white text-gray-800">
            <h1 className="text-4xl font-bold mb-2">Explore All Destinations</h1>
            <p className="text-gray-500 mb-6">
                Find your perfect travel experience from our curated collection
            </p>

            <FilterSection 
                currentCategory={category} 
                currentPriceRange={priceRange} 
                currentSort={sortBy} 
            />

            <p className="text-sm text-gray-600 mb-6 font-medium">
                Showing {filteredDestinations.length} destinations
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDestinations.length > 0 ? (
                    filteredDestinations.map((destination) => (
                        <DestinationCard 
                            key={destination._id} 
                            destination={destination} 
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-10 text-gray-500">
                        No destinations found matching the criteria.
                    </div>
                )}
            </div>
        </div>
    );
};

export default DestinationPage;