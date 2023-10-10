import { Router } from "express";
import {
  registration,
  logout,
  login,
} from "../../../controllers/auth/index.js";
import { wrapper } from "../../../middlewares/errorHandler.js";

const router = Router();

router.post("/registration", wrapper(registration));
router.post("/logout", wrapper(logout));
router.post("/login", wrapper(login));

export default router;
