import express from "express";
import { jwtAuth } from "../middlewares/auth.js";
import { shopRegister } from "../controllers/shopRegister.js";
import { updateShop } from "../controllers/shopUpdate.js";

const router = express.Router();

router.post("/register", jwtAuth, shopRegister);
router.put("/update", jwtAuth, updateShop);

export default router;
