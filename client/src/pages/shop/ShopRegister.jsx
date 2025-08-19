import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { toast } from "sonner";

const ShopRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    shopName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    place: "",
    services: [], // [{ name: "Dry Cleaning", cost: "100" }]
    location: { lat: null, lng: null },
  });

  const servicesOptions = [
    "Dry Cleaning",
    "Ironing",
    "Laundry Wash",
    "Pickup & Delivery",
    "Stain Removal",
  ];

  // handle normal text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // toggle service checkbox
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      if (checked) {
        return {
          ...prev,
          services: [...prev.services, { name: value, cost: "" }],
        };
      } else {
        return {
          ...prev,
          services: prev.services.filter((s) => s.name !== value),
        };
      }
    });
  };

  // handle cost input change
  const handleServiceCostChange = (serviceName, cost) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services?.map((s) =>
        s.name === serviceName ? { ...s, cost } : s
      ),
    }));
  };

  // fetch shop location
  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setFormData((prev) => ({
            ...prev,
            location: { lat: latitude, lng: longitude },
          }));
        },
        (err) => {
          console.error(err);
          toast.error("Unable to fetch location. Please allow location access.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast.success("Shop Registered Successfully!");
    navigate("/shop/dashboard");
  };

  return (
    <>
      <Navbar />

      <section className="bg-gradient-to-b from-blue-50 via-white to-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-4xl font-bold text-slate-800">
            Register Your Laundry Shop
          </h2>
          <p className="text-gray-600 mt-2">
            Fill in the details below to list your shop and start receiving orders.
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 shadow-xl rounded-2xl space-y-6 max-w-3xl mx-auto border border-gray-100 hover:shadow-2xl transition"
        >
          {/* Shop Name */}
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

          {/* Owner Name */}
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

          {/* Email */}
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

          {/* Phone */}
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

          {/* Address */}
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
              className="w-full h-32"
            />
          </div>

          {/* Place */}
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

          {/* Location */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Shop Location
            </label>
            <Button
              type="button"
              onClick={handleLocation}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add Location
            </Button>
            {formData.location.lat && formData.location.lng && (
              <p className="text-sm text-gray-600 mt-2">
                📍 Location: {formData.location.lat.toFixed(4)},{" "}
                {formData.location.lng.toFixed(4)}
              </p>
            )}
            <p className="text-xs text-red-500 mt-1">
              ⚠️ Only add location in your shop place
            </p>
          </div>

          {/* Services */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Services Offered (with Cost)
            </label>
            <div className="space-y-3">
              {servicesOptions?.map((service) => {
                const selectedService = formData?.services?.find(
                  (s) => s.name === service
                );
                return (
                  <div
                    key={service}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-gray-50 rounded-lg border hover:bg-blue-50 transition"
                  >
                    <label className="flex items-center gap-2 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        value={service}
                        checked={!!selectedService}
                        onChange={handleCheckboxChange}
                        className="accent-indigo-600"
                      />
                      <span className="text-slate-700">{service}</span>
                    </label>

                    {/* Cost input if service selected */}
                    {selectedService && (
                      <Input
                        type="number"
                        min="0"
                        value={selectedService.cost}
                        onChange={(e) =>
                          handleServiceCostChange(service, e.target.value)
                        }
                        placeholder="Enter cost (₹)"
                        className="w-40"
                        required
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <motion.div whileTap={{ scale: 0.97 }}>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
              Register Your Shop
            </Button>
          </motion.div>
        </motion.form>
      </section>

      {
        formData?.location?.lat && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4 text-slate-800">Location on Map</h3>
            <div className="rounded-lg overflow-hidden border">
              <iframe
                title="Laundry Location"
                src={`https://www.google.com/maps?q=${formData?.location?.lat},${formData?.location?.lng}&z=15&output=embed`}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>
        )
      }


      <Footer />
    </>
  );
};

export default ShopRegister;
