import express, { json } from "express";
import logger from "morgan";
import cors from "cors";

import recipeRouter from "./routes/api/recipes/recipesRouter.js";
import authRouter from "./routes/api/auth/authRouter.js";

import { HTTP_STATUS_CODES } from "./libs/constants.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(json());
app.use((req, res, next) => {
  app.set("lang", req.acceptsLanguages(["en", "uk"]) || "en");
  next();
});

app.use("/api/auth", authRouter);
app.use("/api/recipes", recipeRouter);

app.use((req, res) => {
  res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res
    .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
    .json({ message: err.message });
});

export default app;
