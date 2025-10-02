import Order from "../models/orderModel.js";

// ✅ Update payment status & id
export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params; // orderId
    const { paymentId, paymentStatus } = req.body;

    // Validate request body
    if (!paymentId && !paymentStatus) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    // Find and update in one step
    const order = await Order.findByIdAndUpdate(
      id,
      {
        ...(paymentId && { paymentId }),
        ...(paymentStatus && { paymentStatus }),
      },
      { new: true } // return updated order
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order payment updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error updating payment:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
