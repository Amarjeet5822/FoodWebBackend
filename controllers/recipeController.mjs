
import { getRecipes } from "./getRecipesController.mjs";
import AppError from "../utils/AppError.mjs";

export const searchRecipes = async (req, res, next ) => {
  try {
    await getRecipes(req, res); // Reuse getRecipes logic for search
  } catch (error) {
    next(new AppError(500, error?.message));
  }
};


