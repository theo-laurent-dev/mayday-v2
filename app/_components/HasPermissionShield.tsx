"use client";

import React from "react";

import { HasPermissionShieldProps } from "@/types/HasPermissionShield";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function HasPermissionShield({
  required,
  children,
}: HasPermissionShieldProps) {
  const { data } = useSession();
  const permissions = data?.user?.profile?.permissions;
  const router = useRouter();

  if (permissions) {
    if (
      permissions.includes(required) ||
      permissions.includes(`${required.split(".")[0]}.*`)
    )
      return <>{children}</>;

    if (!permissions.includes(required)) router.push("/not-found");
  }

  return <>{null}</>;
}
