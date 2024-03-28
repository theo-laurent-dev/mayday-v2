"use client";

import {
  Book,
  Bot,
  Building,
  Code2,
  ContactRound,
  KeyRound,
  LayoutDashboard,
  LifeBuoy,
  Settings2,
  SquareGanttChart,
  SquareUser,
  Triangle,
  Users2,
} from "lucide-react";

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

const AdminNavbarItems = [
  {
    label: "Home",
    href: "/dashboard",
    icon: Building,
    order: 1,
  },
  {
    label: "Administration",
    href: "/admin",
    icon: LayoutDashboard,
    order: 1,
  },
  {
    label: "Utilisateurs",
    href: "/admin/users",
    icon: ContactRound,
    order: 1,
  },
  {
    label: "Profils",
    href: "/admin/profiles",
    icon: KeyRound,
    order: 1,
  },
  {
    label: "Fiches",
    href: "/admin/sheets",
    icon: SquareGanttChart,
    order: 1,
  },
  {
    label: "Réglages",
    href: "/settings",
    icon: Settings2,
    order: 1,
  },
  {
    label: "Help",
    href: "/dashboard",
    icon: LifeBuoy,
    order: 2,
  },
  {
    label: "Account",
    href: "/account",
    icon: SquareUser,
    order: 2,
  },
];

const AdminNavbar = () => {
  const pathname = usePathname();

  return (
    <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
      <div className="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Home">
          <Triangle className="size-5 fill-foreground" />
        </Button>
      </div>
      <nav className="grid gap-1 p-2">
        {AdminNavbarItems.filter((i) => i.order === 1).map((item, index) => (
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
        {AdminNavbarItems.filter((i) => i.order === 2).map((item, index) => (
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
    </aside>
  );
};

export default AdminNavbar;
