import { HTTP_STATUS_CODES } from "../libs/constants.js";

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
      status: "error",
      code: HTTP_STATUS_CODES.BAD_REQUEST,
      message: error.message,
    });
  }
};

export const validateParams = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.params);
    next();
  } catch (error) {
    return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
      status: "error",
      code: HTTP_STATUS_CODES.BAD_REQUEST,
      message: error.message,
    });
  }
};
