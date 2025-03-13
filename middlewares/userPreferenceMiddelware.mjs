
import { UserPreference } from "../models/userPreferencModel.mjs";
import AppError from "../utils/AppError.mjs";

export const userPreferenceMiddelware = async (req, res, next) => {
  const { userId} = req.user
  const {  image, title, readyInMinutes, imageId } = req.body;
  if (!image || !title || !readyInMinutes || imageId) {
    const missingFields = [];
    if (!image) missingFields.push("image");
    if (!title) missingFields.push("title");
    if (!readyInMinutes) missingFields.push("readyInMinutes");
    if (!imageId) missingFields.push("imageId");

    return next(new AppError(400,`Missing required fields: ${missingFields.join(', ')}`));
  }
  const isRecipe = await UserPreference.findOne({imageId});
  if(isRecipe) {
    return next(new AppError(409, "Allready Saved Recipe"))
  }
  next();
};
