import shopModel from "../models/shopModel.js";

export const getShopData = async (req, res) => {
  try {
    const shopId = req.params.id;
    const data = await shopModel.findById(shopId);

    res.status(200).json({
        success:false,
        error:true,
        data:data
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};
