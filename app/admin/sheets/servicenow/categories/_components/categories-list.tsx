"use client";

import { trpc } from "@/app/_trpc/client";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { UpdateCategory } from "./update-category";

export default function CategoriesList() {
  const utils = trpc.useContext();
  const { data: categories, isLoading } =
    trpc.getServicenowCategories.useQuery();
  const { mutate: deleteServicenowCategory, isLoading: isDeleting } =
    trpc.deleteServicenowCategories.useMutation({
      onSuccess: () => {
        utils.getServicenowCategories.reset();
        toast({
          title: "Catégorie supprimée !",
        });
      },
    });

  const handleDelete = (id: string) => {
    deleteServicenowCategory({ id });
  };

  if (isLoading) {
    return "Chargement ...";
  }
  return (
    <div className="space-y-2">
      {categories &&
        categories.map((categorie) => (
          <div
            key={categorie.id}
            className="flex items-center justify-between bg-gray-50 w-full rounded-lg p-2"
          >
            <div className="flex items-center space-x-2 ml-4">
              <Icon name={categorie.icon} />
              <div className="space-x-2">
                <span>{categorie.label}</span>
                <span className="text-muted-foreground italic">
                  ({categorie.name})
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <UpdateCategory categoryId={categorie.id} />
              <Button
                variant="ghost"
                className="hover:text-red-500 transition-all ease-in-out"
                onClick={() => handleDelete(categorie.id)}
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
