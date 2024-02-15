"use client";

import { HasPermissionShield } from "@/app/_components/HasPermissionShield";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { AddSubCategory } from "@/app/admin/sheets/servicenow/subcategories/_components/add-subcategory";
import SubcategoriesList from "@/app/admin/sheets/servicenow/subcategories/_components/subcategories-list";

export default function AdminSheetsServicenowSubCategoriesPage() {
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
      label: "Sous-catégories",
      href: "/admin/sheets/servicenow/subcategories",
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
              Sous-catégories ServiceNow
            </h2>
            <p className="text-muted-foreground">
              Liste des sous-catégories ServiceNow
            </p>
          </div>
          <AddSubCategory />
        </div>
        <Separator />
        <SubcategoriesList />
      </div>
    </HasPermissionShield>
  );
}
