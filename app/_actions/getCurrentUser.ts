import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/db/index";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email as string,
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

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
}
