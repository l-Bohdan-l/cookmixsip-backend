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
import { wrapper } from "../../../middlewares/errorHandler.js";
const router = Router();

router.get("/", guard, wrapper(listRecipesController));

router.get(
  "/:recipeId",
  guard,
  validateParams(schemaMongoId),
  wrapper(getRecipeByIdController)
);

router.post(
  "/",
  guard,
  validateBody(recipeValidationSchema),
  wrapper(addRecipeController)
);

router.delete(
  "/:recipeId",
  guard,
  validateParams(schemaMongoId),
  wrapper(removeRecipeController)
);

router.put(
  "/:recipeId",
  guard,
  [validateBody(updatedRecipeValidationSchema), validateParams(schemaMongoId)],
  wrapper(updateRecipeController)
);

export default router;
