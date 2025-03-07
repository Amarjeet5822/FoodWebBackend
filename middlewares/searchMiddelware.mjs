
export const searchMiddelware = (req, res, next) => {
  const {query } = req.query;
  if(!query){
    return res.status(400).json("Query is not defined");
  }
  next();
};
