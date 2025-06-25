import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ShopRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    shopName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    place: "",
    services: [],
  });

  const servicesOptions = [
    "Dry Cleaning",
    "Ironing",
    "Laundry Wash",
    "Pickup & Delivery",
    "Stain Removal",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      services: checked
        ? [...prev.services, value]
        : prev.services.filter((service) => service !== value),
    }));
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
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">
          Register Your Laundry Shop
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 shadow-xl rounded-xl space-y-6"
        >
          <div>
            <label htmlFor="shopName" className="block mb-1 font-medium text-slate-700">
              Shop Name
            </label>
            <Input
              id="shopName"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              placeholder="Enter your shop name"
              required
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="ownerName" className="block mb-1 font-medium text-slate-700">
              Owner Name
            </label>
            <Input
              id="ownerName"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-slate-700">
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
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block mb-1 font-medium text-slate-700">
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
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="address" className="block mb-1 font-medium text-slate-700">
              Shop Address
            </label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your shop address"
              required
              className="w-full h-36"

            />
          </div>

          <div>
            <label htmlFor="place" className="block mb-1 font-medium text-slate-700">
              Place / Area
            </label>
            <Input
              id="place"
              name="place"
              type="text"
              value={formData.place}
              onChange={handleChange}
              placeholder="Enter your shop location (e.g: Kannur)"
              required
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Services Offered
            </label>
            <div className="grid grid-cols-2 gap-3">
              {servicesOptions.map((service) => (
                <label key={service} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={service}
                    checked={formData.services.includes(service)}
                    onChange={handleCheckboxChange}
                  />
                  {service}
                </label>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-full hover:bg-indigo-700 transition duration-300"
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
