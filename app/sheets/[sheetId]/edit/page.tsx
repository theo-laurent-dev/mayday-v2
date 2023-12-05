"use client";

import EditSheetForm from "@/app/sheets/[sheetId]/edit/_components/EditSheetForm";

interface SheetEditPageProps {
  params: {
    sheetId: string;
  };
}

export default function SheetEditPage({ params }: SheetEditPageProps) {
  const { sheetId } = params;

  return (
    <div>
      <EditSheetForm sheetId={sheetId} />
    </div>
  );
}
