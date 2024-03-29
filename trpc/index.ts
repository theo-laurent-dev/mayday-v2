import { privateProcedure, publicProcedure, router } from "@/trpc/trpc";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { z } from "zod";
import getCurrentUser from "@/app/_actions/getCurrentUser";
import {
  AccountUpdateNameFormSchema,
  AccountUpdatePasswordFormSchema,
  ProfileFormSchema,
  RegisterFormSchema,
  ServicenowAssignmentGroupFormSchema,
  ServicenowCategoryFormSchema,
  ServicenowCategoryTypeFormSchema,
  ServicenowSubCategoryFormSchema,
  SheetFormSchema,
  UserUpdateFormSchema,
} from "@/types/schemas";
import { groupItems } from "@/lib/utils";

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
  updateAccount: privateProcedure
    .input(AccountUpdateNameFormSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const user = await db.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
      });

      if (!user) throw new TRPCError({ code: "NOT_FOUND" });

      const accountUpdated = await db.user.update({
        where: {
          id: userId,
        },
        data: {
          name: input.name,
        },
      });

      return accountUpdated;
    }),
  updateAccountPassword: privateProcedure
    .input(AccountUpdatePasswordFormSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const user = await db.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
      });

      if (!user) throw new TRPCError({ code: "NOT_FOUND" });

      const isCorrectPassword = await bcrypt.compare(
        input.currentPassword,
        user.hashedPassword
      );

      if (!isCorrectPassword) throw new TRPCError({ code: "FORBIDDEN" });

      const hashedPassword = await bcrypt.hash(input.newPassword, 12);

      const accountUpdated = await db.user.update({
        where: {
          id: userId,
        },
        data: {
          hashedPassword,
        },
      });

      return accountUpdated;
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
        favoritesUsers: true,
        category: true,
        subcategory: true,
        categorytype: true,
        assignmentgroup: true,
      },
    });
  }),
  getFavoritesUserSheets: privateProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId;

    if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

    return await db.sheet.findMany({
      where: {
        favoritesUsers: {
          some: {
            id: userId,
          },
        },
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
        favoritesUsers: true,
        category: true,
        subcategory: true,
        categorytype: true,
        assignmentgroup: true,
      },
    });
  }),
  getObsoletesSheets: privateProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId;

    if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

    return await db.sheet.findMany({
      where: {
        obsolete: true,
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
          favoritesUsers: true,
          category: true,
          subcategory: true,
          categorytype: true,
          assignmentgroup: true,
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
        },
      });

      if (!sheet) throw new TRPCError({ code: "NOT_FOUND" });

      const updatedSheet = await db.sheet.update({
        where: {
          id: input.id,
        },
        data: {
          obsolete: true,
        },
      });

      return updatedSheet;
    }),
  favoriteSheet: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const user = await db.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
      });

      if (!user) throw new TRPCError({ code: "NOT_FOUND" });

      const sheet = await db.sheet.findUniqueOrThrow({
        where: {
          id: input.id,
        },
        include: {
          favoritesUsers: true,
        },
      });
      const alreadyFavorite = sheet.favoritesUsers.filter(
        (u: any) => u.id === user.id
      );

      if (sheet.favoritesUsers.length > 0 && alreadyFavorite.length > 0) {
        return await db.sheet.update({
          where: {
            id: input.id,
          },
          data: {
            favoritesUsers: {
              disconnect: [user],
            },
          },
          include: {
            favoritesUsers: true,
          },
        });
      }

      const updatedSheet = await db.sheet.update({
        where: {
          id: input.id,
        },
        data: {
          favoritesUsers: {
            connect: [user],
          },
        },
        include: {
          favoritesUsers: true,
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
          categoryId: input.categoryId,
          subcategoryId: input.subcategoryId,
          categorytypeId: input.categorytypeId,
          assignmentgroupId: input.assgnmentgroupId,
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
          categoryId: input.categoryId,
          subcategoryId: input.subcategoryId,
          categorytypeId: input.categorytypeId,
          assignmentgroupId: input.assgnmentgroupId,
          criticity: input.criticity,
          type: input.type,
          published: input.published,
          company: input.company,
          obsolete: input.obsolete,
        },
      });

      return updatedSheet;
    }),
  getServicenowCategories: privateProcedure.query(async ({ ctx }) => {
    return await db.serviceNowCategories.findMany({
      include: {
        subcategories: true,
      },
    });
  }),
  getServicenowCategory: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const category = await db.serviceNowCategories.findFirstOrThrow({
        where: {
          id: input.id,
        },
      });

      if (!category) throw new TRPCError({ code: "NOT_FOUND" });

      return category;
    }),
  addServicenowCategories: privateProcedure
    .input(ServicenowCategoryFormSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const snowcategory = await db.serviceNowCategories.create({
        data: {
          label: input.label,
          name: input.name,
          icon: input.icon,
        },
      });

      return snowcategory;
    }),
  updateServicenowCategory: privateProcedure
    .input(ServicenowCategoryFormSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const snowcategory = await db.serviceNowCategories.update({
        where: {
          id: input.id,
        },
        data: {
          label: input.label,
          name: input.name,
          icon: input.icon,
        },
      });

      return snowcategory;
    }),
  deleteServicenowCategories: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const snowcategory = await db.serviceNowCategories.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!snowcategory) throw new TRPCError({ code: "NOT_FOUND" });

      await db.serviceNowCategories.delete({
        where: {
          id: input.id,
        },
      });

      return snowcategory;
    }),
  getServicenowSubCategories: privateProcedure.query(async ({ ctx }) => {
    return await db.serviceNowSubCategories.findMany({
      include: {
        category: true,
      },
    });
  }),
  getServicenowSubCategory: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const subcategory = await db.serviceNowSubCategories.findFirstOrThrow({
        where: {
          id: input.id,
        },
      });

      if (!subcategory) throw new TRPCError({ code: "NOT_FOUND" });

      return subcategory;
    }),
  addServicenowSubCategories: privateProcedure
    .input(ServicenowSubCategoryFormSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const snowsubcategory = await db.serviceNowSubCategories.create({
        data: {
          label: input.label,
          name: input.name,
          icon: input.icon,
          categoryId: input.categoryId,
        },
      });

      return snowsubcategory;
    }),
  updateServicenowSubCategory: privateProcedure
    .input(ServicenowSubCategoryFormSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const snowsubcategory = await db.serviceNowSubCategories.update({
        where: {
          id: input.id,
        },
        data: {
          label: input.label,
          name: input.name,
          icon: input.icon,
          categoryId: input.categoryId,
        },
      });

      return snowsubcategory;
    }),
  deleteServicenowSubCategories: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const snowsubcategory = await db.serviceNowSubCategories.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!snowsubcategory) throw new TRPCError({ code: "NOT_FOUND" });

      await db.serviceNowSubCategories.delete({
        where: {
          id: input.id,
        },
      });

      return snowsubcategory;
    }),
  getServicenowCategoryTypes: privateProcedure.query(async ({ ctx }) => {
    return await db.serviceNowCategoryTypes.findMany();
  }),
  getServicenowCategoryType: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const snowcategorytype =
        await db.serviceNowCategoryTypes.findFirstOrThrow({
          where: {
            id: input.id,
          },
        });

      if (!snowcategorytype) throw new TRPCError({ code: "NOT_FOUND" });

      return snowcategorytype;
    }),
  addServicenowCategoryType: privateProcedure
    .input(ServicenowCategoryTypeFormSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const snowcategorytype = await db.serviceNowCategoryTypes.create({
        data: {
          label: input.label,
          name: input.name,
          icon: input.icon,
        },
      });

      return snowcategorytype;
    }),
  updateServicenowCategoryType: privateProcedure
    .input(ServicenowCategoryTypeFormSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const snowcategorytype = await db.serviceNowCategoryTypes.update({
        where: {
          id: input.id,
        },
        data: {
          label: input.label,
          name: input.name,
          icon: input.icon,
        },
      });

      return snowcategorytype;
    }),
  deleteServicenowCategoryType: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const snowcategorytype = await db.serviceNowCategoryTypes.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!snowcategorytype) throw new TRPCError({ code: "NOT_FOUND" });

      await db.serviceNowCategoryTypes.delete({
        where: {
          id: input.id,
        },
      });

      return snowcategorytype;
    }),
  getServicenowAssignmentGroups: privateProcedure.query(async ({ ctx }) => {
    const snowassignmentgroups = await db.serviceNowAssignmentGroups.findMany();

    const output = groupItems(snowassignmentgroups);

    return Object.values(output);
  }),
  getServicenowAssignmentGroup: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const snowassignmentgroup =
        await db.serviceNowAssignmentGroups.findFirstOrThrow({
          where: {
            id: input.id,
          },
        });

      if (!snowassignmentgroup) throw new TRPCError({ code: "NOT_FOUND" });

      return snowassignmentgroup;
    }),
  addServicenowAssignmentGroup: privateProcedure
    .input(ServicenowAssignmentGroupFormSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const snowassignmentgroup = await db.serviceNowAssignmentGroups.create({
        data: {
          label: input.label,
          name: input.name,
          group: input.group,
        },
      });

      return snowassignmentgroup;
    }),
  updateServicenowAssignmentGroup: privateProcedure
    .input(ServicenowAssignmentGroupFormSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const snowassignmentgroup = await db.serviceNowAssignmentGroups.update({
        where: {
          id: input.id,
        },
        data: {
          label: input.label,
          name: input.name,
          group: input.group,
        },
      });

      return snowassignmentgroup;
    }),
  deleteServicenowAssignmentGroup: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const snowassignmentgroup = await db.serviceNowAssignmentGroups.findFirst(
        {
          where: {
            id: input.id,
          },
        }
      );

      if (!snowassignmentgroup) throw new TRPCError({ code: "NOT_FOUND" });

      await db.serviceNowAssignmentGroups.delete({
        where: {
          id: input.id,
        },
      });

      return snowassignmentgroup;
    }),
});

export type AppRouter = typeof appRouter;
