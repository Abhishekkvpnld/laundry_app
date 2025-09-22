import express from "express";
import { jwtAuth } from "../middlewares/auth.js";
import { shopRegister } from "../controllers/shopRegister.js";
import { updateShop } from "../controllers/updateShop.js";
import { fetchShopData } from "../controllers/shopData.js";
import { allShops } from "../controllers/allShops.js";
import { getShopData } from "../controllers/getShop.js";

const router = express.Router();

router.get("/get-shop", jwtAuth, fetchShopData);
router.get("/all-shops", jwtAuth, allShops);
router.get("/get-shop/:id", jwtAuth, getShopData);

router.put("/update", jwtAuth, updateShop);
router.post("/register", jwtAuth, shopRegister);

export default router;
