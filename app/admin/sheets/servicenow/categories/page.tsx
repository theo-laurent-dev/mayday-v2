"use client";

import { HasPermissionShield } from "@/app/_components/HasPermissionShield";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import CategoriesList from "@/app/admin/sheets/servicenow/categories/_components/categories-list";
import { AddCategory } from "@/app/admin/sheets/servicenow/categories/_components/add-category";

export default function AdminSheetsServicenowCategoriesPage() {
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
      label: "ServiceNow",
      href: "/admin/sheets/servicenow",
      current: false,
    },
    {
      label: "Catégories",
      href: "/admin/sheets/servicenow/categories",
      current: true,
    },
  ];
  return (
    <HasPermissionShield required="admin.*">
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <Breadcrumbs breadcrumbLinks={breadcrumbLinks} />
        <div className="flex flex-col items-center justify-between space-y-2 md:flex-row">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Catégories ServiceNow
            </h2>
            <p className="text-muted-foreground">
              Liste des catégories ServiceNow
            </p>
          </div>
          <AddCategory />
        </div>
        <Separator />
        <CategoriesList />
      </div>
    </HasPermissionShield>
  );
}
