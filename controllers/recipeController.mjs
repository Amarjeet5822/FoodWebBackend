import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const searchRecipes = async (req, res) => {
  const { query } = req.query;
  console.log("query line 7 = ", query);
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${process.env.SPOONACULAR_API}`
    );
    res.json(response.data.results); // Spoonacular recipes
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch recipes', error: error.message });
  }
};


