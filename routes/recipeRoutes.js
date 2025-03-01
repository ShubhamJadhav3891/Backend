const express = require("express");
const Recipe = require("../models/Recipe");
const auth = require("../middleware/auth");
const router = express.Router();

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("user", "name email");
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new recipe (Auth Required)
router.post("/", auth, async (req, res) => {
  try {
    const { title, ingredients, instructions, image } = req.body;
    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      image,
      user: req.user.id
    });

    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
