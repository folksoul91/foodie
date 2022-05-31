const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    enum: ["Thai", "American", "Chinese", "Mexican", "Indian", "Korean"],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
