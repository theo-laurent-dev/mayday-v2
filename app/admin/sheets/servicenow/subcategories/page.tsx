"use client";

import { HasPermissionShield } from "@/app/_components/HasPermissionShield";
import { Separator } from "@/components/ui/separator";
import { AddSubCategory } from "@/app/admin/sheets/servicenow/subcategories/_components/add-subcategory";
import SubcategoriesList from "@/app/admin/sheets/servicenow/subcategories/_components/subcategories-list";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function AdminSheetsServicenowSubCategoriesPage() {
  return (
    <HasPermissionShield required="admin.*">
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
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
              <BreadcrumbLink href="/admin/sheets/servicenow">
                ServiceNow
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Sous-catégories</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
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
