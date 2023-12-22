"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/app/admin/users/_components/data-table/data-table-column-header";
import { DataTableRowActions } from "@/app/admin/users/_components/data-table/data-table-row-actions";
import { UserWithRole } from "@/types/types";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<UserWithRole>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nom" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[150px] items-center">
          <span>{row.getValue("name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[150px] items-center">
          <span>{row.getValue("email")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "profileId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Profile" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[250px] items-center">
          {row.original.profile.label}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actif" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Badge
            variant={
              row.getValue("isActive") === true ? "secondary" : "destructive"
            }
          >
            {row.getValue("isActive") === true ? "Actif" : "Inactif"}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      if (value.includes("false")) {
        value = [false];
      }
      if (value.includes("true")) {
        value = [true];
      }
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
