import express from "express";
import { searchRecipes } from "../controllers/recipeController.mjs";
import { searchMiddelware } from "../middlewares/searchMiddelware.mjs";
import { deleteSavedRecipe, getSavedRecipe, savePreferences } from "../controllers/userPreferenceController.mjs";
import { userPreferenceMiddelware } from "../middlewares/userPreferenceMiddelware.mjs";
import { getRecipes } from "../controllers/getRecipesController.mjs";
import { UserIsAuthenticated } from "../middlewares/userIsAuthenticated.mjs";


export const recipeRoutes = express.Router();
// method:  http://localhost:8082/api/recipes;
recipeRoutes.get("/", getRecipes);
recipeRoutes.get("/search", searchMiddelware, searchRecipes );

recipeRoutes.post("/preference/save", UserIsAuthenticated, userPreferenceMiddelware, savePreferences );
recipeRoutes.get("/preference/save", UserIsAuthenticated, getSavedRecipe );
recipeRoutes.delete("/preference/save/:imageId", UserIsAuthenticated,    deleteSavedRecipe );

