import auth from "../../services/auth/index.js";
import { HTTP_STATUS_CODES } from "../../libs/constants.js";
export const registration = async (req, res) => {
  const user = await auth.create(req.body);
  return res.status(HTTP_STATUS_CODES.CREATED).json({
    status: "success",
    code: HTTP_STATUS_CODES.CREATED,
    payload: { ...user },
  });
};
export const login = async (req, res) => {
  const token = await auth.login(req.body);
  return res.status(HTTP_STATUS_CODES.OK).json({
    status: "success",
    code: HTTP_STATUS_CODES.OK,
    payload: { token },
  });
};
export const logout = async (req, res) => {
  await auth.logout(req.user.id);
  return res.status(HTTP_STATUS_CODES.NO_CONTENT).json();
};
