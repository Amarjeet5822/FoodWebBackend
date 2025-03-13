import User from "../models/userModel.mjs";
import AppError from "../utils/AppError.mjs";

const comparePass = async (user, password) => {
  try {
    const isPasswordMatching = await bcrypt.compare(password, user.password)
  return isPasswordMatching
  } catch (error) {
    return false
  }
}

export const LoginMiddleware = async (req, res, next) => {
  const {email, password} = req.body;
  // logic to trim password and email 
  if(!email?.trim() || !password?.trim()) {
    return next(new AppError(400, "Invalid Credential"))
  }
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(!regex.test(email)){
    return next(new AppError(400,"Invalid email! Please enter correct valid email" ))
  }
  try {
    const user = await User.findOne({email});
  if(!user){
    return next(new AppError(404, "User not Found! Please register First"));
  }
  if (comparePass(user, password)){
    next();
  }else{ 
    return next(new AppError(400, "Invalid credential!"));
  }
  } catch (error) {
    next(new AppError(400, error.message));
  }
};

