"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import {
  types,
  companies,
  criticities,
} from "@/data/data-table/data-table-constantes";
import { DataTableColumnHeader } from "@/app/sheets/_components/data-table/data-table-column-header";
import { DataTableRowActions } from "@/app/sheets/_components/data-table/data-table-row-actions";
import { SheetWithUser } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { categories, subcategories } from "@/data/sheets";
import { Badge } from "@/components/ui/badge";

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
      return (
        <div className="flex space-x-2">
          {row.original.obsolete && <Badge variant="outline">Obsolète</Badge>}
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
            <companys.icon className="mr-2 h-4 w-4 text-muted-foreground" />
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
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Catégorie" />
    ),
    cell: ({ row }) => {
      const category = categories.find(
        (category) => category.value === row.getValue("category")
      );

      if (!category) {
        return null;
      }

      return (
        <div className="flex w-[160px] items-center">
          {category.icon && (
            <category.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{category.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "subcategory",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sous-catégorie" />
    ),
    cell: ({ row }) => {
      const subcategory = subcategories.find(
        (category) => category.value === row.getValue("subcategory")
      );

      if (!subcategory) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {subcategory.icon && (
            <subcategory.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{subcategory.label}</span>
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
            <criticity.icon className="mr-2 h-4 w-4 text-muted-foreground" />
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
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const type = types.find((type) => type.value === row.getValue("type"));

      if (!type) {
        return null;
      }

      return (
        <div className="flex items-center">
          {type.icon && (
            <type.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{type.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "userId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Utilisateur" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <Avatar className="h-5 w-5">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">
            {row.original.user.name}
          </span>
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
