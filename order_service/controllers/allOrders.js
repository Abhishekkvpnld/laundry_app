import orderModel from "../models/orderModel.js";


// Get All Orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ createdAt: -1 }); 

    res.status(200).json({
      success: true,
      count: orders.length,
      data:orders,
    });
  } catch (error) {
    console.error("Get All Orders Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
