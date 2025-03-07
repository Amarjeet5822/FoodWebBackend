import passport from 'passport';
import GoogleStrategy from "passport-google-oauth20";
import dotenv from "dotenv";
import { User } from '../models/userModel.mjs';
dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    
    try {
      let user = await User.findOne({googleId: profile.id});
      if(!user) {
        user = await User.create({
          googleId: profile._json["sub"],
          displayName: profile._json["name"],
          email: profile._json["email"],
          profilePicture: profile._json["picture"]
        })
      }
      console.log("User: ",user)
      return done(null, user);
    } catch (error) {
      return done(error, null)
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
