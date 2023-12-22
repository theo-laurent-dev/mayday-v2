"use client";

import { HasPermissionShield } from "@/app/_components/HasPermissionShield";
import EditSheetForm from "@/app/sheets/[sheetId]/edit/_components/EditSheetForm";

interface SheetEditPageProps {
  params: {
    sheetId: string;
  };
}

export default function SheetEditPage({ params }: SheetEditPageProps) {
  const { sheetId } = params;

  return (
    <HasPermissionShield required="sheets.edit">
      <div>
        <EditSheetForm sheetId={sheetId} />
      </div>
    </HasPermissionShield>
  );
}
