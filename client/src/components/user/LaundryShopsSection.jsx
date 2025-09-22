import React, { useState } from "react";
import LaundryShopCard from "./LaundryShopCard";
import SearchBar from "@/pages/user/SearchBar";
import CustomServiceFilter from "../user/CustomServiceFilter ";
import { WashingMachine } from "lucide-react";
import { useFetchAllShop } from "@/hooks/useFetchAllShop";
import { Loader2 } from "lucide-react";


const LaundryShopsSection = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [serviceFilter, setServiceFilter] = useState("");

    // ✅ Fetch shops using custom hook
    const { data: shops, isLoading, isError } = useFetchAllShop();
    

    // ✅ Filter shops only after data is fetched
    const filteredShops = shops?.filter((shop) => {
        const matchSearch =
            shop?.shopName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            shop?.address?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchService =
            serviceFilter === "" ||
            shop?.services?.some(
                (service) =>
                    service?.name?.toLowerCase() === serviceFilter.toLowerCase()
            );

        return matchSearch && matchService;
    });

  if (isLoading) {
  return (
    <div className="flex w-[100vw] flex-col items-center justify-center py-16 text-center">
      <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-3" />
      <p className="text-lg font-medium text-gray-600">Loading shops...</p>
      <p className="text-sm text-gray-400">Please wait while we fetch data</p>
    </div>
  );
}


    if (isError) {
        return (
            <p className="text-center text-red-500">
                Failed to fetch laundry shops. Please try again later.
            </p>
        );
    }

    return (
        <section className="min-w-[100vw] mx-auto px-4 py-10">
            {/* Search & Filter Controls */}
            <div className="flex  flex-col md:flex-row justify-between gap-4 mb-6 w-full">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <CustomServiceFilter serviceFilter={serviceFilter} setServiceFilter={setServiceFilter} />
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-2 gap-6">
                {filteredShops?.length > 0 ? (
                    filteredShops?.map((shop, index) => (
                        <LaundryShopCard shop={shop} key={index} />
                    ))
                ) : (
                    <div className="flex flex-col w-[100vw] items-center justify-center py-12 text-center">
                        <WashingMachine className="w-12 h-12 text-gray-400 mb-3" />
                        <p className="text-lg font-semibold text-gray-600">
                            No laundry shops found
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                            Try adjusting your filters or search again
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default LaundryShopsSection;
