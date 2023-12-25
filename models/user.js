import mongoose, { model } from "mongoose";
import { LIMIT_NAME_LENGTH, Role } from "../libs/constants.js";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";

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
    token: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: { values: Object.values(Role), message: "Invalid role" },
      default: Role.USER,
    },
    avatar: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: "250" }, true);
      },
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

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(6);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = model("user", userSchema);
