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
import { guard } from "../../../middlewares/guard.js";
const router = Router();

router.get("/", guard, listRecipesController);

router.get(
  "/:recipeId",
  guard,
  validateParams(schemaMongoId),
  getRecipeByIdController
);

router.post(
  "/",
  guard,
  validateBody(recipeValidationSchema),
  addRecipeController
);

router.delete(
  "/:recipeId",
  guard,
  validateParams(schemaMongoId),
  removeRecipeController
);

router.put(
  "/:recipeId",
  guard,
  [validateBody(updatedRecipeValidationSchema), validateParams(schemaMongoId)],
  updateRecipeController
);

export default router;
