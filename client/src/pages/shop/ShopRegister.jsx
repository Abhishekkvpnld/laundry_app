import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ShopRegister = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        shopName: "",
        ownerName: "",
        email: "",
        phone: "",
        address: "",
        services: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (value) => {
        setFormData({ ...formData, services: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("Shop Registered Successfully!");
        navigate("/shop/dashboard");
    };

    return (
        <>
            <Navbar />
            <section className="max-w-3xl mx-auto px-4 py-12">
                <h2 className="text-3xl font-semibold text-center text-slate-800 mb-6">Register Your Laundry Shop</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Shop Name */}
                    <div>
                        <label htmlFor="shopName" className="text-lg font-medium text-slate-700 mb-2 block">
                            Shop Name
                        </label>
                        <Input
                            id="shopName"
                            name="shopName"
                            value={formData.shopName}
                            onChange={handleChange}
                            placeholder="Enter your shop name"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Owner Name */}
                    <div>
                        <label htmlFor="ownerName" className="text-lg font-medium text-slate-700 mb-2 block">
                            Owner Name
                        </label>
                        <Input
                            id="ownerName"
                            name="ownerName"
                            value={formData.ownerName}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="text-lg font-medium text-slate-700 mb-2 block">
                            Email Address
                        </label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label htmlFor="phone" className="text-lg font-medium text-slate-700 mb-2 block">
                            Phone Number
                        </label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label htmlFor="address" className="text-lg font-medium text-slate-700 mb-2 block">
                            Shop Address
                        </label>
                        <Textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter your shop address"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Services Offered */}
                    <div>
                        <label htmlFor="services" className="text-lg font-medium text-slate-700 mb-2 block">
                            Services Offered
                        </label>
                        <Select
                            id="services"
                            value={formData.services}
                            onValueChange={handleSelectChange}
                            multiple
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select services" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Dry Cleaning">Dry Cleaning</SelectItem>
                                <SelectItem value="Ironing">Ironing</SelectItem>
                                <SelectItem value="Laundry Wash">Laundry Wash</SelectItem>
                                <SelectItem value="Pickup & Delivery">Pickup & Delivery</SelectItem>
                                <SelectItem value="Stain Removal">Stain Removal</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300"
                    >
                        Register Your Shop
                    </Button>
                </form>
            </section>

            <Footer />
        </>
    );
};

export default ShopRegister;
