import { User } from "../models/user.js";

export const findById = async (id) => {
  return await User.findById(id);
};

export const findByEmail = async (email) => {
  return await User.findOne({ email });
};

export const createUser = async (body) => {
  const user = await User(body);
  return await user.save();
};

export const updateToken = async (id, token) => {
  return await User.findByIdAndUpdate(id, { token });
};
