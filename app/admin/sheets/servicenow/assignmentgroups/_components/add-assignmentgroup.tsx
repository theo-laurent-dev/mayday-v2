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
import { ServicenowAssignmentGroupFormSchema } from "@/types/schemas";
import { ServicenowAssignmentGroupValues } from "@/types/types";
import { trpc } from "@/app/_trpc/client";

export function AddAssignmentGroup() {
  const utils = trpc.useContext();
  const form = useForm<ServicenowAssignmentGroupValues>({
    resolver: zodResolver(ServicenowAssignmentGroupFormSchema),
  });

  const { mutate: addServicenowAssignmentGroup, isLoading } =
    trpc.addServicenowAssignmentGroup.useMutation({
      onSuccess: () => {
        utils.getServicenowAssignmentGroups.reset();
        toast({
          title: "Groupe d'assignation créé",
        });
        form.reset({ name: "", label: "", group: "" });
      },
    });

  function onSubmit(data: ServicenowAssignmentGroupValues) {
    addServicenowAssignmentGroup(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Nouveau</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <DialogHeader>
              <DialogTitle>{`Nouveau groupe d'assignation`}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
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
              <div>
                <FormField
                  control={form.control}
                  name="group"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Groupe</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Applicatif, Proximité, ..."
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
                  onClick={() => form.reset({ name: "", label: "", group: "" })}
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
