import React, { useState } from "react";
import { User, Mail, Phone } from "lucide-react";
import Footer from "@/components/user/Footer";
import Navbar from "@/components/user/Navbar";
import { Button } from "@/components/ui/button";

const Profile = () => {
    const [profile, setProfile] = useState({
        name: "Abhishek KV",
        email: "abhishek@example.com",
        phone: "9876543210",
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
            <div className="min-h-[100vh] bg-gradient-to-tr from-purple-100 to-violet-200 flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Profile</h2>

                    <div className="space-y-5">
                        {/* Name */}
                        <div className="flex items-center gap-3 border rounded-lg px-4 py-2 bg-gray-50">
                            <User className="text-gray-400" size={18} />
                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className="w-full bg-transparent outline-none text-gray-700"
                            />
                        </div>

                        {/* Email (disabled) */}
                        <div className="flex items-center gap-3 border rounded-lg px-4 py-2 bg-gray-100">
                            <Mail className="text-gray-400" size={18} />
                            <input
                                type="email"
                                value={profile.email}
                                disabled
                                className="w-full bg-transparent outline-none text-gray-500 cursor-not-allowed"
                            />
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-3 border rounded-lg px-4 py-2 bg-gray-50">
                            <Phone className="text-gray-400" size={18} />
                            <input
                                type="tel"
                                name="phone"
                                value={profile.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="w-full bg-transparent outline-none text-gray-700"
                            />
                        </div>

                        {/* Update Button */}
                        <Button
                            onClick={handleUpdate}
                            className="w-full mt-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold py-2 rounded-lg shadow hover:shadow-md hover:scale-105 transition"
                        >
                            Update Profile
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;
