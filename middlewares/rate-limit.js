import { rateLimit } from "express-rate-limit";
import { HTTP_STATUS_CODES } from "../libs/constants.js";

export const limiter = (duration, limit) => {
  return rateLimit({
    windowMs: duration,
    max: limit,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    handler: (req, res, next) => {
      return res.status(HTTP_STATUS_CODES.TOO_MANY_REQUESTS).json({
        status: "error",
        code: HTTP_STATUS_CODES.TOO_MANY_REQUESTS,
        message: "Too many requests, please try again later",
      });
    },
  });
};
