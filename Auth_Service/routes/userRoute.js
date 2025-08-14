import express from "express";
import { login, logout, signup, userDetails } from "../controllers/userController.js";
import { jwtAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", jwtAuth, logout);
router.get("/user",jwtAuth,userDetails)

export default router;
