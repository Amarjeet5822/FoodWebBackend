import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AppError from "../utils/AppError.mjs";
dotenv.config();

export const UserIsAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return next(new AppError(401, "Please Login First!"));
      
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if(err) {
        return next(new AppError(401, "Please Login First!"));
      }
      req.user = decoded // { userId, user} = payload
      next();
    });
  } catch (error) {
    next(new AppError(500, error.message));
  }
};
