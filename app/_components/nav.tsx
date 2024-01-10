"use client";

import { useSession } from "next-auth/react";
import NavItems from "@/app/_components/nav/navItems";
import { JsonArray } from "@prisma/client/runtime/library";
import NavAdminItems from "@/app/_components/nav/nav-admin-item";
import UserNav from "@/app/_components/nav/usernav";

export default function Nav({ children }: { children: React.ReactNode }) {
  const { data } = useSession();

  return (
    <>
      {data && (data !== undefined || data !== null) && (
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <h1 className="font-bold text-xl">Mayday</h1>
            <NavItems className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              {((data &&
                data.user.profile.permissions &&
                Array.from(
                  data?.user.profile.permissions as JsonArray
                ).includes("admin.*")) ||
                Array.from(
                  data?.user.profile.permissions as JsonArray
                ).includes("admin.view")) && <NavAdminItems />}
              <UserNav />
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto">{children}</div>
    </>
  );
}
