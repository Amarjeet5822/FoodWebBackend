import express from "express";
import { searchRecipes } from "../controllers/recipeController.mjs";
import { searchMiddelware } from "../middlewares/searchMiddelware.mjs";
import { savePreferences } from "../controllers/userPreferenceController.mjs";
import { userPreferenceMiddelware } from "../middlewares/userPreferenceMiddelware.mjs";
import { getRecipes } from "../controllers/getRecipesController.mjs";


export const recipeRoutes = express.Router();

recipeRoutes.get("/", getRecipes);
recipeRoutes.get("/search", searchMiddelware, searchRecipes );
recipeRoutes.post("/preference/save", userPreferenceMiddelware, savePreferences );
