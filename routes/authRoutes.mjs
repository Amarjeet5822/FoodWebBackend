import express from "express";
import { Login, Logout, Signup } from "../controllers/authController.mjs";
import { LoginMiddleware } from "../middlewares/LoginMiddleware.mjs";
import { SignupMiddleware } from "../middlewares/SignupMiddleware.mjs";
export const authRoutes = express.Router();

authRoutes.post("/signup", SignupMiddleware , Signup);
authRoutes.post("/login", LoginMiddleware, Login );
authRoutes.post("/logout", Logout );
