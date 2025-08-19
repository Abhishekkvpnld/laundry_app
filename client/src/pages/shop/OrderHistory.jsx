import React, { useState } from "react";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import OrderCard from "@/components/shop/OrderCard";
import OrderTable from "@/components/shop/OrderTable";
import { motion } from "framer-motion";

const mockOrders = [
  {
    id: "ORD001",
    customerName: "Rahul Nair",
    address: "123 MG Road, Kochi",
    place: "Kochi",
    status: "Pending",
    billAmount: 240,
    isPaid: true,
    paymentType: "UPI",
    date: "2025-04-20T14:30:00Z",
  },
  {
    id: "ORD002",
    customerName: "Asha Thomas",
    address: "456 Beach Road, Kozhikode",
    place: "Kozhikode",
    status: "In Progress",
    billAmount: 180,
    isPaid: false,
    paymentType: "Cash",
    date: "2025-04-19T10:00:00Z",
  },
  {
    id: "ORD003",
    customerName: "Vishnu V",
    address: "789 Hill View, Kannur",
    place: "Kannur",
    status: "Completed",
    billAmount: 300,
    isPaid: true,
    paymentType: "Card",
    date: "2025-04-18T08:45:00Z",
  },
];

const OrderHistory = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [search, setSearch] = useState("");

  const updateStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev?.map((order) =>
        order?.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const filteredOrders = orders?.filter(
    (order) =>
      order?.customerName.toLowerCase().includes(search.toLowerCase()) ||
      order?.place.toLowerCase().includes(search.toLowerCase()) ||
      order?.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="max-w-6xl min-h-[100vh] mx-auto px-4 py-10 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            🧾 Order History
          </h1>
          <p className="text-gray-600 mt-2">
            Track, manage, and update all customer orders in one place
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search by customer, place, or order ID..."
            className="w-full md:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Desktop Table View */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:block"
        >
          <OrderTable orders={filteredOrders} onStatusChange={updateStatus} />
        </motion.div>

        {/* Mobile Card View */}
        <div className="space-y-4 md:hidden">
          {filteredOrders?.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <OrderCard order={order} onStatusChange={updateStatus} />
            </motion.div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No orders found matching your search.
          </p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrderHistory;
