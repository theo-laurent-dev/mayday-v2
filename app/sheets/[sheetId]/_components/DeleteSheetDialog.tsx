"use client";

import { trpc } from "@/app/_trpc/client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";

import { useRouter } from "next/navigation";

interface DeleteSheetDialogProps {
  sheetId: string;
}

export default function DeleteSheetDialog({ sheetId }: DeleteSheetDialogProps) {
  const router = useRouter();
  const { mutate: deleteSheet, isLoading: isDeleting } =
    trpc.deleteSheet.useMutation({
      onSuccess: () => {
        router.push("/sheets");
        toast({
          title: "Fiche supprimée !",
        });
      },
    });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="w-4 h-4 mr-2" />
          Supprimer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Êtes-vous sûr ?</DialogTitle>
          <DialogDescription className="py-4">
            Cette action supprimera définitivement cette fiche.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => deleteSheet({ id: sheetId })}
            disabled={isDeleting}
          >
            Supprimer définitivement
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
