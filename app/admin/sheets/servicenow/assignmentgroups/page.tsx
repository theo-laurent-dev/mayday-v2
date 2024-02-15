"use client";

import { HasPermissionShield } from "@/app/_components/HasPermissionShield";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import AssignmentGroupsList from "@/app/admin/sheets/servicenow/assignmentgroups/_components/assignmentgroups-list";
import { AddAssignmentGroup } from "@/app/admin/sheets/servicenow/assignmentgroups/_components/add-assignmentgroup";

export default function AdminSheetsServicenowAssignmentGroupsPage() {
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
      label: "Groupes d'assignation",
      href: "/admin/sheets/servicenow/assignmentgroups",
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
