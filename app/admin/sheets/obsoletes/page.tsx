"use client";

import { HasPermissionShield } from "@/app/_components/HasPermissionShield";
import { trpc } from "@/app/_trpc/client";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { DataTable } from "./_components/data-table/data-table";
import { columns } from "./_components/data-table/columns";

export default function AdminSheetsObsoletesPage() {
  const { data: obsoletesSheets, isLoading } =
    trpc.getObsoletesSheets.useQuery();
  const breadcrumbLinks = [
    {
      label: "Administration",
      href: "/admin",
      current: false,
    },
    {
      label: "Fiches",
      href: "/admin/sheets",
      current: false,
    },
    {
      label: "Obsolètes",
      href: "/admin/sheets/obsoletes",
      current: true,
    },
  ];

  if (isLoading) {
    return "Chargement ...";
  }

  return (
    <HasPermissionShield required="admin.*">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <Breadcrumbs breadcrumbLinks={breadcrumbLinks} />
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
