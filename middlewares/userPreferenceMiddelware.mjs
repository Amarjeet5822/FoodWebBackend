
export const userPreferenceMiddelware = (req, res, next  ) => {
  console.log(req.body)
  const { userId, favoriteRecipes, diet, cuisine } = req.body;
  if(!userId || !favoriteRecipes || !diet || !cuisine ) {
    return res.status(400).json("required all details")
  }
  next();
}