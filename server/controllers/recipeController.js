require("../models/database");
const Category = require("../models/category");
const Recipe = require("../models/recipe");

// Homepage
exports.homepage = async (req, res) => {
  const limitNumber = 6;
  const categories = await Category.find({}).limit(limitNumber);
  const trending = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
  const american = await Recipe.find({ category: "American" }).limit(
    limitNumber
  );
  const thai = await Recipe.find({ category: "Thai" }).limit(limitNumber);
  const chinese = await Recipe.find({ category: "Chinese" }).limit(limitNumber);
  const food = { trending, american, thai, chinese };
  res.render("index", { title: "homepage", categories, food });
};

// Navigate Categories
exports.navigateCategories = async (req, res) => {
  const limitNumber = 15;
  const categories = await Category.find({}).limit(limitNumber);
  res.render("categories.ejs", { title: "Categories", categories });
};

// Navigate Categories by Id
exports.navigateCategoriesById = async (req, res) => {
  let categoryId = req.params.id;
  const limitNumber = 15;
  const categoryById = await Recipe.find({ category: categoryId }).limit(
    limitNumber
  );
  res.render("categories.ejs", { title: "Categories", categoryById });
};

// Recipe route/:id
exports.navigateRecipe = async (req, res) => {
  let recipeId = req.params.id;
  const recipe = await Recipe.findById(recipeId);
  res.render("recipe", { title: "Recipe", recipe });
};

// Search route
exports.searchForRecipe = async (req, res) => {
  let searchRecipe = req.body.searchRecipe;
  let recipe = await Recipe.find({
    $text: { $search: searchRecipe, $diacriticSensitive: true },
  });
  res.render("search", { title: "Search", recipe });
};
