import Joi from "joi";
import JoiObjectId from "joi-objectid/index.js";

const myJoiObjectId = JoiObjectId(Joi);

export const recipeValidationSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    "string.base": `Filed Name isn't a string`,
    "string.empty": `Filed Name can't be empty`,
    "any.required": `Filed Name is required`,
    "string.min": "Filed Name must be at least 2 characters long",
    "string.max": `Filed Name must be at most 30 characters long`,
  }),
  description: Joi.string().messages({
    "string.base": `Filed description isn't a string`,
  }),
  url: Joi.string().uri().messages({
    "string.uri": `Filed Url must be a valid URI`,
  }),
  ingredients: Joi.array().items(
    Joi.object({
      ingredientsName: Joi.string().alphanum().messages({
        "string.alphanum":
          "Filed IngredientsName can only contain a-z, A-Z, and 0-9",
        "string.base": `Filed IngredientsName isn't a string`,
      }),
      ingredientsAmount: Joi.number().messages({
        "number.base": `Filed IngredientsAmount isn't a number`,
      }),
      measure: Joi.string().alphanum().messages({
        "string.alphanum": "Filed Measure can only contain a-z, A-Z, and 0-9",
        "string.base": `Filed Measure isn't a string`,
      }),
    })
  ),
  mealType: Joi.string().alphanum().min(4).max(8).required().messages({
    "string.base": `Filed MealType isn't a string`,
    "string.empty": `Filed MealType can't be empty`,
    "any.required": `Filed MealType is required`,
    "string.min": "Filed MealType must be at least 4 characters long",
    "string.max": `Filed MealType must be at most 8 characters long`,
    "string.alphanum": "Filed MealType can only contain a-z, A-Z, and 0-9",
  }),
  alcoholType: Joi.string().messages({
    "string.base": `Filed description isn't a string`,
  }),
});

export const updatedRecipeValidationSchema = Joi.object({
  name: Joi.string().min(2).max(30).messages({
    "string.base": `Filed Name isn't a string`,
    "string.empty": `Filed Name can't be empty`,
    "string.min": "Filed Name must be at least 2 characters long",
    "string.max": `Filed Name must be at most 30 characters long`,
  }),
  description: Joi.string().messages({
    "string.base": `Filed description isn't a string`,
  }),
  url: Joi.string().uri().messages({
    "string.uri": `Filed Url must be a valid URI`,
  }),
  ingredients: Joi.array().items(
    Joi.object({
      ingredientsName: Joi.string().alphanum().messages({
        "string.alphanum":
          "Filed IngredientsName can only contain a-z, A-Z, and 0-9",
        "string.base": `Filed IngredientsName isn't a string`,
      }),
      ingredientsAmount: Joi.number().messages({
        "number.base": `Filed IngredientsAmount isn't a number`,
      }),
      measure: Joi.string().alphanum().messages({
        "string.alphanum": "Filed Measure can only contain a-z, A-Z, and 0-9",
        "string.base": `Filed Measure isn't a string`,
      }),
    })
  ),
  mealType: Joi.string().alphanum().min(4).max(8).messages({
    "string.base": `Filed MealType isn't a string`,
    "string.empty": `Filed MealType can't be empty`,
    "string.min": "Filed MealType must be at least 4 characters long",
    "string.max": `Filed MealType must be at most 8 characters long`,
    "string.alphanum": "Filed MealType can only contain a-z, A-Z, and 0-9",
  }),
  alcoholType: Joi.string().messages({
    "string.base": `Filed description isn't a string`,
  }),
});

export const schemaMongoId = Joi.object({
  recipeId: myJoiObjectId().required(),
});
