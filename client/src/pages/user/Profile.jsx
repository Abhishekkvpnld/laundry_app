import React, { useState } from "react";
import { User, Mail, Phone, MapPin, ClipboardList } from "lucide-react";
import Footer from "@/components/user/Footer";
import Navbar from "@/components/user/Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
            <div className="min-h-[100vh] bg-gradient-to-b from-blue-50 via-white to-gray-50 py-10 px-4">
                <div className="max-w-5xl mx-auto space-y-10">
                    {/* Profile Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8"
                    >
                        {/* Avatar */}
                        <motion.img
                            src={"profile.png"}
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
                            whileHover={{ scale: 1.1, rotate: 2 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        />

                        {/* Info */}
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl font-bold text-slate-800">{profile?.name}</h2>
                            <div className="mt-2 h-[2px] w-20 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto md:mx-0 rounded-full"></div>

                            <div className="mt-4 space-y-2 text-gray-700">
                                <p className="flex items-center justify-center md:justify-start gap-2">
                                    <Mail size={18} className="text-blue-500" /> {profile?.email}
                                </p>
                                <p className="flex items-center justify-center md:justify-start gap-2">
                                    <Phone size={18} className="text-green-500" /> {profile?.phone}
                                </p>
                                <p className="flex items-center justify-center md:justify-start gap-2">
                                    <MapPin size={18} className="text-red-500" /> {profile?.address}
                                </p>
                            </div>
                        </div>
                    </motion.div>


                    {/* Editable Details */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-xl shadow-md p-6 space-y-6"
                    >
                        <h3 className="text-xl font-semibold text-slate-800 border-b pb-3">Edit Profile</h3>
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
                                    className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
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
                                    className="w-full border rounded-lg px-4 py-2 text-gray-500 bg-gray-100 cursor-not-allowed"
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
                                    className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
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
                                    className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
                                />
                            </div>
                        </div>

                        {/* Other Details */}
                        <div className="border-t pt-4">
                            <h4 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                <ClipboardList size={20} /> Other Details
                            </h4>
                            <p className="text-slate-600">
                                <strong>Total Bookings:</strong> {profile.bookings}
                            </p>
                        </div>

                        <div className="pt-4">
                            <Button
                                onClick={handleUpdate}
                                className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
                            >
                                Update Profile
                            </Button>
                        </div>
                    </motion.div>

                    {/* Order History */}
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Laundry Order History</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[1, 2].map((_, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                    className="rounded-xl overflow-hidden shadow-md border border-gray-200 bg-white"
                                >
                                    {/* Accent Top Bar */}
                                    <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-500"></div>

                                    {/* Card Body */}
                                    <div className="p-6 space-y-4">
                                        {/* Header */}
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-lg font-semibold text-slate-800">Order ID: LDY{1000 + index}</h4>
                                                <p className="text-sm text-gray-500">Booking Date: 2025-04-12</p>
                                                <p className="text-sm text-gray-500">Pickup Address: 123, Clean Street, Kochi</p>
                                            </div>
                                            <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
                                                Completed
                                            </span>
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
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Profile;
