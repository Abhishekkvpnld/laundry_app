import express from "express";
import { jwtAuth } from "../middlewares/auth.js";
import { makePayment } from "../controllers/makePayment.js";
import { webhook } from "../controllers/webhook.js";

const router = express.Router();

router.post("/payment/create-checkout-session", jwtAuth, makePayment);
router.post("/webhook", express.raw({ type: "application/json" }), webhook);
 
export default router;
