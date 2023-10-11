import { Router } from "express";
import {
  recipeValidationSchema,
  updatedRecipeValidationSchema,
  schemaMongoId,
} from "./recipe-validation-schema.js";
import {
  validateBody,
  validateParams,
} from "../../../middlewares/validation.js";
import {
  addRecipeController,
  getRecipeByIdController,
  listRecipesController,
  removeRecipeController,
  updateRecipeController,
} from "../../../controllers/recipes/index.js";

const router = Router();

router.get("/", listRecipesController);

router.get(
  "/:recipeId",
  validateParams(schemaMongoId),
  getRecipeByIdController
);

router.post("/", validateBody(recipeValidationSchema), addRecipeController);

router.delete(
  "/:recipeId",
  validateParams(schemaMongoId),
  removeRecipeController
);

router.put(
  "/:recipeId",
  [validateBody(updatedRecipeValidationSchema), validateParams(schemaMongoId)],
  updateRecipeController
);

export default router;
