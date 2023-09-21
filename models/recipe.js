import { randomUUID } from "crypto";

import FileAdapter from "./db.js";

const db = new FileAdapter("recipes.json");

export const listRecipes = async () => {
  return await db.read();
};

export const getRecipeById = async (recipeId) => {
  const recipes = await db.read();
  const recipe = recipes.find((recipe) => recipe.id === recipeId);
  return recipe;
};

export const removeRecipe = async (recipeId) => {
  const recipes = await db.read();
  const index = recipes.findIndex((recipe) => recipe.id === recipeId);
  if (index !== -1) {
    const recipe = recipes.splice(index, 1);
    await db.write(recipes);
    return recipe;
  }
  return null;
};

export const addRecipe = async (body) => {
  const recipes = await db.read();
  const newRecipe = {
    id: randomUUID(),
    description: `You didn't add any description`,
    url: `You didn't add any url`,
    ingredients: [],
    mealType: "Meal",
    alcoholType: "",
    ...body,
  };
  recipes.push(newRecipe);
  await db.write(recipes);
  return newRecipe;
};

export const updateRecipe = async (recipeId, body) => {
  const recipes = await db.read();
  const index = recipes.findIndex((recipe) => recipe.id === recipeId);
  if (index !== -1) {
    recipes[index] = [...recipes[index], ...body];
    await db.write(recipes);
    return recipes[index];
  }
  return null;
};
