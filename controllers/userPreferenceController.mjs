import { UserPreference } from "../models/userPreferencModel.mjs";
import AppError from "../utils/AppError.mjs";

// Save or update user preferences
// userId, image, title, readyInMinutes, vegetarian
const savePreferences = async (req, res, next) => {
  try {
    const { userId } = req.user;
    console.log("Req.user( savePreference ): ",req.user)
    const { image, title, readyInMinutes, vegetarian, id } = req.body;
    // console.log("line 10 (req.body): " , typeof(req.body.readyInMinutes))
    const newRecipe = new UserPreference({
      userId,
      image,
      title,
      readyInMinutes,
      vegetarian,
      imageId: id,
    });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    next(new AppError(500, "Error saving newRecipe"));
  }
};

const getSavedRecipe = async (req, res, next) => {
  const { userId } = req.user;
  try {
    const getRecipes = await UserPreference.find({ userId });
    // console.log("req.user req.user: ", req.user._id)
    res.status(200).json(getRecipes);
  } catch (error) {
    next(new AppError(400, "Error to get Recipe"));
  }
};

const deleteSavedRecipe = async (req, res, next) => {
  const { imageId } = req.params;
  console.log("imageId", imageId);
  try {
    const getRecipes = await UserPreference.findByIdAndDelete({ _id: imageId });
    res.status(200).json({ message: "Recipe Deleted Successfull" });
  } catch (error) {
    next(new AppError(500, "failed to delete"));
  }
};

export { savePreferences, getSavedRecipe, deleteSavedRecipe };
