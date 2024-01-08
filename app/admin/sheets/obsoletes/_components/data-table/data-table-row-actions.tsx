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

import { ObsoletesSheet } from "@/types/forms";
import { CheckCircle, Eye, Pencil } from "lucide-react";
import Link from "next/link";
import { trpc } from "@/app/_trpc/client";
import { toast } from "@/components/ui/use-toast";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const osheet = ObsoletesSheet.parse(row.original);
  const utils = trpc.useContext();
  const { mutate: approveSheet, isLoading: approveSheetStatus } =
    trpc.approveSheet.useMutation({
      onSuccess: (data) => {
        utils.getObsoletesSheets.invalidate();
        toast({
          title: `Fiche approuvée`,
        });
      },
    });

  const handleApproveSheet = (id: string) => {
    approveSheet({ id });
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
              href={`/admin/sheets/obsoletes/${osheet.id}`}
              className="flex justify-start items-center space-x-2"
            >
              <Eye className="w-4 h-4" /> <span>Voir</span>
            </Link>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="w-full">
            <Link
              href={`/admin/sheets/obsoletes/${osheet.id}/edit`}
              className="flex justify-start items-center space-x-2"
            >
              <Pencil className="w-4 h-4" /> <span>Modifier</span>
            </Link>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="w-full">
            <Button
              variant="item"
              size="item"
              className="space-x-2"
              onClick={() => handleApproveSheet(osheet.id)}
              disabled={approveSheetStatus}
            >
              <CheckCircle className="w-4 h-4" />
              <span>Approuver</span>
            </Button>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
