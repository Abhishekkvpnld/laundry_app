import Shop from "../models/shopModel.js";

export const updateShop = async (req, res) => {
  try {
    const formData = req.body;
    const userId = req.id;

    const shopData = await Shop.findOne({ userId: userId });

    if (!shopData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Shop not found",
      });
    }

    const updatedShop = await Shop.findOneAndUpdate(
      { userId },
      { $set: formData },
      { new: true }
    );

    if (!updatedShop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found for update",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      data: updatedShop,
    });
  } catch (error) {
    console.error("Error updating shop:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
