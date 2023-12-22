"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableViewOptions } from "@/app/admin/users/_components/data-table/data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { userStatuses } from "@/data/data-table/data-table-constantes";
import { trpc } from "@/app/_trpc/client";
import { useEffect, useState } from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}
export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const [profiles, setProfiles] = useState<any>([]);
  const isFiltered = table.getState().columnFilters.length > 0;
  const { data, isLoading } = trpc.getProfiles.useQuery();

  useEffect(() => {
    if (!isLoading) {
      const u = data?.map((profile) => ({
        label: profile.label,
        value: profile.id,
      }));

      setProfiles(u);
    }
  }, [isLoading, data]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrer les utilisateurs..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("isActive") && (
          <DataTableFacetedFilter
            column={table.getColumn("isActive")}
            title="Statut"
            options={userStatuses}
          />
        )}
        {table.getColumn("profileId") && (
          <DataTableFacetedFilter
            column={table.getColumn("profileId")}
            title="Profiles"
            options={profiles}
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
