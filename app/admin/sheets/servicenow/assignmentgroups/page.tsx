"use client";

import { HasPermissionShield } from "@/app/_components/HasPermissionShield";
import { Separator } from "@/components/ui/separator";
import AssignmentGroupsList from "@/app/admin/sheets/servicenow/assignmentgroups/_components/assignmentgroups-list";
import { AddAssignmentGroup } from "@/app/admin/sheets/servicenow/assignmentgroups/_components/add-assignmentgroup";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function AdminSheetsServicenowAssignmentGroupsPage() {
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
              <BreadcrumbPage>{`Groupe d'assignation`}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col items-center justify-between space-y-2 md:flex-row">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {`Groupes d'assignation ServiceNow`}
            </h2>
            <p className="text-muted-foreground">
              {`Liste des groupes d'assignation ServiceNow`}
            </p>
          </div>
          <AddAssignmentGroup />
        </div>
        <Separator />
        <AssignmentGroupsList />
      </div>
    </HasPermissionShield>
  );
}
