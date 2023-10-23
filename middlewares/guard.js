import pkg from "jsonwebtoken";
import { HTTP_STATUS_CODES } from "../libs/constants.js";
import {
  // createUser,
  // findByEmail,
  findById,
  // updateToken,
} from "../repository/users.js";
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const { decode, verify } = pkg;
export const guard = async (req, res, next) => {
  const token = req.get("Authorization")?.split(" ")[1];
  const isValid = verifyToken(token);

  if (!isValid) {
    return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).send({
      status: "error",
      code: HTTP_STATUS_CODES.UNAUTHORIZED,
      message: "Not authorized",
    });
  }
  const payload = decode(token);
  const user = await findById({ _id: payload.id });
  if (!user || user.token !== token) {
    return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).send({
      status: "error",
      code: HTTP_STATUS_CODES.UNAUTHORIZED,
      message: "Not authorized",
    });
  }
  req.user = user;
  next();
};

const verifyToken = (token) => {
  try {
    const t = verify(token, SECRET_KEY);
    return !!t;
  } catch (error) {
    return false;
  }
};
