"use client";

import {
  Building,
  LayoutDashboard,
  LogOut,
  SquareGanttChart,
  SquareUser,
  Triangle,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const DashboardNavItems = [
  {
    label: "Home",
    href: "/dashboard",
    icon: Building,
    order: 1,
    isLink: true,
  },
  {
    label: "Administration",
    href: "/admin",
    icon: LayoutDashboard,
    order: 1,
    isLink: true,
  },
  {
    label: "Fiches",
    href: "/sheets",
    icon: SquareGanttChart,
    order: 1,
    isLink: true,
  },
  {
    label: "Déconnexion",
    href: "/",
    icon: LogOut,
    order: 2,
    isLink: false,
  },
  {
    label: "Account",
    href: "/account",
    icon: SquareUser,
    order: 2,
    isLink: true,
  },
];

const DashboardNavbar = () => {
  const pathname = usePathname();

  return (
    <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
      <div className="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Home">
          <Triangle className="size-5 fill-foreground" />
        </Button>
      </div>
      <nav className="grid gap-1 p-2">
        {DashboardNavItems.filter((i) => i.order === 1).map((item, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    pathname === item.href && "bg-muted",
                    "rounded-lg"
                  )}
                  aria-label={item.label}
                >
                  <item.icon className="size-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                {item.label}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        {DashboardNavItems.filter((i) => i.order === 2 && !i.isLink).map(
          (item, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={item.label}
                    onClick={() => signOut()}
                  >
                    <item.icon className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  {item.label}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        )}
        {DashboardNavItems.filter((i) => i.order === 2 && i.isLink).map(
          (item, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      pathname === item.href && "bg-muted",
                      "rounded-lg"
                    )}
                    aria-label={item.label}
                  >
                    <item.icon className="size-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  {item.label}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        )}
      </nav>
    </aside>
  );
};

export default DashboardNavbar;
