"use client";

import { trpc } from "@/app/_trpc/client";

import { DataTable } from "@/app/sheets/_components/data-table/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { columns } from "@/app/sheets/_components/data-table/columns";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { HasPermissionShield } from "@/app/_components/HasPermissionShield";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function SheetsPage() {
  const { data: sheets, isLoading: sheetsLoading } = trpc.getSheets.useQuery();
  const breadcrumbLinks = [
    {
      label: "Dashboard",
      href: "/dashboard",
      current: false,
    },
    {
      label: "Fiches",
      href: "/sheets",
      current: true,
    },
  ];

  if (sheetsLoading) {
    return <SheetsPage.Skeleton />;
  }

  return (
    <HasPermissionShield required="sheets.view">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <Breadcrumbs breadcrumbLinks={breadcrumbLinks} />
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Fiches</h2>
            <p className="text-muted-foreground">Liste des fiches</p>
          </div>
          <Link href="/sheets/new" className={buttonVariants()}>
            Nouvelle fiche
          </Link>
        </div>
        <DataTable data={sheets || []} columns={columns} />
      </div>
    </HasPermissionShield>
  );
}

SheetsPage.Skeleton = function SheetsSkeleton() {
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
