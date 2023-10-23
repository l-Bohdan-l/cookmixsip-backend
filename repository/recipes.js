import { Recipe } from "../models/recipe.js";

export const listRecipes = async (query, user) => {
  const result = await Recipe.find({ owner: user.id });
  return result;
};

export const getRecipeById = async (recipeId, user) => {
  const result = await Recipe.findOne({
    _id: recipeId,
    owner: user.id,
  }).populate({
    path: "owner",
    select: "name email role createdAt updatedAt",
  });
  return result;
};

export const removeRecipe = async (recipeId, user) => {
  const result = await Recipe.findOneAndRemove({
    _id: recipeId,
    owner: user.id,
  });
  return result;
};

export const addRecipe = async (body, user) => {
  const result = await Recipe.create({ ...body, owner: user.id });
  return result;
};

export const updateRecipe = async (recipeId, body, user) => {
  const result = await Recipe.findOneAndUpdate(
    { _id: recipeId, owner: user.id },
    { ...body },
    { new: true }
  );
  return result;
};
