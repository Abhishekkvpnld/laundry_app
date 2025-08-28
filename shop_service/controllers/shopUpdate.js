import Shop from "../models/shopModel.js";

// Update Shop
export const updateShop = async (req, res) => {
  try {
    const { id } = req.params; // shop id from route param
    const { shopName, ownerName, email, phone, address, place, services } = req.body;

    // ✅ Find shop by ID
    const shop = await Shop.findById(id);
    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    // ✅ Update fields only if provided
    if (shopName) shop.shopName = shopName;
    if (ownerName) shop.ownerName = ownerName;
    if (email) shop.email = email;
    if (phone) shop.phone = phone;
    if (address) shop.address = address;
    if (place) shop.place = place;
    if (services) shop.services = services;

    await shop.save();

    return res.status(200).json({
      success: true,
      message: "Shop updated successfully",
      data: shop,
    });
  } catch (error) {
    console.error("Error in updateShop:", error);
    res.status(500).json({
      success: false,
      error: true,
      message: error?.message || "Server Error",
    });
  }
};
