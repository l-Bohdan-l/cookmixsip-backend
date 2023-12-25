// import * as jwt from "jsonwebtoken";
import jwt from "jsonwebtoken";

import {
  createUser,
  findByEmail,
  findById,
  updateToken,
} from "../../repository/users.js";
import { HTTP_STATUS_CODES } from "../../libs/constants.js";
import { CustomError } from "../../middlewares/errorHandler.js";
import { User } from "../../models/user.js";

const SECRET_KEY = process.env.JWT_SECRET_KEY;
const { sign } = jwt;

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
      avatar: newUser.avatar,
    };
  }

  async login({ email, password }) {
    const user = await this.#getUser(email, password);
    if (!user) {
      throw new CustomError(
        HTTP_STATUS_CODES.UNAUTHORIZED,
        "Invalid credentials"
      );
    }
    const token = this.#generateToken(user);
    await updateToken(user.id, token);
    return { token };
  }
  async logout(id) {
    await updateToken(id, null);
  }

  async #getUser(email, password) {
    const user = await findByEmail(email);
    if (!user) return null;
    if (!(await user?.isValidPassword(password))) return null;
    return user;
  }
  #generateToken(user) {
    const payload = { id: user.id };
    const token = sign(payload, SECRET_KEY, { expiresIn: "2h" });
    return token;
  }
}

export default new AuthService();
