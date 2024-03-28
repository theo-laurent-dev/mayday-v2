"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import {
  types,
  companies,
  criticities,
} from "@/data/data-table/data-table-constantes";
import { DataTableColumnHeader } from "@/app/(client)/dashboard/unpublished/_components/data-table/data-table-column-header";
import { DataTableRowActions } from "@/app/(client)/dashboard/unpublished/_components/data-table/data-table-row-actions";
import { SheetWithUser } from "@/types/types";
import Icon from "@/components/ui/icon";

export const columns: ColumnDef<SheetWithUser>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "shortId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("shortId")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Titre" />
    ),
    cell: ({ row }) => {
      const type = types.find((type) => type.value === row.original.type);

      return (
        <div className="flex space-x-2">
          {type && <Badge variant="outline">{type.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Société" />
    ),
    cell: ({ row }) => {
      const companys = companies.find(
        (company) => company.value === row.getValue("company")
      );

      if (!companys) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {companys.icon && (
            <Icon
              name={companys.icon}
              className="mr-2 h-4 w-4 text-muted-foreground"
            />
          )}
          <span>{companys.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "criticity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Criticité" />
    ),
    cell: ({ row }) => {
      const criticity = criticities.find(
        (criticity) => criticity.value === row.getValue("criticity")
      );

      if (!criticity) {
        return null;
      }

      return (
        <div className="flex items-center">
          {criticity.icon && (
            <Icon
              name={criticity.icon}
              className="mr-2 h-4 w-4 text-muted-foreground"
            />
          )}
          <span>{criticity.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
