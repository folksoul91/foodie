require("../models/database");
const Category = require("../models/category");

// Homepage
exports.homepage = async (req, res) => {
  const limitNumber = 5;
  const categories = await Category.find({}).limit(limitNumber);
  res.render("index", { title: "homepage", categories });
};

// Navigate Categories
exports.navigateCategories = async (req, res) => {
  const limitNumber = 10;
  const categories = await Category.find({}).limit(limitNumber);
  res.render("categories.ejs", { title: "Categories", categories });
};
