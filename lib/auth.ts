import { db } from "@/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
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

        if (!user.isActive) {
          throw new Error("Account unauthorized");
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
          profile: {
            include: {
              roles: {
                include: {
                  application: true,
                },
              },
            },
          },
        },
      });

      session.user = {
        ...userinfo,
      };
      return Promise.resolve(session);
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;
