"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { companies } from "@/data/data-table/data-table-constantes";
import { SheetWithUserSchema } from "@/types/forms";
import { BadgeCheck, Building2, PenSquare, Trash2 } from "lucide-react";
import Link from "next/link";
import { trpc } from "@/app/_trpc/client";
import { toast } from "@/components/ui/use-toast";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const sheet = SheetWithUserSchema.parse(row.original);
  const utils = trpc.useContext();
  const { mutate: publishSheet, isLoading: publishSheetLoading } =
    trpc.publishSheet.useMutation({
      onSuccess: (data) => {
        utils.getUnpublishedUserSheets.invalidate();
        toast({
          title: "Fiche publiée",
        });
      },
    });

  const handlePublish = (id: string) => {
    publishSheet({ id });
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
              href={`/sheets/${sheet.id}/edit`}
              className="flex justify-start items-center space-x-2"
            >
              <PenSquare className="w-4 h-4" /> <span>Modifier</span>
            </Link>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="w-full">
            <Button
              variant="item"
              size="item"
              className="space-x-2"
              onClick={() => handlePublish(sheet.id)}
              disabled={publishSheetLoading}
            >
              <BadgeCheck className="w-4 h-4" /> <span>Publier</span>
            </Button>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <div className="flex justify-start items-center space-x-2 w-full">
              <Building2 className="w-4 h-4" /> <span>Société</span>
            </div>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={sheet.company || ""}>
              {companies.map((company) => (
                <DropdownMenuRadioItem
                  key={company.value}
                  value={company.value}
                >
                  {company.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="w-full">
            <Link
              href={`/sheet/${sheet.id}`}
              className="flex justify-start items-center space-x-2 text-red-500"
            >
              <Trash2 className="w-4 h-4" /> <span>Supprimer</span>
            </Link>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
