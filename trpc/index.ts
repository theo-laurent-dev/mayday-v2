import { privateProcedure, publicProcedure, router } from "./trpc";
import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { z } from "zod";
import getCurrentUser from "@/app/_actions/getCurrentUser";
import {
  ProfileFormSchema,
  RegisterFormSchema,
  SheetFormSchema,
  UserUpdateFormSchema,
} from "@/types/forms";

export const appRouter = router({
  register: publicProcedure
    .input(RegisterFormSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, email, password } = input;

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await db.user.create({
        data: {
          name,
          email,
          hashedPassword,
          profile: {
            connectOrCreate: {
              where: {
                name: "default",
              },
              create: {
                name: "default",
                label: "Défaut",
                permissions: ["dashboard.view"],
              },
            },
          },
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
    const userId = ctx.userId;

    if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

    return await db.sheet.findMany({
      where: {
        published: false,
        userId,
      },
      include: {
        user: true,
      },
    });
  }),
  getObsoletesSheets: privateProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId;

    if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

    return await db.sheet.findMany({
      where: {
        obsolete: true,
        userId,
      },
    });
  }),
  approveSheet: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const sheet = await db.sheet.findUniqueOrThrow({
        where: {
          id: input.id,
        },
      });

      if (!sheet) throw new TRPCError({ code: "NOT_FOUND" });

      const approvedSheet = await db.sheet.update({
        where: {
          id: input.id,
        },
        data: {
          obsolete: false,
        },
      });

      return approvedSheet;
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
      const userId = ctx.userId;

      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const sheet = await db.sheet.findUniqueOrThrow({
        where: {
          id: input.id,
          userId,
        },
      });

      if (!sheet) throw new TRPCError({ code: "NOT_FOUND" });

      const updatedSheet = await db.sheet.update({
        where: {
          id: input.id,
          userId,
        },
        data: {
          published: true,
        },
      });

      return updatedSheet;
    }),
  reportSheet: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const sheet = await db.sheet.findUniqueOrThrow({
        where: {
          id: input.id,
          userId,
        },
      });

      if (!sheet) throw new TRPCError({ code: "NOT_FOUND" });

      const updatedSheet = await db.sheet.update({
        where: {
          id: input.id,
          userId,
        },
        data: {
          obsolete: true,
        },
      });

      return updatedSheet;
    }),
  addSheet: privateProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const sheetCount = (await db.sheet.findMany()).length;

      const sheet = await db.sheet.create({
        data: {
          title: input.title,
          shortId: `F-${sheetCount + 1}`,
          userId,
        },
      });

      return sheet;
    }),
  updateSheet: privateProcedure
    .input(SheetFormSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const sheet = await db.sheet.findUniqueOrThrow({
        where: {
          id: input.id,
          userId,
        },
      });

      if (!sheet) throw new TRPCError({ code: "NOT_FOUND" });

      const updatedSheet = await db.sheet.update({
        where: {
          id: input.id,
          userId,
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
      const userId = ctx.userId;

      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const sheet = await db.sheet.findFirst({
        where: {
          id: input.id,
          userId,
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
  getUsers: privateProcedure.query(async ({ ctx }) => {
    return await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        profile: true,
      },
    });
  }),
  getUser: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await db.user.findFirstOrThrow({
        where: {
          id: input.id,
        },
        include: {
          profile: true,
        },
      });
      if (!user) throw new TRPCError({ code: "NOT_FOUND" });
      return user;
    }),
  updateUser: privateProcedure
    .input(UserUpdateFormSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const user = await db.user.findUniqueOrThrow({
        where: {
          id: input.id,
        },
      });

      if (!user) throw new TRPCError({ code: "NOT_FOUND" });

      const updatedUser = await db.user.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          email: input.email,
          isActive: input.isActive,
          profileId: input.profileId,
        },
      });

      return updatedUser;
    }),
  getUserPermissions: privateProcedure.query(async ({ ctx, input }) => {
    const userId = ctx.userId;
    const user = await db.user.findFirstOrThrow({
      where: {
        id: userId,
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
    console.log(user);
    if (!user) throw new TRPCError({ code: "NOT_FOUND" });
    return user;
  }),
  switchStatusUser: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await db.user.findUniqueOrThrow({
        where: {
          id: input.id,
        },
      });

      if (!user) throw new TRPCError({ code: "NOT_FOUND" });

      const updatedUser = await db.user.update({
        where: {
          id: input.id,
        },
        data: {
          isActive: !user.isActive,
        },
      });

      return updatedUser;
    }),
  getRoles: privateProcedure.query(async ({ ctx }) => {
    return await db.role.findMany({
      include: {
        application: true,
      },
    });
  }),
  getProfiles: privateProcedure.query(async ({ ctx }) => {
    return await db.profile.findMany({
      include: {
        roles: true,
      },
    });
  }),
  getProfile: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const profile = await db.profile.findFirstOrThrow({
        where: {
          id: input.id,
        },
        include: {
          roles: {
            select: {
              id: true,
            },
          },
        },
      });

      if (!profile) throw new TRPCError({ code: "NOT_FOUND" });

      const applications = await db.application.findMany({
        include: {
          roles: true,
        },
      });

      return { profile, applications };
    }),
  updateProfile: privateProcedure
    .input(ProfileFormSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const profile = await db.profile.findUniqueOrThrow({
        where: {
          id: input.id,
        },
      });

      if (!profile) throw new TRPCError({ code: "NOT_FOUND" });

      const updatedProfile = await db.profile.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          label: input.label,
          permissions: input.permissions,
        },
      });

      return updatedProfile;
    }),
  getApplications: privateProcedure.query(async ({ ctx }) => {
    return await db.application.findMany({
      include: {
        roles: true,
      },
    });
  }),
  adminUpdateSheet: privateProcedure
    .input(SheetFormSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const sheet = await db.sheet.findUniqueOrThrow({
        where: {
          id: input.id,
        },
      });

      if (!sheet) throw new TRPCError({ code: "NOT_FOUND" });

      const updatedSheet = await db.sheet.update({
        where: {
          id: input.id,
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
          obsolete: input.obsolete,
        },
      });

      return updatedSheet;
    }),
});

export type AppRouter = typeof appRouter;
