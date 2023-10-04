import {
  addRecipe,
  getRecipeById,
  listRecipes,
  removeRecipe,
  updateRecipe,
} from "../../repository/recipes.js";
import { HTTP_STATUS_CODES } from "../../libs/constants.js";

export const listRecipesController = async (req, res, next) => {
  const recipes = await listRecipes();
  return res.json({
    status: "success",
    code: HTTP_STATUS_CODES.OK,
    payload: { recipes },
  });
};

export const getRecipeByIdController = async (req, res, next) => {
  const recipe = await getRecipeById(req.params.recipeId);
  if (recipe) {
    return res.json({
      status: "success",
      code: HTTP_STATUS_CODES.OK,
      payload: { recipe },
    });
  }
  return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
    status: "error",
    code: HTTP_STATUS_CODES.NOT_FOUND,
    message: "Not found",
  });
};

export const addRecipeController = async (req, res, next) => {
  const recipe = await addRecipe(req.body);
  res.status(HTTP_STATUS_CODES.CREATED).json({
    status: "success",
    code: HTTP_STATUS_CODES.CREATED,
    payload: { recipe },
  });
};

export const removeRecipeController = async (req, res, next) => {
  const recipe = await removeRecipe(req.params.recipeId);
  if (recipe) {
    return res.json({
      status: "success",
      code: HTTP_STATUS_CODES.OK,
      payload: { recipe },
    });
  }
  return res
    .status(HTTP_STATUS_CODES.NOT_FOUND)
    .json({
      status: "error",
      code: HTTP_STATUS_CODES.NOT_FOUND,
      message: "Not found",
    });
};

export const updateRecipeController = async (req, res, next) => {
  const recipe = await updateRecipe(req.params.recipeId, req.body);
  if (recipe) {
    return res.json({
      status: "success",
      code: HTTP_STATUS_CODES.OK,
      payload: { recipe },
    });
  }
  return res
    .status(HTTP_STATUS_CODES.NOT_FOUND)
    .json({
      status: "error",
      code: HTTP_STATUS_CODES.NOT_FOUND,
      message: "Not found",
    });
};
