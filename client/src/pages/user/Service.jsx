import Footer from "@/components/user/Footer";
import { laundryShopsData, serviceData } from "../../utils/Data"
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/user/Navbar";
import React, { useState } from "react";
import LaundryShopCard from "@/components/user/LaundryShopCard";
import LaundryShopsSection from "@/components/user/LaundryShopsSection";



const Service = () => {


    const [showServices, setShowServices] = useState(true);

    const handleToggle = () => {
        setShowServices(!showServices);
    }



    return (
        <>
            <Navbar />

            <section className="max-w-6xl mx-auto px-4 py-10 min-h-[100vh]">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Our Services</h2>
                    <p className="text-gray-500 mt-2">Clean clothes, happy life!</p>

                    {/* Toggle Button */}
                    <button
                        onClick={handleToggle}
                        className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
                    >
                        {showServices ? "Show All Laundry Shops" : "Show All Services"}
                    </button>
                </div>

                {/* Display Content Based on Toggle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {showServices
                        ? serviceData?.map((service, index) => (
                            <Card
                                key={index}
                                className="group p-4 transition duration-300 border hover:shadow-xl hover:scale-105"
                            >
                                <CardContent className="flex flex-col items-center text-center space-y-4">
                                    {service?.icon}
                                    <h4 className="text-lg font-semibold text-gray-700">{service?.title}</h4>
                                    <p className="text-sm text-gray-500">{service?.description}</p>
                                </CardContent>
                            </Card>
                        ))
                        : (
                            <LaundryShopsSection />
                        )
                    }
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Service;
