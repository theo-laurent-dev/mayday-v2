"use client";

import Kpi from "@/app/dashboard/_components/kpi";
import { Button } from "@/components/ui/button";
import { trpc } from "@/app/_trpc/client";
import Link from "next/link";
import { HasPermissionShield } from "@/app/_components/HasPermissionShield";

export default function Dashboard() {
  const {
    data: userUnpublishedSheets,
    isLoading: unpublishedUserSheetsLoading,
  } = trpc.getUnpublishedUserSheets.useQuery();

  return (
    <HasPermissionShield required="dashboard.view">
      <div className="py-4 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Link href={"/sheets/new"}>
            <Button>Nouvelle fiche</Button>
          </Link>
        </div>
        <Kpi userUnpublishedSheets={userUnpublishedSheets} />
      </div>
    </HasPermissionShield>
  );
}
