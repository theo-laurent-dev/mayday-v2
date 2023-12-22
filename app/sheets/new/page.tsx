"use client";

import { HasPermissionShield } from "@/app/_components/HasPermissionShield";
import StepperSheetCreation from "@/app/sheets/new/_components/step";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export default function SheetNewPage() {
  const [title, setTitle] = useState<string>("Nouvelle procédure");

  return (
    <HasPermissionShield required="sheets.new">
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
