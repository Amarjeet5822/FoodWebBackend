import mongoose from "mongoose";

const userPreferenceSchema = new mongoose.Schema({
  userId: {
    type: String, required: true, 
  },
  favoriteRecipes: [
    {
      id: String,
      title: String,
      image: String,
    },
  ],
  diet: {
    type: String,
    enum: ['vegetarian', 'vegan', 'paleo', 'keto', 'none'],
    default: 'none',
  },
  cuisine: {
    type: [String],
    default: [],
  },
}, { 
  versionKey: false,
  timestamps: true 
});

export const UserPreference = mongoose.model('UserPreference', userPreferenceSchema);


