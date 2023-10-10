"use client";

import StepperSheetCreation from "@/app/sheets/new/_components/step";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SheetNewPage() {
  return (
    <div className="py-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Nouvelle procédure</CardTitle>
        </CardHeader>
        <CardContent>
          <StepperSheetCreation />
        </CardContent>
      </Card>
    </div>
  );
}
