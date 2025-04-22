
import { UserPreference } from "../models/userPreferencModel.mjs";
import AppError from "../utils/AppError.mjs";

export const userPreferenceMiddelware = async (req, res, next) => {
  const {  id } = req.body;
  // console.log("req.body(userPreference", req.body);
  try {
    const isRecipe = await UserPreference.findOne({imageId: id});
    if(isRecipe) {
      next(new AppError(409, "Allready Saved Recipe"))
    }else{
      next();
    }
  } catch (error) {
    next(new AppError(500, error.message || "Failed to add Product"))
  }

};
