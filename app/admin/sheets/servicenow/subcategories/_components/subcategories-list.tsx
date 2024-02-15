"use client";

import { trpc } from "@/app/_trpc/client";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { UpdateSubCategory } from "./update-subcategory";

export default function SubcategoriesList() {
  const utils = trpc.useContext();
  const { data: categories, isLoading } =
    trpc.getServicenowCategories.useQuery();
  const { mutate: deleteServicenowSubCategory, isLoading: isDeleting } =
    trpc.deleteServicenowSubCategories.useMutation({
      onSuccess: () => {
        utils.getServicenowCategories.reset();
        toast({
          title: "Sous-catégorie supprimée !",
        });
      },
    });

  const handleDelete = (id: string) => {
    deleteServicenowSubCategory({ id });
  };

  if (isLoading) {
    return "Chargement ...";
  }
  return (
    <div className="space-y-2">
      {categories &&
        categories.map((category) => (
          <div key={category.id}>
            <p className="py-2 text-muted-foreground">
              {category.label} ({category.subcategories.length})
            </p>
            <div className="space-y-2">
              {category.subcategories.length > 0 &&
                category.subcategories.map((subcategory) => (
                  <div
                    key={subcategory.id}
                    className="flex items-center justify-between bg-gray-50 w-full rounded-lg p-2"
                  >
                    <div className="flex items-center space-x-2 ml-4">
                      <Icon name={subcategory.icon} />
                      <div className="space-x-2">
                        <span>{subcategory.label}</span>
                        <span className="text-muted-foreground italic">
                          ({subcategory.name})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <UpdateSubCategory subcategoryId={subcategory.id} />
                      <Button
                        variant="ghost"
                        className="hover:text-red-500 transition-all ease-in-out"
                        onClick={() => handleDelete(subcategory.id)}
                        disabled={isDeleting}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              {category.subcategories.length < 1 && (
                <h6 className="text-sm">Aucune sous-catégorie.</h6>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
