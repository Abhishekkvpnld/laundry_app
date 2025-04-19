import React, { useState } from "react";
import { User, Mail, Phone, MapPin, ClipboardList } from "lucide-react";
import Footer from "@/components/user/Footer";
import Navbar from "@/components/user/Navbar";
import { Button } from "@/components/ui/button";

const Profile = () => {
    const [profile, setProfile] = useState({
        name: "Abhishek KV",
        email: "abhishek@example.com",
        phone: "9876543210",
        address: "123 Clean Street, Kochi",
        bookings: 5,
    });

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        console.log("Profile Updated:", profile);
        alert("Profile updated successfully!");
    };

    return (
        <>
            <Navbar />
            <div className="min-h-[100vh] bg-white py-10 px-4">
                <div className="max-w-4xl mx-auto space-y-10">
                    <h2 className="text-3xl font-bold text-slate-800 border-b pb-3">My Profile</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label className="text-sm font-medium text-slate-600 flex items-center gap-2 mb-1">
                                <User size={16} /> Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleChange}
                                className="w-full border rounded-md px-4 py-2 text-gray-700"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium text-slate-600 flex items-center gap-2 mb-1">
                                <Mail size={16} /> Email
                            </label>
                            <input
                                type="email"
                                value={profile.email}
                                disabled
                                className="w-full border rounded-md px-4 py-2 text-gray-500 bg-gray-100 cursor-not-allowed"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="text-sm font-medium text-slate-600 flex items-center gap-2 mb-1">
                                <Phone size={16} /> Phone
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={profile.phone}
                                onChange={handleChange}
                                className="w-full border rounded-md px-4 py-2 text-gray-700"
                            />
                        </div>

                        {/* Address */}
                        <div>
                            <label className="text-sm font-medium text-slate-600 flex items-center gap-2 mb-1">
                                <MapPin size={16} /> Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={profile.address}
                                onChange={handleChange}
                                className="w-full border rounded-md px-4 py-2 text-gray-700"
                            />
                        </div>
                    </div>

                    {/* Other Details */}
                    <div className="border-t pt-6 px-3">
                        <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <ClipboardList size={20} /> Other Details
                        </h4>

                        <p className="text-slate-600">
                            <strong>Total Bookings:</strong> {profile.bookings}
                        </p>
                        {/* Add more details if needed */}
                    </div>

                    <div className="pt-6">
                        <Button
                            onClick={handleUpdate}
                            className="bg-violet-600 text-white px-6 py-2 rounded-md hover:bg-violet-700 transition"
                        >
                            Update Profile
                        </Button>
                    </div>
                </div>
            </div>

            {/* Laundry Order History */}
            <div className="mt-10">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4 ml-5">Laundry Order History</h2>

                <div className="space-y-6 grid md:grid-cols-2 px-2">
                    {[1, 2].map((_, index) => (
                        <div key={index} className="rounded-xl h-[350px] overflow-hidden shadow-md border w-[95%] border-gray-200">
                            {/* Accent Top Bar */}
                            <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-500"></div>

                            {/* Card Body */}
                            <div className="bg-white p-6 space-y-4">
                                {/* Header */}
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-lg font-semibold text-slate-800">Order ID: LDY{1000 + index}</h4>
                                        <p className="text-sm text-gray-500">Booking Date: 2025-04-12</p>
                                        <p className="text-sm text-gray-500">Pickup Address: 123, Clean Street, Kochi</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                        <span className="text-sm font-medium text-green-600">Completed</span>
                                    </div>
                                </div>

                                {/* Service Breakdown */}
                                <div className="border-t pt-4">
                                    <h5 className="font-semibold text-slate-700 mb-2">Services</h5>
                                    <div className="space-y-2 text-sm text-slate-600">
                                        <div className="flex justify-between">
                                            <span>Dry Cleaning (x2)</span>
                                            <span className="text-slate-800 font-medium">₹200</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Ironing (x3)</span>
                                            <span className="text-slate-800 font-medium">₹120</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Pickup & Delivery</span>
                                            <span className="text-slate-800 font-medium">₹60</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="flex justify-between border-t pt-4 text-slate-900 font-semibold text-base">
                                    <span>Total</span>
                                    <span>₹380</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>


            <Footer />
        </>
    );
};

export default Profile;
