import "dotenv/config";
import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.URI_DB;

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const dbName = "cookmixsip";

await client.connect();
export const db = client.db(dbName);

export async function run() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  //   const collection = db.collection("documents");

  // the following code examples can be pasted here...

  return "done.";
}

process.on("SIGINT", async () => {
  console.log("Disconnected from db");
  await client.connect();
  await client.close();
  process.exit(1);
});
