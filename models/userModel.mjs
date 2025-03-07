import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  displayName: { type: String },
  email: { type: String, unique: true },
  profilePicture: { type: String },
  createdAt: { type: Date, default: Date.now }
}, {
  versionKey: false,
});

export const User = mongoose.model("User", userSchema);
