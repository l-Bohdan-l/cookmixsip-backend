import * as jwt from "jsonwebtoken";
import {
  createUser,
  findByEmail,
  findById,
  updateToken,
} from "../../repository/users.js";
import { HTTP_STATUS_CODES } from "../../libs/constants.js";
import { CustomError } from "../../middlewares/errorHandler.js";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  async create(body) {
    const user = await findByEmail(body.email);
    if (user) {
      throw new CustomError(HTTP_STATUS_CODES.CONFLICT, "User already exists");
    }
    const newUser = await createUser(body);
    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
  }

  async login({ email, password }) {}
  async logout(id) {}
}

export default new AuthService();
