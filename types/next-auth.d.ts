import NextAuth from "next-auth";
import { CurrentUser } from "./types";

declare module "next-auth" {
  interface Session {
    user: User;
    expires: Date;
  }
}
