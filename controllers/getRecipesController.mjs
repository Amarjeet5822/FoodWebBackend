import axios from "axios";
import dotenv from "dotenv";
import AppError from "../utils/AppError.mjs";
dotenv.config();

let cachedRecipes = null; // To store cached data
let lastFetchTime = null; // Timestamp to track cache age
const CACHE_DURATION = 1000 * 60 * 60 * 12; // Cache for 12 hours

// Function to fetch 25 random recipes
const fetchRandomRecipes = async () => {
  try {
    console.log("Fetching new recipes...");
    const apiKey = process.env.SPOONACULAR_API;
    const url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=27`;
    const response = await axios.get(url);
    return response.data.recipes; // Adjusted to use 'recipes' instead of 'results'
  } catch (error) {
    next(new AppError(500, error?.message));
  }
};

// Combined route to fetch all categories
export const getRecipes = async (req, res, next) => {
  const { query } = req.query;

  try {
    // Check if cache is still valid
    if (!cachedRecipes || Date.now() - lastFetchTime >= CACHE_DURATION) {
      cachedRecipes = await fetchRandomRecipes();
      lastFetchTime = Date.now();
    }

    // Filter recipes by title (if search query provided)
    let filteredRecipes = cachedRecipes;
    if (query) {
      filteredRecipes = cachedRecipes.filter((recipe) => {
        if (recipe.title.toLowerCase().includes(query.toLowerCase())) {
          return recipe;
        }
      });
    }

    res.status(200).json(filteredRecipes);
  } catch (error) {
    next(new AppError(500, error?.message));
  }
};
