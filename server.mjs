import { dbConnect } from "./config/dbConnect.mjs";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
// import cookieParser from "cookie-parser";
import cors from "cors";
import AppError from "./utils/AppError.mjs";
import "./config/passport.mjs"
import { indexRoute } from "./routes/indexRoute.mjs";
dotenv.config();

// initialize app 
const app = express();

// to parse body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// to log status code, url, content-length, response time.
app.use(morgan('tiny'));

// // Define the secret key for signing cookies
// const cookieParserSecret = process.env.SESSION_SECRET;
// app.use(cookieParser(cookieParserSecret));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production', httpOnly: true }
}));

const whitelist = [process.env.FE_URL, process.env.DEPLOY_FE_URL];

const corsOptionsDelegate = (req, callback) => {
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    callback(null, {
      origin: req.header("Origin"), //// Automatically reflects the request's origin if in the whitelist
      credentials: true,
      methods: "GET,HEAD,PATCH,POST,PUT,DELETE",
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    }); // reflect (enable) the requested origin in the CORS response
  } else {
    callback(null, {origin: false}); // Deny CORS if not in whitelist
  }
};
app.use(cors(corsOptionsDelegate));

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
    res.redirect(`${process.env.DEPLOY_FE_URL}`);
  }
);


// Logout route
app.post('/logout', (req, res, next) => {
  // console.log("line 48")
  try {
    if (req.isAuthenticated()) {
      req.logout((err) => {
        if (err) return next(new AppError("Logout Failed", 500));
  
        req.session.destroy((err) => {
          if (err) return next(new AppError("Session destruction failed", 500));
  
          res.clearCookie('connect.sid'); // Clear session cookie
          res.status(200).json({ message: 'Logout successful' }); // Send confirmation to FE
        });
      });
    } else {
      next(new AppError("No active session Found", 400))  
    }
  } catch (error) {
    next(error);
  }
});

// Handle undefined routes
// 404 handler for unknown routes
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});


// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: err.status || 'error',
    message
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  dbConnect();
  console.log(`app running http://localhost:${PORT}`)
})