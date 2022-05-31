require("../models/database");
const Category = require("../models/category");

// Homepage
exports.homepage = async (req, res) => {
  const limitNumber = 5;
  const categories = await Category.find({}).limit(limitNumber);
  res.render("index", { title: "homepage", categories });
};
