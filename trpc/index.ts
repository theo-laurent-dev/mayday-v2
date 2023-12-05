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
  getCurrentUser: publicProcedure.query(async ({ ctx }) => {
    const user = await getCurrentUser();

    return user;
  }),
  getSheets: privateProcedure.query(async ({ ctx }) => {
    return await db.sheet.findMany({
      where: {
        published: true,
      },
      include: {
        user: true,
      },
    });
  }),
  getUnpublishedUserSheets: privateProcedure.query(async ({ ctx }) => {
    const user = await getCurrentUser();
    return await db.sheet.findMany({
      where: {
        published: false,
        userId: user?.id,
      },
      include: {
        user: true,
      },
    });
  }),
  getSheet: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const sheet = await db.sheet.findFirstOrThrow({
        where: {
          id: input.id,
        },
        include: {
          user: true,
        },
      });
      if (!sheet) throw new TRPCError({ code: "NOT_FOUND" });
      return sheet;
    }),
  publishSheet: privateProcedure
    .input(z.object({ id: z.string() }))
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
          published: true,
        },
      });

      return updatedSheet;
    }),
  addSheet: privateProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await getCurrentUser();

      if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });

      const sheetCount = (await db.sheet.findMany()).length;

      const sheet = await db.sheet.create({
        data: {
          title: input.title,
          shortId: `F-${sheetCount + 1}`,
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
          company: input.company,
        },
      });

      return updatedSheet;
    }),
  deleteSheet: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await getCurrentUser();

      if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });

      const sheet = await db.sheet.findFirst({
        where: {
          id: input.id,
          userId: user.id,
        },
      });

      if (!sheet) throw new TRPCError({ code: "NOT_FOUND" });

      await db.sheet.delete({
        where: {
          id: input.id,
        },
      });

      return sheet;
    }),
});

export type AppRouter = typeof appRouter;
