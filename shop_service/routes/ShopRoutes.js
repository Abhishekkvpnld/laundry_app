import express from "express";
import { jwtAuth } from "../middlewares/auth.js";
import { shopRegister } from "../controllers/shopRegister.js";
import { updateShop } from "../controllers/updateShop.js";
import { fetchShopData } from "../controllers/shopData.js";

const router = express.Router();

router.post("/register", jwtAuth, shopRegister);
router.get("/get-shop",jwtAuth,fetchShopData);
router.put("/update",jwtAuth,updateShop)

export default router;
