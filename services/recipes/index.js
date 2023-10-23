import {
  addRecipe,
  getRecipeById,
  listRecipes,
  removeRecipe,
  updateRecipe,
} from "../../repository/recipes.js";
import { HTTP_STATUS_CODES } from "../../libs/constants.js";
import { CustomError } from "../../middlewares/errorHandler.js";

class RecipesService {
  async getAll(query, user) {
    console.log("id", user.id);
    const recipes = await listRecipes(query, user);
    return recipes;
  }

  async getById(id, user) {
    const recipe = await getRecipeById(id, user);
    if (!recipe) {
      throw new CustomError(HTTP_STATUS_CODES.NOT_FOUND, "Recipe not found");
    }
    return recipe;
  }

  async create(body, user) {
    const recipe = await addRecipe(body, user);

    return recipe;
  }

  async update(id, body, user) {
    const recipe = await updateRecipe(id, body, user);

    if (!recipe) {
      throw new CustomError(HTTP_STATUS_CODES.NOT_FOUND, "Recipe not found");
    }

    return recipe;
  }

  async remove(id, user) {
    const recipe = await removeRecipe(id, user);

    if (!recipe) {
      throw new CustomError(HTTP_STATUS_CODES.NOT_FOUND, "Recipe not found");
    }

    return recipe;
  }
}

export default new RecipesService();
