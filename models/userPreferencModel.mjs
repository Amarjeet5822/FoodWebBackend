import mongoose from "mongoose";

const userPreferenceSchema = new mongoose.Schema(
  {
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    image: { type: String, required: true },
    title: { type: String, requried: true },
    readyInMinutes: { type: Number, required: true },
    vegetarian: { type: Boolean, required: true },
    imageId: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const UserPreference = mongoose.model(
  "UserPreference",
  userPreferenceSchema
);
