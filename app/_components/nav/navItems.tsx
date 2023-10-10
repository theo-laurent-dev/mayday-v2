"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface MainNavInterface {
  className: string;
  session: object;
}

const NavItems = ({ className, session }: MainNavInterface) => {
  const path = usePathname();

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      <Link
        href="/dashboard"
        className={cn(
          "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
          path === "/dashboard" && "text-black"
        )}
      >
        Dashboard
      </Link>
      <Link
        href="/articles"
        className={cn(
          "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
          path === "/articles" && "text-black"
        )}
      >
        Articles
      </Link>
      <Link
        href="/sheets"
        className={cn(
          "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
          path === "/sheets" && "text-black"
        )}
      >
        Procédures
      </Link>
    </nav>
  );
};

export default NavItems;
