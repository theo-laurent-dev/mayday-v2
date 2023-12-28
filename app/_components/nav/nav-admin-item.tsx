"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const NavAdminItems = () => {
  const path = usePathname();

  return (
    <Link
      href="/admin"
      className={cn(
        "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
        path === "/admin" && "text-black"
      )}
    >
      Administration
    </Link>
  );
};

export default NavAdminItems;
