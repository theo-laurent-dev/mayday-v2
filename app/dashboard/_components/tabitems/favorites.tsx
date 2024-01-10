"use client";

import { trpc } from "@/app/_trpc/client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { CircleIcon } from "lucide-react";
import Link from "next/link";

export default function TabItemFavorites() {
  const utils = trpc.useContext();
  const { data, isLoading } = trpc.getFavoritesUserSheets.useQuery();
  const { mutate: favoriteSheet, isLoading: favoriteSheetLoading } =
    trpc.favoriteSheet.useMutation({
      onSuccess: () => {
        utils.getFavoritesUserSheets.invalidate();
        toast({
          title: "Succès !",
          description: "Fiche désépinglée",
        });
      },
    });
  const handleFavorite = (id: string) => {
    favoriteSheet({ id });
  };

  if (isLoading) {
    return <TabItemFavorites.Skeleton />;
  }

  return (
    <div>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Fiches favorites</CardTitle>
          <CardDescription>Liste des fiches favorites</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {data &&
              data.length > 0 &&
              data?.map((sheet, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <h2 className="font-bold text-md truncate">
                        {sheet.title}
                      </h2>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              onClick={() => handleFavorite(sheet.id)}
                              disabled={favoriteSheetLoading}
                            >
                              <BookmarkFilledIcon className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Désépingler</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <p className="text-muted-foreground text-sm">
                        {sheet.shortDescription}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="w-full space-y-2">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                          {sheet.user.name}
                        </div>
                        <div>
                          {new Date(sheet.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <Link
                          href={`/sheets/${sheet.id}`}
                          className={cn(
                            "w-full",
                            buttonVariants({ variant: "secondary" })
                          )}
                        >
                          Voir
                        </Link>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
          {data && data.length === 0 && (
            <div>
              Aucune fiche épinglée. Pour en ajouter, rendez-vous
              <Link href={"/sheets"} className="ml-1 border-b border-black">
                ici
              </Link>
              .
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

TabItemFavorites.Skeleton = function TabItemFavoritesSkeleton() {
  return (
    <div>
      <Card>
        <CardHeader className="space-y-1">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px] mt-1" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-8 w-[200px]" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-[300px]" />
                  <Skeleton className="h-4 w-[300px]" />
                  <Skeleton className="h-4 w-[300px]" />
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Skeleton className="h-3 w-3 rounded-full mr-1" />
                      <Skeleton className="h-4 w-[130px]" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-[100px]" />
                    </div>
                  </div>
                  <div>
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-8 w-[200px]" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-[300px]" />
                  <Skeleton className="h-4 w-[300px]" />
                  <Skeleton className="h-4 w-[300px]" />
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Skeleton className="h-3 w-3 rounded-full mr-1" />
                      <Skeleton className="h-4 w-[130px]" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-[100px]" />
                    </div>
                  </div>
                  <div>
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
