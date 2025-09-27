import express from "express";
import { jwtAuth } from "../middlewares/auth.js";
import { makePayment } from "../controllers/makePayment.js";

const router = express.Router();

router.post("/create-checkout-session", jwtAuth, makePayment);

export default router;
