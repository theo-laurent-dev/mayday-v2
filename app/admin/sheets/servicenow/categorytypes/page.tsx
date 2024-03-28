"use client";

import { HasPermissionShield } from "@/app/_components/HasPermissionShield";
import { Separator } from "@/components/ui/separator";
import CategoryTypesList from "@/app/admin/sheets/servicenow/categorytypes/_components/categorytypes-list";
import { AddCategoryType } from "@/app/admin/sheets/servicenow/categorytypes/_components/add-categorytype";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function AdminSheetsServicenowCategoriesPage() {
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
              <BreadcrumbPage>Types de catégories</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-col items-center justify-between space-y-2 md:flex-row">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Types de catégorie ServiceNow
            </h2>
            <p className="text-muted-foreground">
              Liste des types de catégorie ServiceNow
            </p>
          </div>
          <AddCategoryType />
        </div>
        <Separator />
        <CategoryTypesList />
      </div>
    </HasPermissionShield>
  );
}
