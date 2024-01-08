"use client";

import { HasPermissionShield } from "@/app/_components/HasPermissionShield";
import { trpc } from "@/app/_trpc/client";
import EditSheetForm from "@/app/sheets/[sheetId]/edit/_components/EditSheetForm";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

interface SheetEditPageProps {
  params: {
    sheetId: string;
  };
}

export default function SheetEditPage({ params }: SheetEditPageProps) {
  const { sheetId } = params;
  const { data: sheet, isLoading } = trpc.getSheet.useQuery({ id: sheetId });
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
      label: sheet?.title,
      href: `/sheets/${sheet?.id}`,
      current: false,
    },
    {
      label: "Modification",
      href: `/sheets/${sheet?.id}/edit`,
      current: true,
    },
  ];

  if (isLoading) {
    return "Chargement ...";
  }

  return (
    <HasPermissionShield required="sheets.edit">
      <Breadcrumbs breadcrumbLinks={breadcrumbLinks} className="py-8" />
      <div>
        <EditSheetForm sheet={sheet} />
      </div>
    </HasPermissionShield>
  );
}
