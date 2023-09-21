import { Router } from "express";
import {
  addRecipe,
  getRecipeById,
  listRecipes,
  removeRecipe,
} from "../../models/recipe.js";

const router = Router();

router.get("/", async (req, res, next) => {
  const recipes = await listRecipes();
  return res.json({ status: "success", code: 200, payload: { recipes } });
});

router.get("/:recipeId", async (req, res, next) => {
  const recipe = await getRecipeById(req.params.recipeId);
  if (recipe) {
    return res.json({ status: "success", code: 200, payload: { recipe } });
  }
  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not found" });
});

router.post("/", async (req, res, next) => {
  const recipe = await addRecipe(req.body);
  res.status(201).json({ status: "success", code: 201, payload: { recipe } });
});

router.delete("/:recipeId", async (req, res, next) => {
  const recipe = await removeRecipe(req.params.recipeId);
  if (recipe) {
    return res.json({ status: "success", code: 200, payload: { recipe } });
  }
  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not found" });
});

router.put("/:recipeId", async (req, res, next) => {
  res.json({ message: "template message" });
});

export default router;
