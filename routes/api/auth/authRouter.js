import { Router } from "express";
import {
  registration,
  logout,
  login,
} from "../../../controllers/auth/index.js";
import { wrapper } from "../../../middlewares/errorHandler.js";
import { guard } from "../../../middlewares/guard.js";

const router = Router();

router.post("/registration", wrapper(registration));
router.post("/login", wrapper(login));
router.post("/logout", guard, wrapper(logout));

export default router;
