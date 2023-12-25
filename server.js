import app from "./app.js";
// import { run } from "./models/db.js";
import { db } from "./config/db.js";
import { mkdir } from "fs/promises";

db.then(() => {
  // console.log("connection to db");

  app.listen(3000, async () => {
    await mkdir(process.env.UPLOAD_FOLDER, { recursive: true });
    console.log("Server running. Use our API on port: 3000");
  });
}).catch((err) => {
  console.log(err);
});
