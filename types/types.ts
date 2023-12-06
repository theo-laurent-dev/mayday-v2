import { AppRouter } from "@/trpc";
import type { inferRouterOutputs } from "@trpc/server";
import { SheetWithUserSchema } from "./forms";
import { z } from "zod";

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

type RouterOutput = inferRouterOutputs<AppRouter>;

export type SheetsWithUser = RouterOutput["getSheets"];
export type UserUnpublishedSheetsWithUser =
  RouterOutput["getUnpublishedUserSheets"];

export type SheetWithUser = z.infer<typeof SheetWithUserSchema>;
