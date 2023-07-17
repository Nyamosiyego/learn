import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import EmailProvider from "next-auth/providers/email";
import ProductForm from "@/pages/components/ProductForm";
import { Admin } from '@/model/Admin'

const adminEmails = ["omwegaedmond@gmail.com"]

export const authOptions = ({
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
  callbacks: {
    session: async ({ session, user, token }) => {
      if (adminEmails.includes(session?.user?.email)) {
        const userId = token.sub; // Access the sub property from the token object
        
        session.userId = userId;
        
        return session;
      } else {
        return null;
      }
  }},

  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
});

export default NextAuth(authOptions)

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!adminEmails.includes(session?.user?.email)) {
    res.status(401);
    res.end();
    throw "not an admin";
  }
}