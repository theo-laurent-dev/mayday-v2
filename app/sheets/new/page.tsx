"use client";

import { HasPermissionShield } from "@/app/_components/HasPermissionShield";
import StepperSheetCreation from "@/app/sheets/new/_components/step";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export default function SheetNewPage() {
  const [title, setTitle] = useState<string>("Nouvelle fiche");
  const breadcrumbLinks = [
    {
      label: "Dashboard",
      href: "/dashboard",
      current: false,
    },
    {
      label: "Fiches",
      href: "/sheets",
      current: false,
    },
    {
      label: "Nouvelle fiche",
      href: "/sheets/new",
      current: true,
    },
  ];

  return (
    <HasPermissionShield required="sheets.new">
      <Breadcrumbs breadcrumbLinks={breadcrumbLinks} className="py-8" />
      <div className="py-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <StepperSheetCreation setTitle={setTitle} />
          </CardContent>
        </Card>
      </div>
    </HasPermissionShield>
  );
}
