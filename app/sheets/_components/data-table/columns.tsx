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
import { Badge } from "@/components/ui/badge";
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
      <div className="w-[30px]">{row.getValue("shortId")}</div>
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
          <span className="w-[200px] max-w-[500px] truncate font-medium">
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
          {/* {companys.icon && (
            <Icon
              name={companys.icon}
              className="mr-2 h-4 w-4 text-muted-foreground"
            />
          )} */}
          <span>{companys.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "categoryId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Catégorie" />
    ),
    cell: ({ row }) => {
      const category = row.original.category;
      return (
        <div className="flex w-[160px] items-center">
          <Icon
            name={category?.icon}
            className="mr-2 h-4 w-4 text-muted-foreground"
          />
          <span>{category?.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "subcategoryId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sous-catégorie" />
    ),
    cell: ({ row }) => {
      const subcategory = row.original.subcategory;
      return (
        <div className="flex w-[100px] items-center">
          <Icon
            name={subcategory?.icon}
            className="mr-2 h-4 w-4 text-muted-foreground"
          />
          <span>{subcategory?.label}</span>
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
      const criticity = criticities.filter(
        (criticity) => criticity.value === row.getValue("criticity")
      );

      // if (!criticity) {
      //   return null;
      // }

      return (
        <div className="flex items-center">
          {/* {criticity.length > 0 && criticity[0].icon && (
            <Icon
              name={criticity[0].icon}
              className="mr-2 h-4 w-4 text-muted-foreground"
            />
          )} */}
          <span>{criticity.length > 0 && criticity[0].label}</span>
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
          {/* {type.icon !== undefined && (
            <Icon
              name={type.icon}
              className="mr-2 h-4 w-4 text-muted-foreground"
            />
          )} */}
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
