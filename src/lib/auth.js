import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import dns from "node:dns";



dns.setServers(["1.1.1.1"]);


const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
const db = client.db("bazar_dor");

export const auth = betterAuth({
   baseURL: "https://bazar-dor-psi-seven.vercel.app",
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

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
    },
  },


  database: mongodbAdapter(db, {
    client,
  }),
});