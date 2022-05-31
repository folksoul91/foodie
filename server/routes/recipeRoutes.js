// Dependencies
const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");

// mounting routes
router.get("/", recipeController.homepage);
router.get("/recipe/:id", recipeController.navigateRecipe);
router.get("/categories", recipeController.navigateCategories);
router.get("/categories/:id", recipeController.navigateCategoriesById);
router.post("/search", recipeController.searchForRecipe);
router.get("/trending", recipeController.seeTrend);
router.get("/submit-recipe", recipeController.submitRecipe);

module.exports = router;
