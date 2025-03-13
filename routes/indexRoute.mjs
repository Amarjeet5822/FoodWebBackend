import express from "express";
import { recipeRoutes } from "./recipeRoutes.mjs";
import { authRoutes } from "./authRoutes.mjs";

export const indexRoute = express.Router();

indexRoute.use("/api/recipes", recipeRoutes);
indexRoute.use("/api/auth", authRoutes)