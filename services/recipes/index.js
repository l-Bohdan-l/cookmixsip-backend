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
    const { limit = 5, skip = 0, sortBy, sortByDesc, filter } = query;
    let sortCriteria = null;
    let select = null;

    if (sortBy) {
      sortCriteria = { [sortBy]: 1 };
    }
    if (sortByDesc) {
      sortCriteria = { [sortByDesc]: 1 };
    }

    if (filter) {
      select = filter.split("|").join(" ");
    }
    const { total, results: recipes } = await listRecipes(
      { limit, skip, sortCriteria, select },
      user
    );
    return { total, recipes };
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
