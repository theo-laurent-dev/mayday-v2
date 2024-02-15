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
  FormDescription,
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
import { Check, ChevronsUpDown, icons } from "lucide-react";
import { ServicenowSubCategoryFormSchema } from "@/types/schemas";
import { ServicenowSubCategoryValues } from "@/types/types";
import { trpc } from "@/app/_trpc/client";
import { cn } from "@/lib/utils";

export function AddSubCategory() {
  const [openIconsModal, setOpenIconsModal] = useState(false);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const allIcons = Object.keys(icons);
  const utils = trpc.useContext();
  const form = useForm<ServicenowSubCategoryValues>({
    resolver: zodResolver(ServicenowSubCategoryFormSchema),
    defaultValues: {
      categoryId: undefined,
      icon: undefined,
      name: "",
      label: "",
    },
  });
  const { data: categories, isLoading: categoriesLoading } =
    trpc.getServicenowCategories.useQuery();

  const { mutate: addServicenowSubCategory, isLoading } =
    trpc.addServicenowSubCategories.useMutation({
      onSuccess: () => {
        utils.getServicenowCategories.reset();
        toast({
          title: "Sous-catégorie crééé",
        });
        form.reset({
          name: "",
          label: "",
          categoryId: undefined,
          icon: undefined,
        });
      },
    });

  function onSubmit(data: ServicenowSubCategoryValues) {
    addServicenowSubCategory(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Nouvelle sous-catégorie</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <DialogHeader>
              <DialogTitle>Nouvelle sous-catégorie</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Catégorie</FormLabel>
                      <Popover
                        modal={true}
                        open={openCategoryModal}
                        onOpenChange={setOpenCategoryModal}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between w-full",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                <div className="flex items-center">
                                  <Icon
                                    name={
                                      categories &&
                                      categories.find(
                                        (category) =>
                                          category.id === field.value
                                      )?.icon
                                    }
                                    className="mr-2"
                                  />
                                  <span>
                                    {categories &&
                                      categories.find(
                                        (category) =>
                                          category.id === field.value
                                      )?.label}
                                  </span>
                                </div>
                              ) : (
                                "Selectionner ..."
                              )}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" align="start">
                          <Command>
                            {/* <CommandInput placeholder="Search language..." /> */}
                            <CommandEmpty>No language found.</CommandEmpty>
                            <CommandGroup>
                              {categories &&
                                categories.map((category) => (
                                  <CommandItem
                                    value={category.id}
                                    key={category.id}
                                    onSelect={() => {
                                      form.setValue("categoryId", category.id);
                                      setOpenCategoryModal(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        category.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    <div className="flex items-center space-x-2">
                                      <Icon
                                        name={category.icon}
                                        className="w-4 h-4"
                                      />
                                      <span>{category.label}</span>
                                    </div>
                                  </CommandItem>
                                ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Icône</FormLabel>
                      <Popover
                        modal={true}
                        open={openIconsModal}
                        onOpenChange={setOpenIconsModal}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between w-full",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                <div className="flex items-center">
                                  <Icon name={field.value} className="mr-2" />
                                  <span>{field.value}</span>
                                </div>
                              ) : (
                                "Selectionner ..."
                              )}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="p-0"
                          side="bottom"
                          align="start"
                        >
                          <Command>
                            <CommandInput placeholder="Change icon..." />
                            <CommandList>
                              <CommandEmpty>No results found.</CommandEmpty>
                              <CommandGroup>
                                {allIcons.map((i, index) => (
                                  <CommandItem
                                    key={index}
                                    value={i}
                                    onSelect={() => {
                                      form.setValue("icon", i);
                                      setOpenIconsModal(false);
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="name"
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
                  Ajouter
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
