import Shop from "../models/shopModel.js";

export const fetchShopData = async (req, res) => {
  try {
    const userId = req.id; 

    const shopData = await Shop.findOne({userId:userId});

    if (!shopData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Shop details not found",
      }); 
    }

    return res.status(200).json({
      success: true,
      error: false,
      data: shopData,
    });
  } catch (error) {
    console.error("Error fetching shop data:", error);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error",
    });
  }
};
