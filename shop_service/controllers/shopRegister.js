import Shop from "../models/shopModel.js";

export const shopRegister = async (req, res) => {
  try {
    const { shopName, ownerName, email, phone, address, place, services } =
      req.body;

    //User ID
    const userId = req.id;
    if (!userId) throw new Error("Please Login First...");

    // Basic validation
    if (!shopName || !ownerName || !email || !phone || !address || !place) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    // Check if shop already exists by email or phone
    const existingShop = await Shop.findOne({ $or: [{ email }, { phone }] });
    if (existingShop) {
      return res.status(400).json({
        success: false,
        message: "Shop already registered with this email or phone",
      });
    }

    // Create new shop
    const newShop = new Shop({
      userId: userId,
      shopName,
      ownerName,
      email,
      phone,
      address,
      place,
      services: services?.length ? services : ["Ironing", "Laundry Wash"],
    });

    await newShop.save();

    return res.status(201).json({
      success: true,
      message: "Shop registered successfully",
      error: false,
      data: newShop,
    });
  } catch (error) {
    console.error("Error in shopRegister:", error);
    res.status(500).json({
      success: false,
      error: true,
      message: error?.message || "Server Error",
    });
  }
};
