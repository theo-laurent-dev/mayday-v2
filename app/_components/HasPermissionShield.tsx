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
    const parsedPermissions = JSON.parse(permissions);
    if (!parsedPermissions.includes(required)) router.push("/not-found");
    if (parsedPermissions.includes(required)) return <>{children}</>;
  }

  return <>{null}</>;
}
