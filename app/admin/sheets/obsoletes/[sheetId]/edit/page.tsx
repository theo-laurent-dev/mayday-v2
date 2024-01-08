"use client";

import { HasPermissionShield } from "@/app/_components/HasPermissionShield";
import { trpc } from "@/app/_trpc/client";
import EditSheetForm from "@/app/admin/sheets/obsoletes/[sheetId]/edit/_components/EditSheetForm";
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
      label: "Obsolètes",
      href: "/admin/sheets/obsoletes",
      current: false,
    },
    {
      label: sheet?.title,
      href: `/admin/sheets/obsoletes/${sheet?.id}`,
      current: false,
    },
    {
      label: "Modification",
      href: `/admin/sheets/obsoletes/${sheet?.id}/edit`,
      current: true,
    },
  ];

  if (isLoading) {
    return "Chargement ...";
  }

  return (
    <HasPermissionShield required="admin.*">
      <Breadcrumbs breadcrumbLinks={breadcrumbLinks} className="py-8" />
      <div>
        <EditSheetForm sheet={sheet} />
      </div>
    </HasPermissionShield>
  );
}
