import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, ShieldCheck, Truck } from "lucide-react";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import { useNavigate } from "react-router-dom";

const ShopOwnerHome = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <section className="min-h-[90vh] flex flex-col justify-center items-center text-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight mb-4">
          Grow Your <span className="text-indigo-600">Laundry Business</span> With Us
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mb-6">
          Join our platform and reach thousands of customers. Manage bookings, offer services, and get paid easily.
        </p>
        <Button
          onClick={() => navigate("/shop/register")}
          className="bg-indigo-600 text-white px-6 py-3 rounded-full text-lg shadow hover:bg-indigo-700"
        >
          Register Your Laundry
        </Button>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white shadow rounded-xl p-6 text-center hover:shadow-md transition">
          <Sparkles className="mx-auto text-indigo-500 mb-4" size={36} />
          <h3 className="font-semibold text-lg mb-2">Reach More Customers</h3>
          <p className="text-gray-600 text-sm">List your laundry on our app and get noticed by people nearby.</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center hover:shadow-md transition">
          <ShieldCheck className="mx-auto text-indigo-500 mb-4" size={36} />
          <h3 className="font-semibold text-lg mb-2">Easy Booking System</h3>
          <p className="text-gray-600 text-sm">Manage your bookings and service requests with a clean dashboard.</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center hover:shadow-md transition">
          <Truck className="mx-auto text-indigo-500 mb-4" size={36} />
          <h3 className="font-semibold text-lg mb-2">Pickup & Delivery</h3>
          <p className="text-gray-600 text-sm">Offer pickup and delivery for convenience and grow faster.</p>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ShopOwnerHome;
