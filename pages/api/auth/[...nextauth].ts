import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/db/index";
import bcrypt from "bcrypt";
import NextAuth, { AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getSession } from "next-auth/react";
import getCurrentUser from "@/app/_actions/getCurrentUser";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    // async jwt({ token, account, profile }) {
    //   const userinfo = await db.user.findUnique({
    //     where: {
    //       email: token?.email || "",
    //     },
    //     include: {
    //       userGroups: true,
    //     },
    //   });

    //   const userRoles = await db.role.findMany({
    //     where: {
    //       groups: {
    //         some: {
    //           id: {
    //             in: userinfo?.userGroups.map((userGroup) => userGroup.id),
    //           },
    //         },
    //       },
    //     },
    //     include: {
    //       permission: true,
    //     },
    //   });

    //   // console.log("userRoles :", userRoles);

    //   token = {
    //     ...token,
    //     userGroups: userinfo?.userGroups,
    //     roles: userRoles,
    //   };

    //   // console.log(token);

    //   return token;
    // },
    async session({ session, token }) {
      const userinfo = await db.user.findUnique({
        where: {
          email: session.user.email,
        },
        include: {
          profile: true,
        },
      });

      session.user = {
        ...userinfo,
      };
      return Promise.resolve(session);
    },
  },
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
