import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import connectMongo from "@/database/conn";
import Users from "@/model/Schema";
import { compare } from "bcryptjs";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import EmailProvider from "next-auth/providers/email";

export default NextAuth({
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    error: "/signin", // Error code passed in query string as ?error=
  },
  allowDangerousEmailAccountLinking: true,
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
});
