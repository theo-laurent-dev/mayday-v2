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

import { useRouter } from "next/navigation";

interface DeleteDialogProps {
  articleId: string;
}

export default function DeleteDialog({ articleId }: DeleteDialogProps) {
  const router = useRouter();
  const { mutate: deleteArticle, isLoading: isDeleting } =
    trpc.deleteArticle.useMutation({
      onSuccess: () => {
        router.push("/articles");
        toast({
          title: "Article supprimé !",
        });
      },
    });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Supprimer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Êtes-vous sûr ?</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer définitivement cet article ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => deleteArticle({ id: articleId })}
          >
            Supprimer définitivement
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
