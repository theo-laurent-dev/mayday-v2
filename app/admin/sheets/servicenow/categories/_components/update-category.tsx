"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Icon from "@/components/ui/icon";
import { ChevronsUpDown, Pencil, icons } from "lucide-react";
import { ServicenowCategoryFormSchema } from "@/types/schemas";
import { ServicenowCategoryValues } from "@/types/types";
import { trpc } from "@/app/_trpc/client";

interface UpdateCategoryProps {
  categoryId: string;
}

export function UpdateCategory({ categoryId }: UpdateCategoryProps) {
  const [open, setOpen] = useState(false);
  const allIcons = Object.keys(icons);
  const utils = trpc.useContext();
  const form = useForm<ServicenowCategoryValues>({
    resolver: zodResolver(ServicenowCategoryFormSchema),
  });

  const { data: category } = trpc.getServicenowCategory.useQuery({
    id: categoryId,
  });

  const { mutate: updateServicenowCategory, isLoading } =
    trpc.updateServicenowCategory.useMutation({
      onSuccess: () => {
        utils.getServicenowCategories.reset();
        toast({
          title: "Catégorie modifiée",
        });
        form.reset({ name: "", label: "", icon: undefined });
      },
    });

  function onSubmit(data: ServicenowCategoryValues) {
    updateServicenowCategory({ id: categoryId, ...data });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <DialogHeader>
              <DialogTitle>{`Modification d'une catégorie`}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <FormField
                  control={form.control}
                  name="icon"
                  defaultValue={category?.icon}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icône</FormLabel>
                      <div>
                        <Popover
                          open={open}
                          onOpenChange={setOpen}
                          modal={true}
                        >
                          <PopoverTrigger asChild className="w-full">
                            <FormControl>
                              <Button variant="outline" size="lg">
                                {field.value ? (
                                  <Icon name={field.value} className="mr-2" />
                                ) : (
                                  <span className="text-muted-foreground">
                                    Sélectionner ...
                                  </span>
                                )}
                                <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="p-0"
                            side="bottom"
                            align="start"
                          >
                            <Command>
                              {/* <CommandInput placeholder="Rechercher ..." /> */}
                              <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                  {allIcons.map((i, index) => (
                                    <CommandItem
                                      key={index}
                                      value={i}
                                      onSelect={() => {
                                        form.setValue("icon", i);
                                        setOpen(false);
                                      }}
                                    >
                                      <Icon name={i} className="mr-2" />
                                      <span>{i}</span>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  defaultValue={category?.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="hardware, software, ..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="label"
                  defaultValue={category?.label}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Label</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Hardware, Software, ..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="submit" disabled={isLoading}>
                  Mettre à jour
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  disabled={isLoading}
                  onClick={() =>
                    form.reset({ name: "", label: "", icon: undefined })
                  }
                >
                  Annuler
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
