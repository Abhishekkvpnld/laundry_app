import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import { Checkbox } from "@/components/ui/checkbox";

const availableServices = ["Washing", "Drying", "Ironing", "Dry Cleaning"];

const ShopProfile = () => {
  const [formData, setFormData] = useState({
    shopName: "Shine Laundry",
    ownerName: "Abhishek",
    email: "owner@email.com",
    phone: "9876543210",
    address: "Near XYZ Road, Kannur",
    place: "Kannur",
    location: { lat: null, lng: null },
    services: ["Washing", "Ironing"], // default selected
  });

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // toggle services
  const handleServiceChange = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  // fetch current shop location
  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setFormData((prev) => ({
            ...prev,
            location: { lat: latitude, lng: longitude },
          }));
          toast.success("📍 Location updated!");
        },
        (err) => {
          console.error(err);
          toast.error("Unable to fetch location. Please allow location access.");
        }
      );
    } else {
      toast.error("Geolocation is not supported in this browser.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", formData);
    toast.success("Profile Updated Successfully ✅");
  };

  return (
    <>
      <Navbar />

      <section className="bg-gradient-to-b from-indigo-50 via-white to-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-4xl font-bold text-slate-800">Shop Profile</h2>
          <p className="text-gray-600 mt-2">
            Update your shop details, services, and location.
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 shadow-xl rounded-2xl space-y-6 max-w-4xl mx-auto border border-gray-100 hover:shadow-2xl transition"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Shop Name */}
            <div>
              <label className="block mb-1 font-medium text-slate-700">Shop Name</label>
              <Input
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Owner Name */}
            <div>
              <label className="block mb-1 font-medium text-slate-700">Owner Name</label>
              <Input
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium text-slate-700">Email</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 font-medium text-slate-700">Phone</label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Place */}
            <div>
              <label className="block mb-1 font-medium text-slate-700">Place / Area</label>
              <Input
                name="place"
                value={formData.place}
                onChange={handleChange}
                required
              />
            </div>

            {/* Location Button */}
            <div>
              <label className="block mb-1 font-medium text-slate-700">Shop Location</label>
              <Button
                type="button"
                onClick={handleLocation}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Update Location
              </Button>
              <p className="text-xs text-gray-500 mt-1">
                ⚠️ Only update location while you are physically at the shop.
              </p>
              {formData?.location?.lat && formData?.location?.lng && (
                <p className="text-sm text-gray-600 mt-2">
                  📍 {formData.location.lat.toFixed(4)}, {formData.location.lng.toFixed(4)}
                </p>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 font-medium text-slate-700">Shop Address</label>
            <Textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="h-28"
            />
          </div>

          {/* Services Section */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Services Offered
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableServices.map((service) => (
                <label
                  key={service}
                  className="flex items-center gap-2 p-2 border rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  <Checkbox
                    checked={formData.services.includes(service)}
                    onCheckedChange={() => handleServiceChange(service)}
                  />
                  <span>{service}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <motion.div whileTap={{ scale: 0.97 }}>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
              Save Changes
            </Button>
          </motion.div>
        </motion.form>

        {/* Show Map if Location Added */}
        {formData?.location?.lat && (
          <div className="mt-12 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-slate-800">Shop Location on Map</h3>
            <div className="rounded-lg overflow-hidden border">
              <iframe
                title="Shop Location"
                src={`https://www.google.com/maps?q=${formData.location.lat},${formData.location.lng}&z=15&output=embed`}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default ShopProfile;
