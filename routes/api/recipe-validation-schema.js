import Joi from "joi";

export const recipeValidationSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required().messages({
    "string.base": `Filed Name isn't a string`,
    "string.empty": `Filed Name can't be empty`,
    "any.required": `Filed Name is required`,
    "string.min": "Filed Name must be at least 2 characters long",
    "string.max": `Filed Name must be at most 30 characters long`,
    "string.alphanum": "Filed Name can only contain a-z, A-Z, and 0-9",
  }),
  description: Joi.string().messages({
    "string.base": `Filed description isn't a string`,
  }),
  url: Joi.string().uri().messages({
    "string.uri": `Filed Url must be a valid URI`,
  }),
  ingredients: Joi.object({
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
  }),
  mealType: Joi.string().alphanum().required().messages({
    "string.base": `Filed Name isn't a string`,
    "string.empty": `Filed Name can't be empty`,
    "any.required": `Filed Name is required`,
    "string.min": "Filed Name must be at least 2 characters long",
    "string.max": `Filed Name must be at most 30 characters long`,
    "string.alphanum": "Filed Name can only contain a-z, A-Z, and 0-9",
  }),
  alcoholType: Joi.string().alphanum(),
});
