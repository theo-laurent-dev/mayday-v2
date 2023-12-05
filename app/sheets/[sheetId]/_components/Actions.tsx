"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertOctagon, FileEdit } from "lucide-react";
import Link from "next/link";
import DeleteSheetDialog from "./DeleteSheetDialog";
import { trpc } from "@/app/_trpc/client";
import ActionsLoading from "@/app/sheets/[sheetId]/_components/ActionsLoading";

interface ActionsPageProps {
  sheetId: string;
  sheetUserId: string | undefined;
}

export default function Actions({ sheetId, sheetUserId }: ActionsPageProps) {
  const { data: currentUser, isLoading } = trpc.getCurrentUser.useQuery();

  if (isLoading) {
    return <ActionsLoading />;
  }

  return (
    <div className="py-4">
      <div className="border border-slate-100 px-4 py-6 rounded-lg">
        <div className="flex flex-col space-y-2">
          {currentUser?.id === sheetUserId && (
            <Link
              href={`/sheets/${sheetId}/edit`}
              className={buttonVariants({ variant: "secondary" })}
            >
              <FileEdit className="w-4 h-4 mr-2" />
              Modifier
            </Link>
          )}

          <Button variant="secondary" disabled>
            <AlertOctagon className="w-4 h-4 mr-2" />
            Signaler obsolète
          </Button>

          {currentUser?.id === sheetUserId && (
            <>
              <Separator />
              <DeleteSheetDialog sheetId={sheetId} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
