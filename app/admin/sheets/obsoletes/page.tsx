"use client";

import { HasPermissionShield } from "@/app/_components/HasPermissionShield";
import { trpc } from "@/app/_trpc/client";
import { DataTable } from "./_components/data-table/data-table";
import { columns } from "./_components/data-table/columns";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function AdminSheetsObsoletesPage() {
  const { data: obsoletesSheets, isLoading } =
    trpc.getObsoletesSheets.useQuery();

  if (isLoading) {
    return "Chargement ...";
  }

  return (
    <HasPermissionShield required="admin.*">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Administration</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/sheets">Fiches</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Obsolètes</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Administration des fiches obsoletes
            </h2>
            <p className="text-muted-foreground">Liste des fiches obsoletes</p>
          </div>
        </div>
        <DataTable data={obsoletesSheets || []} columns={columns} />
      </div>
    </HasPermissionShield>
  );
}
