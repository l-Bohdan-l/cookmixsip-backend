import { Recipe } from "../models/recipe.js";

// export const listRecipes = async (
//   { limit, skip, sortCriteria, select },
//   user
// ) => {
//   const total = await Recipe.countDocuments({ owner: user.id });
//   const results = await Recipe.find({ owner: user.id })
//     .select(select)
//     .skip(skip)
//     .limit(limit)
//     .sort(sortCriteria);
//   return { total, results };
// };

export const listRecipes = async (
  { limit, skip, sortCriteria, select },
  user
) => {
  const { docs: recipes, ...rest } = await Recipe.paginate(
    { owner: user.id },
    { limit, offset: skip, sort: sortCriteria, select }
  );
  return { recipes, rest };
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
