"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { GanttChart, LayoutDashboard, Settings } from "lucide-react";
import { JsonArray } from "@prisma/client/runtime/library";

const UserNav = () => {
  const session = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/02.png" alt="@shadcn" />
            <AvatarFallback>TL</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session.data?.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.data?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {session &&
          session.data &&
          (Array.from(
            session.data?.user.profile.permissions as JsonArray
          ).includes("admin.*") ||
            Array.from(
              session.data?.user.profile.permissions as JsonArray
            ).includes("admin.view")) && (
            <>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link href={"/admin"} className="flex items-center w-full">
                    <Settings className="w-5 h-5 mr-2 text-gray-500" />
                    Administration
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </>
          )}
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={"/dashboard"} className="flex items-center w-full">
              <LayoutDashboard className="w-5 h-5 mr-2 text-gray-500" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/sheets"} className="flex items-center w-full">
              <GanttChart className="w-5 h-5 mr-2 text-gray-500" />
              Fiches
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer font-bold"
          onClick={() => signOut()}
        >
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
