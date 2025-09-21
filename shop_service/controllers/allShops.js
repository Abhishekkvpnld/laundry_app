import shopModel from "../models/shopModel.js";

export const allShops = async (req, res) => {
  try {
    const shops = await shopModel.find();

    res.status(200).json({
      success: true,
      error: false,
      data: shops,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      success: false,
      message: error?.message,
    });
  }
};
