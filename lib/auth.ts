import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import dbConnect from "./mongoose";

export async function initAuth() {
  const mongooseInstance = await dbConnect();
  const client = mongooseInstance.connection.getClient();

  return betterAuth({
    database: mongodbAdapter(client.db()),

    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,

    trustedOrigins: [
      "https://mero-blog-ochre.vercel.app",
      "http://localhost:3000",
    ],

    emailAndPassword: {
      enabled: true,
    },
  });
}