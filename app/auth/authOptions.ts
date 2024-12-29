import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@prisma/client";
import GitHubProvider from "next-auth/providers/github";
const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // CredentialsProvider({
    //   name: "Email and Password",
    //   credentials: {
    //     email: { label: "Email", type: "text", placeholder: "Email" },
    //     password: {
    //       label: "Password",
    //       type: "password",
    //       placeholder: "Password",
    //     },
    //   },
    //   async authorize(credentials, req) {
    //     if (credentials || !credentials!.email || !credentials!.password)
    //       return null;

    //     const dbUser = await prisma.user.findFirst({
    //       where: { email: credentials!.email },
    //     });

    //     if (dbUser && dbUser.password === credentials!.password) {
    //       const { password, createdAt, id, ...dbUserWithoutPassword } = dbUser;
    //       return dbUserWithoutPassword as User;
    //     }

    //     return null;
    //   },
    // }),
  ],
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token
        token.id = user?.id
      }
      return token
    },
    session({ session, token }) {
        // I skipped the line below coz it gave me a TypeError
        // session.accessToken = token.accessToken;
        session.user.id = token.id;
  
        return session;
      },
  },
  session: {
    strategy: "jwt",
  },
};

export default authOptions;
