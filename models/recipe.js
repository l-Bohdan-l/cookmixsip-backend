import mongoose, { model } from "mongoose";
import {
  LIMIT_NAME_LENGTH,
  LIMIT_MEAL_TYPE_LENGTH,
} from "../libs/constants.js";

const { Schema } = mongoose;

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: LIMIT_NAME_LENGTH.min,
      maxLength: LIMIT_NAME_LENGTH.max,
    },
    description: { type: String },
    url: { type: String },
    ingredients: [
      {
        ingredientsName: { type: String },
        ingredientsAmount: { type: Number },
        measure: { type: String },
      },
    ],
    mealType: {
      type: String,
      required: true,
      minLength: LIMIT_MEAL_TYPE_LENGTH.min,
      maxLength: LIMIT_MEAL_TYPE_LENGTH.max,
    },
    alcoholType: { type: String },
  },
  { timestamps: true }
); //versionKey: false

export const Recipe = model("recipe", recipeSchema);
