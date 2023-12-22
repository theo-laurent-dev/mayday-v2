import { AppRouter } from "@/trpc";
import type { inferRouterOutputs } from "@trpc/server";

export type sheet = {
  id: string;
  shortId: string | null;
  title: string;
  shortDescription: string | null;
  description: string | null;
  ref: string | null;
  type: string | null;
  category: string | null;
  subcategory: string | null;
  categoryType: string | null;
  criticity: string | null;
  assignmentGroup: string | null;
  businessApp: string | null;
  published: boolean | null;
  company: string | null;
  obsolete: boolean | null;

  createdAt: string;
  updatedAt: string;

  userId: string;
};

export type user = {
  id: string;
  name: string;
  email: string;
  emailVerified: string | null;
  image: string | null;
  isActive: boolean;
  hashedPassword: string;

  profileId: string;

  createdAt: string;
  updatedAt: string;
};

type RouterOutput = inferRouterOutputs<AppRouter>;

export type SheetsWithUser = RouterOutput["getSheets"];
export type SheetWithUser = RouterOutput["getSheet"];

export type UsersWithRole = RouterOutput["getUsers"];
export type UserWithRole = RouterOutput["getUser"];

export type ProfileWithRole = RouterOutput["getProfiles"];
