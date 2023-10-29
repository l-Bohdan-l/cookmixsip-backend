import { HTTP_STATUS_CODES } from "../../libs/constants.js";
import recipesServices from "../../services/recipes/index.js";

export const listRecipesController = async (req, res) => {
  const recipes = await recipesServices.getAll(req.query, req.user);

  return res.json({
    status: "success",
    code: HTTP_STATUS_CODES.OK,
    payload: { ...recipes },
  });
};

export const getRecipeByIdController = async (req, res, next) => {
  const recipe = await recipesServices.getById(req.params.recipeId, req.user);
  return res.json({
    status: "success",
    code: HTTP_STATUS_CODES.OK,
    payload: { recipe },
  });
};

export const addRecipeController = async (req, res, next) => {
  const recipe = await recipesServices.create(req.body, req.user);
  res.status(HTTP_STATUS_CODES.CREATED).json({
    status: "success",
    code: HTTP_STATUS_CODES.CREATED,
    payload: { recipe },
  });
};

export const removeRecipeController = async (req, res, next) => {
  const recipe = await recipesServices.remove(req.params.recipeId, req.user);

  return res.json({
    status: "success",
    code: HTTP_STATUS_CODES.OK,
    payload: { recipe },
  });
};

export const updateRecipeController = async (req, res, next) => {
  const recipe = await recipesServices.update(
    req.params.recipeId,
    req.body,
    req.user
  );

  return res.json({
    status: "success",
    code: HTTP_STATUS_CODES.OK,
    payload: { recipe },
  });
};
