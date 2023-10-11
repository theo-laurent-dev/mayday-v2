import { z } from "zod";

export const SheetFormSchema = z.object({
  id: z.string().optional(),
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
  category: z
    .string()
    .min(2, {
      message: "Category must be at least 2 characters.",
    })
    .optional(),
  subcategory: z
    .string()
    .min(2, {
      message: "Subcategory must be at least 2 characters.",
    })
    .optional(),
  categoryType: z
    .string()
    .min(2, {
      message: "Category type must be at least 2 characters.",
    })
    .optional(),
  assignmentGroup: z
    .string()
    .min(2, {
      message: "Assignement group must be at least 2 characters.",
    })
    .optional(),
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
});
