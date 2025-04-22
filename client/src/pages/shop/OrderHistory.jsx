import React, { useState } from "react";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import OrderCard from "@/components/shop/OrderCard";
import OrderTable from "@/components/shop/OrderTable";

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

  const updateStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Table View */}
        <OrderTable orders={orders} onStatusChange={updateStatus} />

        {/* Mobile View */}
        <div className="space-y-4 md:hidden">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onStatusChange={updateStatus}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderHistory;
