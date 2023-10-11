import {} from "jsonwebtoken";
import { HTTP_STATUS_CODES } from "../libs/constants.js";
import {
  createUser,
  findByEmail,
  findById,
  updateToken,
} from "../repository/users.js";
const SECRET_KEY = process.env.JWT_SECRET_KEY;
export const guard = async (req, res, next) => {
  const token = req.get("Authorization")?.split(" ")[1];
  console.log(token);
  next();
};
