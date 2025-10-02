import express from "express";
import { jwtAuth } from "../middlewares/auth.js";
import { placeOrder } from "../controllers/createOrder.js";
import { getAllOrders } from "../controllers/allOrders.js";
import { updatePaymentStatus } from "../controllers/updateOrder.js";

const router = express.Router();

router.post("/place-order", jwtAuth, placeOrder);
router.get("/all-orders", jwtAuth, getAllOrders);
router.patch("/update-order/:id",updatePaymentStatus)

export default router;
