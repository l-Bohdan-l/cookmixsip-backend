import { Router } from "express";
import {
  registration,
  logout,
  login,
} from "../../../controllers/auth/index.js";
import { wrapper } from "../../../middlewares/errorHandler.js";
import { guard } from "../../../middlewares/guard.js";
import { limiter } from "../../../middlewares/rate-limit.js";

const router = Router();

router.post("/registration", limiter(15 * 60 * 1000, 2), wrapper(registration));
router.post("/login", limiter(15 * 60 * 1000, 2), wrapper(login));
router.post("/logout", guard, wrapper(logout));

export default router;
