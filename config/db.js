// import "dotenv/config";
import mongoose from "mongoose";
const uri = process.env.URI_DB;

export const db = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on("disconnected", (err) => {
  console.log("disconnected from DB");
});

process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("Disconnected from db");
    process.exit(1);
  });
});
