import mongoose, { model } from "mongoose";
import paginate from "mongoose-paginate-v2";
import {
  LIMIT_NAME_LENGTH,
  LIMIT_MEAL_TYPE_LENGTH,
} from "../libs/constants.js";

const { Schema } = mongoose;
const ingredientsSchema = new Schema(
  {
    ingredientsName: { type: String },
    ingredientsAmount: { type: Number },
    measure: { type: String },
  },
  {
    timestamps: false,
    versionKey: false,
    toJSON: {
      virtuals: false,
      transform: (doc, ret) => {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: false },
  }
);

const Ingredients = model("ingredients", ingredientsSchema);

const recipeSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: {
      type: String,
      required: true,
      minLength: LIMIT_NAME_LENGTH.min,
      maxLength: LIMIT_NAME_LENGTH.max,
    },
    description: { type: String },
    url: { type: String },
    ingredients: [ingredientsSchema],
    //   [
    //   {
    //     ingredientsName: { type: String },
    //     ingredientsAmount: { type: Number },
    //     measure: { type: String },
    //   },
    //   ]
    // ,
    mealType: {
      type: String,
      required: true,
      minLength: LIMIT_MEAL_TYPE_LENGTH.min,
      maxLength: LIMIT_MEAL_TYPE_LENGTH.max,
    },
    alcoholType: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
); // versionKey: false
recipeSchema.plugin(paginate);

export const Recipe = model("recipe", recipeSchema);
