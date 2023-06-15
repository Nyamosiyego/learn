import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "@/database/conn";
import Users from "@/model/Schema";
import { compare } from "bcryptjs";

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        connectMongo().catch((error) =>
          res.json({ error: "Connection failed....!" })
        );
        //check if user already exists
        const result = await Users.findOne({ email: credentials.email });
        if (!result) {
        throw new Error("No user found!");
        }
        // compare password
        const isValid = await compare(credentials.password, result.password);
        //incorrect password
        if (!isValid || result.email !== credentials.email) {
          throw new Error("Username or password is incorrect");
        }
        return result;
      }
    })
  ],
  secret: 'pg1QncceF5iCCnFn50lve81tqhjQS8vS2nRnCg+tsI0=',
});
