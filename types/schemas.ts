import { z } from "zod";

export const RegisterFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Le nom doit faire au moins 2 caractères.",
    })
    .max(30, "Le nom ne doit pas excéder 30 caractères."),
  email: z
    .string()
    .min(2, {
      message: "L'email doit faire au moins 2 caractères.",
    })
    .email("Ce n'est pas un mail valide."),
  password: z
    .string()
    .min(6, {
      message: "Le mot de passe doit faire au minimum 6 caractères.",
    })
    .max(30, {
      message: "Le mot de passe ne doit pas excéder 30 caractères.",
    }),
});

export const SheetFormSchema = z.object({
  id: z.string().optional(),
  shortId: z.string().nullable().optional(),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  shortDescription: z
    .string()
    .min(2, {
      message: "Short Description must be at least 2 characters.",
    })
    .optional(),
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters.",
    })
    .optional(),
  categoryId: z.string().optional(),
  subcategoryId: z.string().optional(),
  categorytypeId: z.string().optional(),
  assgnmentgroupId: z.string().optional(),
  criticity: z
    .string()
    .min(2, {
      message: "Criticity must be at least 2 characters.",
    })
    .optional(),
  type: z
    .string()
    .min(2, {
      message: "Type must be at least 2 characters.",
    })
    .optional(),
  published: z.boolean().default(false).optional(),
  company: z
    .string()
    .min(2, {
      message: "Society must be at least 2 characters.",
    })
    .optional(),
  obsolete: z.boolean().default(false).optional(),
});

export const UserFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.string().nullable(),
  image: z.string().nullable(),
  isActive: z.boolean(),
  hashedPassword: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const UserUpdateFormSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  isActive: z.boolean(),

  profileId: z.string(),
});

export const ServicenowCategoryFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  label: z.string().min(2, {
    message: "Label must be at least 2 characters.",
  }),
  icon: z.string(),
});

export const ServicenowSubCategoryFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  label: z.string().min(2, {
    message: "Label must be at least 2 characters.",
  }),
  icon: z.string(),
  categoryId: z.string(),
});

export const ServicenowCategoryTypeFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  label: z.string().min(2, {
    message: "Label must be at least 2 characters.",
  }),
  icon: z.string(),
});

export const ServicenowAssignmentGroupFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  label: z.string().min(2, {
    message: "Label must be at least 2 characters.",
  }),
  group: z.string().min(2, {
    message: "Group must be at least 2 characters.",
  }),
});

export const SheetWithUserFormSchema = z.object({
  id: z.string(),
  shortId: z.string().nullable(),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  shortDescription: z
    .string()
    .min(2, {
      message: "Short Description must be at least 2 characters.",
    })
    .nullable(),
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters.",
    })
    .nullable(),
  categoryId: z
    .string()
    .min(2, {
      message: "Category must be at least 2 characters.",
    })
    .nullable(),
  subcategoryId: z
    .string()
    .min(2, {
      message: "Subcategory must be at least 2 characters.",
    })
    .nullable(),
  categorytypeId: z
    .string()
    .min(2, {
      message: "Category type must be at least 2 characters.",
    })
    .nullable(),
  assignmentgroupId: z
    .string()
    .min(2, {
      message: "Assignement group must be at least 2 characters.",
    })
    .nullable(),
  criticity: z
    .string()
    .min(2, {
      message: "Criticity must be at least 2 characters.",
    })
    .nullable(),
  type: z
    .string()
    .min(2, {
      message: "Type must be at least 2 characters.",
    })
    .nullable(),
  published: z.boolean().default(false).nullable(),
  company: z
    .string()
    .min(2, {
      message: "Society must be at least 2 characters.",
    })
    .nullable(),
  obsolete: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
  category: ServicenowCategoryFormSchema,
  subcategory: ServicenowSubCategoryFormSchema,
  categorytype: ServicenowCategoryTypeFormSchema,
  assignmentgroup: ServicenowAssignmentGroupFormSchema,
  user: UserFormSchema,
  favoritesUsers: z.array(UserFormSchema),
});

export const ProfileFormSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  label: z.string(),
  permissions: z.string().array(),
});

export const AccountUpdateNameFormSchema = z.object({
  name: z.string(),
});

export const AccountUpdatePasswordFormSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
});
