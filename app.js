import express, { json } from "express";
import logger from "morgan";
import cors from "cors";

import router from "./routes/api/recipesRouter.js";
import { HTTP_STATUS_CODES } from "./libs/constants.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(json());
app.use((req, res) => {
  app.set("lang", req.acceptsLanguages(["en", "uk"]) || "en");
});

app.use("/api/recipes", router);

app.use((req, res) => {
  res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res
    .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
    .json({ message: err.message });
});

export default app;
