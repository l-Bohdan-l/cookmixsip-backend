import app from "./app.js";
// import { run } from "./models/db.js";
import { db } from "./config/db.js";

db.then(() => {
  // console.log("connection to db");

  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
  });
}).catch((err) => {
  console.log(err);
});
