import orderModel from "../models/orderModel.js";


export const placeOrder = async (req, res) => {
  try {
    const {
      name,
      phone,
      address,
      note,
      service_date,
      services,
      paymentMethod,
      totalAmount,
      paymentId,
    } = req.body;


    if (
      !name ||
      !phone ||
      !address ||
      !service_date ||
      !services ||
      services.length === 0
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // set payment status based on method
    let paymentStatus = "pending";
    if (paymentMethod === "online" && paymentId) {
      paymentStatus = "paid";
    }

    // create new order
    const newOrder = new orderModel({
      name,
      phone,
      address,
      note,
      service_date,
      services,
      paymentMethod,
      totalAmount,
      paymentId: paymentId || null,
      paymentStatus,
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      error: false,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Place Order Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
