import { AppRouter } from "@/trpc";
import { JsonValue } from "@prisma/client/runtime/library";
import type { inferRouterOutputs } from "@trpc/server";
import { ReactNode } from "react";
import {
  ServicenowAssignmentGroupFormSchema,
  ServicenowCategoryFormSchema,
  ServicenowCategoryTypeFormSchema,
  ServicenowSubCategoryFormSchema,
} from "@/types/schemas";
import { z } from "zod";

interface Item {
  group: string;
  id: string;
  label: string;
}

export interface GroupedItems {
  name: string;
  items: Item[];
}

type HOC = {
  children: ReactNode;
};

export type HasPermissionShieldProps = HOC & {
  required: string;
};

export type sheet = {
  id: string;
  shortId: string | null;
  title: string;
  shortDescription: string | null;
  description: string | null;
  ref: string | null;
  type: string | null;
  categoryId: string | null;
  subcategoryId: string | null;
  categorytypeId: string | null;
  criticity: string | null;
  assignmentgroupId: string | null;
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

export type role = {
  name: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  label: string;
  applicationId: string;
};

export type profile = {
  name: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  label: string;
  permissions: JsonValue;
};

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  isActive: boolean;
  hashedPassword: string;

  profileId: string;

  createdAt: Date;
  updatedAt: Date;
  profile: profile;
};

export type ServicenowCategoryValues = z.infer<
  typeof ServicenowCategoryFormSchema
>;

export type ServicenowSubCategoryValues = z.infer<
  typeof ServicenowSubCategoryFormSchema
>;

export type ServicenowCategoryTypeValues = z.infer<
  typeof ServicenowCategoryTypeFormSchema
>;

export type ServicenowAssignmentGroupValues = z.infer<
  typeof ServicenowAssignmentGroupFormSchema
>;

type RouterOutput = inferRouterOutputs<AppRouter>;

export type SheetsWithUser = RouterOutput["getSheets"];
export type SheetWithUser = RouterOutput["getSheet"];
export type ObsoletesSheet = RouterOutput["getObsoletesSheets"][0];

export type UsersWithRole = RouterOutput["getUsers"];
export type UserWithRole = RouterOutput["getUser"];

export type ProfilesWithRole = RouterOutput["getProfiles"];
export type ProfileWithRole = RouterOutput["getProfile"]["profile"];
export type ProfileWithRoleAndApplications = RouterOutput["getProfile"];

export type ApplicationsWithRoles = RouterOutput["getApplications"];
export type ApplicationWithRoles = RouterOutput["getApplications"][0];

export type RolesWithApplications = RouterOutput["getRoles"];
