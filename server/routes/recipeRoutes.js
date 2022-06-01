// Dependencies
const express = require("express");
const router = express.Router();
const Controller = require("../controllers/recipeController");

// mounting routes
router.get("/", Controller.homepage);
router.get("/recipe/:id", Controller.navigateRecipe);
router.get("/categories", Controller.navigateCategories);
router.get("/categories/:id", Controller.navigateCategoriesById);
router.post("/search", Controller.searchForRecipe);
router.get("/trending", Controller.seeTrend);
router.get("/submit-recipe", Controller.submitRecipe);
router.post("/submit-recipe", Controller.submitRecipePost);
router.delete("/recipe/:id", Controller.recipeDelete);
router.put("/recipe/:id", Controller.recipeUpdate);
router.get("/recipe/:id/edit", Controller.recipeEdit);

module.exports = router;
