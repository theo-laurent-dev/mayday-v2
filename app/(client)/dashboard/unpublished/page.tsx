"use client";

import { HasPermissionShield } from "@/app/_components/HasPermissionShield";
import { trpc } from "@/app/_trpc/client";
import { columns } from "@/app/(client)/dashboard/unpublished/_components/data-table/columns";
import { DataTable } from "@/app/(client)/dashboard/unpublished/_components/data-table/data-table";
import { Skeleton } from "@/components/ui/skeleton";

export default function Unpublished() {
  const { data: unpublishedUserSheets, isLoading } =
    trpc.getUnpublishedUserSheets.useQuery();

  if (isLoading) {
    return <Unpublished.Skeleton />;
  }

  return (
    <HasPermissionShield required="sheets.view">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Brouillons</h2>
            <p className="text-muted-foreground">
              Liste des fiches en brouillons (non publiées)
            </p>
          </div>
        </div>
        <DataTable data={unpublishedUserSheets || []} columns={columns} />
      </div>
    </HasPermissionShield>
  );
}

Unpublished.Skeleton = function UnpublishedSkeleton() {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px] mt-1" />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-8 w-[100px]" />
          <Skeleton className="h-8 w-[90px]" />
        </div>
        <div>
          <Skeleton className="h-8 w-[70px]" />
        </div>
      </div>
      <div>
        <Skeleton className="h-32 w-full" />
      </div>
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="h-8 w-[250px]" />
        </div>
        <div className="flex items- space-x-6">
          <div>
            <Skeleton className="h-8 w-[200px]" />
          </div>
          <div>
            <Skeleton className="h-8 w-[70px]" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-[30px]" />
            <Skeleton className="h-8 w-[30px]" />
            <Skeleton className="h-8 w-[30px]" />
            <Skeleton className="h-8 w-[30px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
