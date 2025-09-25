import express from "express";
import { jwtAuth } from "../middlewares/auth.js";
import { placeOrder } from "../controllers/createOrder.js";
import { getAllOrders } from "../controllers/allOrders.js";

const router = express.Router();

router.post("/place-order", jwtAuth, placeOrder);
router.get("/all-orders", jwtAuth, getAllOrders);

export default router;
