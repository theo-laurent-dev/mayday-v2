"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertOctagon, Bookmark, FileEdit } from "lucide-react";
import Link from "next/link";
import DeleteSheetDialog from "./DeleteSheetDialog";
import { trpc } from "@/app/_trpc/client";
import ActionsLoading from "@/app/sheets/[sheetId]/_components/ActionsLoading";
import { toast } from "@/components/ui/use-toast";
import { hasPerm } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";

interface ActionsPageProps {
  sheetId: string;
  sheetUserId: string | undefined;
  obsolete: boolean | undefined;
  shortId: string | undefined | null;
  isFavorite: boolean | undefined;
}

export default function Actions({
  sheetId,
  sheetUserId,
  obsolete,
  shortId,
  isFavorite,
}: ActionsPageProps) {
  const session = useSession();
  const { data: currentUser, isLoading } = trpc.getCurrentUser.useQuery();
  const utils = trpc.useContext();
  const { mutate: reportSheet, isLoading: reportSheetLoading } =
    trpc.reportSheet.useMutation({
      onSuccess: () => {
        utils.getSheet.invalidate({ id: sheetId });
        toast({
          title: "Fiche signalée obsolète",
        });
      },
    });
  const { mutate: favoriteSheet, isLoading: favoriteSheetLoading } =
    trpc.favoriteSheet.useMutation({
      onSuccess: (sheetUpdated) => {
        const favorited = sheetUpdated.favoritesUsers.filter(
          (u) => u.id === session?.data?.user.id
        );
        utils.getSheet.invalidate({ id: sheetId });
        toast({
          title: `Fiche ${favorited.length > 0 ? "épinglée" : "désépinglée"}`,
        });
      },
    });
  const handleReport = () => {
    reportSheet({ id: sheetId });
  };

  const handleFavorite = (id: string) => {
    favoriteSheet({ id });
  };

  if (isLoading) {
    return <ActionsLoading />;
  }

  return (
    <div className="py-4">
      <div className="border border-slate-100 px-4 py-6 rounded-lg">
        <div className="flex flex-col space-y-2">
          <span className="text-center bg-gray-100 p-2 rounded-md">
            {shortId}
          </span>
          <Separator />
          {currentUser?.id === sheetUserId &&
            hasPerm({
              required: "sheets.update",
              roles: session?.data?.user.profile.roles,
            }) && (
              <Link
                href={`/sheets/${sheetId}/edit`}
                className={buttonVariants({ variant: "secondary" })}
              >
                <FileEdit className="w-4 h-4 mr-2" />
                Modifier
              </Link>
            )}
          {hasPerm({
            required: "sheets.report",
            roles: session?.data?.user.profile.roles,
          }) && (
            <Button
              variant="secondary"
              disabled={reportSheetLoading || obsolete}
              onClick={handleReport}
            >
              <AlertOctagon className="w-4 h-4 mr-2" />
              Signaler obsolète
            </Button>
          )}
          {currentUser?.id === sheetUserId &&
            hasPerm({
              required: "sheets.delete",
              roles: session?.data?.user.profile.roles,
            }) && (
              <>
                <Separator />
                <DeleteSheetDialog sheetId={sheetId} />
              </>
            )}
          {hasPerm({
            required: "sheets.favorite",
            roles: session?.data?.user.profile.roles,
          }) && (
            <Button
              variant="secondary"
              disabled={reportSheetLoading || obsolete}
              onClick={() => handleFavorite(sheetId)}
            >
              {isFavorite ? (
                <>
                  <BookmarkFilledIcon className="w-4 h-4" />
                  <span>Désépingler</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span>Epingler</span>
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
