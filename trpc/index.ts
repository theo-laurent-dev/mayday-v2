import { privateProcedure, publicProcedure, router } from "./trpc";
import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { z } from "zod";
import getCurrentUser from "@/app/_actions/getCurrentUser";
import { SheetFormSchema } from "@/types/forms";

export const appRouter = router({
  register: publicProcedure
    .input(
      z.object({
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
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, email, password } = input;

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await db.user.create({
        data: {
          name,
          email,
          hashedPassword,
        },
      });

      return user;
    }),
  getArticles: privateProcedure.query(async ({ ctx }) => {
    return await db.article.findMany();
  }),
  getArticle: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const article = await db.article.findFirstOrThrow({
        where: {
          id: input.id,
        },
      });
      if (!article) throw new TRPCError({ code: "NOT_FOUND" });
      return article;
    }),
  addArticle: privateProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await getCurrentUser();

      if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });

      const article = await db.article.create({
        data: {
          title: input.title,
          userId: user.id,
        },
      });

      return article;
    }),
  updateArticle: privateProcedure
    .input(
      z.object({ id: z.string(), title: z.string(), description: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await getCurrentUser();

      if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });

      const article = await db.article.findUniqueOrThrow({
        where: {
          id: input.id,
          userId: user.id,
        },
      });

      if (!article) throw new TRPCError({ code: "NOT_FOUND" });

      const updatedArticle = await db.article.update({
        where: {
          id: input.id,
          userId: user.id,
        },
        data: {
          title: input.title,
          description: input.description,
        },
      });

      return updatedArticle;
    }),
  deleteArticle: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await getCurrentUser();

      if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });

      const article = await db.article.findFirst({
        where: {
          id: input.id,
          userId: user.id,
        },
      });

      if (!article) throw new TRPCError({ code: "NOT_FOUND" });

      await db.article.delete({
        where: {
          id: input.id,
        },
      });

      return article;
    }),
  getSheets: privateProcedure.query(async ({ ctx }) => {
    return await db.sheet.findMany();
  }),
  addSheet: privateProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await getCurrentUser();

      if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });

      const sheet = await db.sheet.create({
        data: {
          title: input.title,
          userId: user.id,
        },
      });

      return sheet;
    }),
  updateSheet: privateProcedure
    .input(SheetFormSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await getCurrentUser();

      if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });

      const sheet = await db.sheet.findUniqueOrThrow({
        where: {
          id: input.id,
          userId: user.id,
        },
      });

      if (!sheet) throw new TRPCError({ code: "NOT_FOUND" });

      const updatedSheet = await db.sheet.update({
        where: {
          id: input.id,
          userId: user.id,
        },
        data: {
          title: input.title,
          shortDescription: input.shortDescription,
          description: input.description,
          category: input.category,
          subcategory: input.subcategory,
          categoryType: input.categoryType,
          assignmentGroup: input.assignmentGroup,
          criticity: input.criticity,
          type: input.type,
          published: input.published,
        },
      });

      return updatedSheet;
    }),
});

export type AppRouter = typeof appRouter;
