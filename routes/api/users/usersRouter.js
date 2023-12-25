import { Router } from "express";
import avatar from "../../../controllers/users/index.js";
import { wrapper } from "../../../middlewares/errorHandler.js";
import { guard } from "../../../middlewares/guard.js";
import upload from "../../../middlewares/upload.js";

const router = Router();

router.patch("/avatar", guard, upload.single("avatar"), wrapper(avatar));

export default router;
