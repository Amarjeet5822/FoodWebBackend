import User from "../models/userModel.mjs";
import AppError from "../utils/AppError.mjs";

export const SignupMiddleware = async (req, res, next) => {
  const { email, name, password } = req.body;
  if (!email?.trim() || !name?.trim() || !password?.trim()) {
    return next(new AppError(406, "Resource is unavailable!"));
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return next(new AppError(409, "User already exist! Please login"));
    }
    next();
  } catch (error) {
    next(new AppError(500, error.message));
  }
};


