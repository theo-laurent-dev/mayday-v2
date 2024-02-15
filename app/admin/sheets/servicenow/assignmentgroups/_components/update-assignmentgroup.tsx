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
import { Pencil } from "lucide-react";
import { ServicenowAssignmentGroupFormSchema } from "@/types/schemas";
import { ServicenowAssignmentGroupValues } from "@/types/types";
import { trpc } from "@/app/_trpc/client";

interface UpdateAssignmentGroupProps {
  assignmentgroupId: string;
}

export function UpdateAssignmentGroup({
  assignmentgroupId,
}: UpdateAssignmentGroupProps) {
  const utils = trpc.useContext();
  const form = useForm<ServicenowAssignmentGroupValues>({
    resolver: zodResolver(ServicenowAssignmentGroupFormSchema),
  });

  const { data: assignmentgroup } = trpc.getServicenowAssignmentGroup.useQuery({
    id: assignmentgroupId,
  });

  const { mutate: updateServicenowAssignmentGroup, isLoading } =
    trpc.updateServicenowAssignmentGroup.useMutation({
      onSuccess: () => {
        utils.getServicenowAssignmentGroups.reset();
        toast({
          title: "Groupe d'assignation modifié",
        });
        form.reset({ name: "", label: "", group: "" });
      },
    });

  function onSubmit(data: ServicenowAssignmentGroupValues) {
    updateServicenowAssignmentGroup({ id: assignmentgroupId, ...data });
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
              <DialogTitle>{`Modification d'un groupe d'assignation`}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  defaultValue={assignmentgroup?.name}
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
                  defaultValue={assignmentgroup?.label}
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
                  defaultValue={assignmentgroup?.group}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Groupe</FormLabel>
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
