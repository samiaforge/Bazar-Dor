
require("dotenv").config({ path: ".env" });

const dns = require("node:dns");
const { MongoClient } = require("mongodb");

dns.setServers(["1.1.1.1"]);

async function testConnection() {
  const uri = process.env.BETTER_AUTH_DB_URL;

  if (!uri) {
    console.log("BETTER_AUTH_DB_URL was not loaded from .env.local");
    return;
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  } finally {
    await client.close().catch(() => {});
  }
}

testConnection();
