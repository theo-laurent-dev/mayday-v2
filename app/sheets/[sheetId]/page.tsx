"use client";

import { trpc } from "@/app/_trpc/client";

import LoadingSheet from "@/app/sheets/[sheetId]/_components/Loading";
import Sheet from "@/app/sheets/[sheetId]/_components/Sheet";
import Actions from "@/app/sheets/[sheetId]/_components/Actions";
import { HasPermissionShield } from "@/app/_components/HasPermissionShield";

interface SheetIdPageProps {
  params: {
    sheetId: string;
  };
}

export default function SheetIdPage({ params }: SheetIdPageProps) {
  //TRPC
  const { data: sheet, isLoading: sheetLoading } = trpc.getSheet.useQuery({
    id: params.sheetId,
  });

  if (sheetLoading) {
    return <LoadingSheet />;
  }

  return (
    <HasPermissionShield required="sheets.view">
      <div className="flex space-x-2">
        <div className="w-5/6">
          <Sheet sheet={sheet} />
        </div>
        <div className="w-1/6">
          <Actions
            sheetId={params.sheetId}
            sheetUserId={sheet?.userId}
            obsolete={sheet?.obsolete || false}
            shortId={sheet?.shortId}
          />
        </div>
      </div>
    </HasPermissionShield>
  );
}
