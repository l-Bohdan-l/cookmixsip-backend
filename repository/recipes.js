// import { randomUUID } from "crypto";

// import FileAdapter from "./db2.js";

// const db = new FileAdapter("recipes.json");
// import { ObjectId } from "mongodb";
// import { db, client } from "./db.js";
import { Recipe } from "../models/recipe.js";

// const getCollection = async (db, collectionName) => {
//   await client;
//   const collection = await db.collection(collectionName);
//   return collection;
// };

export const listRecipes = async () => {
  const result = await Recipe.find();
  return result;
};

export const getRecipeById = async (recipeId) => {
  const result = await Recipe.findOne({ _id: recipeId });
  return result;
};

export const removeRecipe = async (recipeId) => {
  const result = await Recipe.findOneAndRemove({ _id: recipeId });
  return result;
};

export const addRecipe = async (body) => {
  const result = await Recipe.create(body);
  return result;
};

export const updateRecipe = async (recipeId, body) => {
  const result = await Recipe.findOneAndUpdate(
    { _id: recipeId },
    { ...body },
    { new: true }
  );
  return result;
};
