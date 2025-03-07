import { dbConnect } from "./config/dbConnect.mjs";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import "./config/passport.mjs"
import { indexRoute } from "./routes/indexRoute.mjs";
dotenv.config();

// initialize app 
const app = express();
app.use(cors()); // enables cors 
// to parse body
app.use(express.json());
// to log status code, url, content-length, response time.
app.use(morgan('tiny'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(indexRoute);

// Google OAuth route
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }) // profile[name, profile picture, gender, dob]
);

// Callback route
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(`${process.env.VITE_URL}/dashboard`);
  }
);

app.get("/api/user", (req, res) => {
  if(req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({message: "Not authenticated"});
  }
})

// Logout route
app.get('/logout', (req, res, next ) => {
  req.logout((err) => {
    if(err) {
      return next(err); 
    }
    req.session.destroy((err) => {
      if(err) {
        return next(err); 
      }
      res.clearCookie("connect.sid");
      res.redirect("/"); 
    })
  });
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
  dbConnect();
  console.log(`app running http://localhost:${PORT}`)
})