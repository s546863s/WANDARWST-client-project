"use client";

import { useRouter, useSearchParams } from "next/navigation";

const FilterSection = ({ currentCategory, currentPriceRange, currentSort }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // ফিল্টার বা সর্ট পরিবর্তন হলে URL আপডেট করার কমন ফাংশন
    const handleFilterChange = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key); // সিলেক্ট না করা থাকলে ইউআরএল থেকে রিমুভ হবে
        }
        
        // ইউআরএল আপডেট হবে (যেমন: ?category=Mountain&priceRange=0-5000&sortBy=low-to-high)
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-200 rounded-md mb-4 divide-y md:divide-y-0 md:divide-x divide-gray-200 overflow-hidden bg-white">
            
            {/* ১. ক্যাটাগরি ফিল্টার */}
            <div className="p-2">
                <select 
                    value={currentCategory}
                    onChange={(e) => handleFilterChange("category", e.target.value)}
                    className="w-full bg-transparent text-sm font-medium text-gray-500 uppercase outline-hidden cursor-pointer p-1"
                >
                    <option value="">Category (All)</option>
                    <option value="Mountain">Mountain</option>
                    <option value="Beach">Beach</option>
                    <option value="Castle">Castle</option>
                </select>
            </div>

            {/* ২. প্রাইস রেঞ্জ ফিল্টার */}
            <div className="p-2">
                <select 
                    value={currentPriceRange}
                    onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                    className="w-full bg-transparent text-sm font-medium text-gray-500 uppercase outline-hidden cursor-pointer p-1"
                >
                    <option value="">Price Range (All)</option>
                    <option value="0-3000">$0 - $3000</option>
                    <option value="3001-6000">$3001 - $6000</option>
                    <option value="6001-10000">$6001 - $10000</option>
                </select>
            </div>

            {/* ৩. সর্টিং অপশন */}
            <div className="p-2">
                <select 
                    value={currentSort}
                    onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                    className="w-full bg-transparent text-sm font-medium text-gray-500 uppercase outline-hidden cursor-pointer p-1"
                >
                    <option value="asc">Sort By (Default)</option>
                    <option value="low-to-high">Price: Low to High</option>
                    <option value="high-to-low">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                </select>
            </div>
        </div>
    );
};

export default FilterSection;