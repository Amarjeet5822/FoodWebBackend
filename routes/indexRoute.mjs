import express from "express";
import { recipeRoutes } from "./recipeRoutes.mjs";

export const indexRoute = express.Router();

indexRoute.use("/api/recipes", recipeRoutes);