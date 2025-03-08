// middlewares/authMiddleware.mjs

export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // user is logged in
  }
  next(new AppError("Not authenticated", 401))
};

