
import AppError from "../utils/AppError.mjs";

export const userPreferenceMiddelware = (req, res, next) => {
  console.log("Request Body:", req.body);

  const { userId, favoriteRecipes, diet, cuisine } = req.body;

  if (!userId || !favoriteRecipes || !diet || !cuisine) {
    const missingFields = [];
    if (!userId) missingFields.push("userId");
    if (!favoriteRecipes) missingFields.push("favoriteRecipes");
    if (!diet) missingFields.push("diet");
    if (!cuisine) missingFields.push("cuisine");

    return next(new AppError(`Missing required fields: ${missingFields.join(', ')}`, 400));
  }

  next();
};
