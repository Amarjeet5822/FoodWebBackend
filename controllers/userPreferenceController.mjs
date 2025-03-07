import { UserPreference } from "../models/userPreferencModel.mjs";


// Save or update user preferences
const savePreferences = async (req, res) => {
  const { userId, favoriteRecipes, diet, cuisine } = req.body;

  try {
    let preferences = await UserPreference.findOne({ userId });

    if (preferences) {
      preferences.favoriteRecipes = favoriteRecipes || preferences.favoriteRecipes;
      preferences.diet = diet || preferences.diet;
      preferences.cuisine = cuisine || preferences.cuisine;
    } else {
      preferences = new UserPreference({ userId, favoriteRecipes, diet, cuisine });
    }
    await preferences.save();
    res.status(200).json(preferences);
  } catch (error) {
    res.status(500).json({ message: 'Error saving preferences', error: error.message });
  }
};

export { savePreferences };
