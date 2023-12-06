"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableViewOptions } from "@/app/sheets/_components/data-table/data-table-view-options";
import { DataTableFacetedFilter } from "@/app/sheets/_components/data-table/data-table-faceted-filter";
import {
  companies,
  criticities,
  types,
} from "@/data/data-table/unpublished-sheets-data-table";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { trpc } from "@/app/_trpc/client";
import { categories, subcategories } from "@/data/sheets";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}
export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const [users, setUsers] = useState<any>([]);
  const isFiltered = table.getState().columnFilters.length > 0;

  const { data, isLoading } = trpc.getUsers.useQuery();

  useEffect(() => {
    if (!isLoading) {
      const u = data?.map((user) => ({
        label: user.name,
        value: user.id,
        avatar: true,
      }));

      setUsers(u);
    }
  }, [isLoading, data]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrer les fiches..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("company") && (
          <DataTableFacetedFilter
            column={table.getColumn("company")}
            title="Sociétés"
            options={companies}
          />
        )}
        {table.getColumn("category") && (
          <DataTableFacetedFilter
            column={table.getColumn("category")}
            title="Catégories"
            options={categories}
          />
        )}
        {table.getColumn("subcategory") && (
          <DataTableFacetedFilter
            column={table.getColumn("subcategory")}
            title="Sous-catégories"
            options={subcategories}
          />
        )}
        {table.getColumn("criticity") && (
          <DataTableFacetedFilter
            column={table.getColumn("criticity")}
            title="Criticités"
            options={criticities}
          />
        )}
        {table.getColumn("type") && (
          <DataTableFacetedFilter
            column={table.getColumn("type")}
            title="Types"
            options={types}
          />
        )}
        {table.getColumn("userId") && (
          <DataTableFacetedFilter
            column={table.getColumn("userId")}
            title="Utilisateurs"
            options={users}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Réinitialiser
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
