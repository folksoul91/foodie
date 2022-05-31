// Dependencies
const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");

// Index
router.get("/", recipeController.homepage);
router.get("/categories", recipeController.navigateCategories);

module.exports = router;
