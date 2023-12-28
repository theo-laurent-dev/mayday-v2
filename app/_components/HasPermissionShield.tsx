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
  // console.log(permissions);
  const router = useRouter();

  if (permissions) {
    if (!permissions.includes(required)) router.push("/not-found");
    if (permissions.includes(required)) return <>{children}</>;
  }

  return <>{null}</>;
}
