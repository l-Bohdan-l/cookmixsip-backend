import mongoose, { model } from "mongoose";
import { LIMIT_NAME_LENGTH } from "../libs/constants.js";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: "Guest",
      minLength: LIMIT_NAME_LENGTH.min,
      maxLength: LIMIT_NAME_LENGTH.max,
    },
    email: {
      type: String,
      required: [true, "Set email for user"],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).toLowerCase());
      },
    },
    password: {
      type: String,
      required: true,
    },
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
);

export const User = model("user", userSchema);
