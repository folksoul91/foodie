require("../models/database");
const Category = require("../models/category");
const Recipe = require("../models/recipe");

// Homepage
exports.homepage = async (req, res) => {
  const limitNumber = 6;
  const limitNumbers = 5;
  const categories = await Category.find({}).limit(limitNumber);
  const trending = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumbers);

  res.render("index", { title: "homepage", categories, trending });
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

// See Trending - button
exports.seeTrend = async (req, res) => {
  const limitNumber = 20;
  const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
  res.render("see-trend", { title: "Trending", recipe });
};

// Submit Recipe - New
exports.submitRecipe = async (req, res) => {
  res.render("submit-recipe", { title: "Submit Recipe" });
};

// Submit Recipe - Create
exports.submitRecipePost = async (req, res) => {
  let imageUploadFile;
  let uploadPath;
  let newImageName;

  if (!req.files || Object.keys(req.files).length === 0) {
    console.log("No Files where uploaded.");
  } else {
    imageUploadFile = req.files.image;
    newImageName = Date.now() + imageUploadFile.name;

    uploadPath =
      require("path").resolve("./") + "/public/uploads/" + newImageName;

    imageUploadFile.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);
    });
  }

  const newRecipe = new Recipe({
    name: req.body.name,
    description: req.body.description,
    email: req.body.email,
    ingredients: req.body.ingredients,
    category: req.body.category,
    image: newImageName,
  });
  await newRecipe.save();
  res.redirect("/submit-recipe");
};

// delete
exports.recipeDelete = (req, res) => {
  Recipe.findByIdAndRemove(req.params.id, (err, deletedRecipe) => {
    res.redirect("/");
  });
};

//update
exports.recipeUpdate = (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, (err, updatedEdit) => {
    res.redirect("/recipe/" + updatedEdit._id);
  });
};

//edit
exports.recipeEdit = (req, res) => {
  Recipe.findById(req.params.id, (err, foundEdit) => {
    // console.log(foundEdit);
    res.render("edit", { title: "edit", edit: foundEdit });
  });
};
