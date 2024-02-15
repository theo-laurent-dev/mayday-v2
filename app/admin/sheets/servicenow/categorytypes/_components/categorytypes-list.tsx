"use client";

import { trpc } from "@/app/_trpc/client";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { UpdateCategoryType } from "@/app/admin/sheets/servicenow/categorytypes/_components/update-categorytype";

export default function CategoryTypesList() {
  const utils = trpc.useContext();
  const { data: categorytypes, isLoading } =
    trpc.getServicenowCategoryTypes.useQuery();
  const { mutate: deleteServicenowCategoryType, isLoading: isDeleting } =
    trpc.deleteServicenowCategoryType.useMutation({
      onSuccess: () => {
        utils.getServicenowCategoryTypes.reset();
        toast({
          title: "Type de catégorie supprimé !",
        });
      },
    });

  const handleDelete = (id: string) => {
    deleteServicenowCategoryType({ id });
  };

  if (isLoading) {
    return "Chargement ...";
  }
  return (
    <div className="space-y-2">
      {categorytypes &&
        categorytypes.map((categorytype) => (
          <div
            key={categorytype.id}
            className="flex items-center justify-between bg-gray-50 w-full rounded-lg p-2"
          >
            <div className="flex items-center space-x-2 ml-4">
              <Icon name={categorytype.icon} />
              <div className="space-x-2">
                <span>{categorytype.label}</span>
                <span className="text-muted-foreground italic">
                  ({categorytype.name})
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <UpdateCategoryType categoryTypeId={categorytype.id} />
              <Button
                variant="ghost"
                className="hover:text-red-500 transition-all ease-in-out"
                onClick={() => handleDelete(categorytype.id)}
                disabled={isDeleting}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
}
