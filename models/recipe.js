// import { randomUUID } from "crypto";

// import FileAdapter from "./db2.js";

// const db = new FileAdapter("recipes.json");
import { ObjectId } from "mongodb";
import { db, client } from "./db.js";

const getCollection = async (db, collectionName) => {
  await client;
  const collection = await db.collection(collectionName);
  return collection;
};

export const listRecipes = async () => {
  const collection = await getCollection(db, "recipes");
  // return await db.read();
  return await collection.find({}).toArray();
};

export const getRecipeById = async (recipeId) => {
  const collection = await getCollection(db, "recipes");
  const objId = new ObjectId(recipeId);
  const [result] = await collection.find({ _id: objId }).toArray();
  return result;
};

export const removeRecipe = async (recipeId) => {
  const collection = await getCollection(db, "recipes");
  const objId = new ObjectId(recipeId);
  const result = await collection.findOneAndDelete({
    _id: objId,
  });

  return result;
  // const recipes = await db.read();
  // const index = recipes.findIndex((recipe) => recipe.id === recipeId);
  // if (index !== -1) {
  //   const recipe = recipes.splice(index, 1);
  //   await db.write(recipes);
  //   return recipe;
  // }
  // return null;
};

export const addRecipe = async (body) => {
  // const recipes = await db.read();
  const collection = await getCollection(db, "recipes");
  const newRecipe = {
    // id: randomUUID(),
    description: `You didn't add any description`,
    url: `You didn't add any url`,
    ingredients: [],
    mealType: "Meal",
    alcoholType: "",
    ...body,
  };
  // recipes.push(newRecipe);
  // await db.write(recipes);
  const result = await collection.insertOne(newRecipe);
  return newRecipe;
};

export const updateRecipe = async (recipeId, body) => {
  // const recipes = await db.read();
  // const index = recipes.findIndex((recipe) => recipe.id === recipeId);
  // if (index !== -1) {
  //   recipes[index] = { ...recipes[index], ...body };
  //   await db.write(recipes);
  //   return recipes[index];
  // }
  // return null;
  const collection = await getCollection(db, "recipes");
  const objId = new ObjectId(recipeId);
  const result = await collection.findOneAndUpdate(
    {
      _id: objId,
    },
    { $set: body },
    { returnDocument: "after" }
  );
  return result;
};
