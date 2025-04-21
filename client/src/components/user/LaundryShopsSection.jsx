import React, { useState } from "react";
import LaundryShopCard from "./LaundryShopCard";
import { laundryShopsData } from "@/utils/Data";
import SearchBar from "@/pages/user/SearchBar";
import CustomServiceFilter from "./CustomServiceFilter ";


const LaundryShopsSection = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [serviceFilter, setServiceFilter] = useState("");

    const filteredShops = laundryShopsData.filter((shop) => {
        const matchSearch =
            shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            shop.address.toLowerCase().includes(searchTerm.toLowerCase());

        const matchService =
            serviceFilter === "" || shop.services.includes(serviceFilter);

        return matchSearch && matchService;
    });

    return (
        <section className="min-w-[100vw] mx-auto px-4 py-10">
            {/* Search & Filter Controls */}
            <div className="flex  flex-col md:flex-row justify-start gap-4 mb-6 w-full">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <CustomServiceFilter serviceFilter={serviceFilter} setServiceFilter={setServiceFilter} />
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-2 gap-6">
                {filteredShops.length > 0 ? (
                    filteredShops.map((shop, index) => (
                        <LaundryShopCard shop={shop} key={index} />
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No laundry shops found.</p>
                )}
            </div>
        </section>
    );
};

export default LaundryShopsSection;
