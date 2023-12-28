"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ProfileFormSchema, UserSchema } from "@/types/forms";
import { Ban, CheckCircle, Eye } from "lucide-react";
import Link from "next/link";
import { trpc } from "@/app/_trpc/client";
import { toast } from "@/components/ui/use-toast";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const profile = ProfileFormSchema.parse(row.original);
  const utils = trpc.useContext();
  const { mutate: switchStatusUser, isLoading: switchStatusUserLoading } =
    trpc.switchStatusUser.useMutation({
      onSuccess: (data) => {
        utils.getUsers.invalidate();
        toast({
          title: `Utilisateur ${data.isActive ? "activé" : "désactivé"}`,
        });
      },
    });

  const handleSwitchStatus = (id: string) => {
    switchStatusUser({ id });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>
          <div className="w-full">
            <Link
              href={`/admin/profiles/${profile.id}`}
              className="flex justify-start items-center space-x-2"
            >
              <Eye className="w-4 h-4" /> <span>Voir</span>
            </Link>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
