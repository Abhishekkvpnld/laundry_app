import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
    },
    phone: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 10,
    },
    address: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    service_date: {
      type: String,
      required: true,
    },
    services: [
      {
        service: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        unit_amount: { type: Number, required: true },
      },
    ],

    paymentMethod: {
      type: String,
      enum: ["cashOnDelivery", "online"],
      default: "cashOnDelivery",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentId: {
      type: String,
      default: null,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;
