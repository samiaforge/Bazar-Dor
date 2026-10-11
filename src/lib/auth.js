import dns from "node:dns";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";



dns.setServers(["1.1.1.1", "8.8.8.8"]);


const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
const db = client.db("bazar_dor");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET 
    },
    github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
    }

  },



  database: mongodbAdapter(db, {
    client,
  }),
});