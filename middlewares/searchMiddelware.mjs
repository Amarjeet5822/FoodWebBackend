import AppError from "../utils/AppError.mjs";

export const searchMiddelware = (req, res, next) => {
  const {query } = req.query;
  if(!query){
    next(new AppError("Query is not defined", 400));
  }
  next();
};
