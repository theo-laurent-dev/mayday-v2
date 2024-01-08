"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { UserUpdateFormSchema } from "@/types/schemas";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button, buttonVariants } from "@/components/ui/button";
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

import Link from "next/link";
import { trpc } from "@/app/_trpc/client";
import { ProfilesWithRole, UserWithRole } from "@/types/types";

interface UserEditFormProps {
  user: UserWithRole;
  profiles: ProfilesWithRole;
}

export default function UserEditForm({ user, profiles }: UserEditFormProps) {
  const router = useRouter();
  const utils = trpc.useContext();
  const { mutate: updateUser, isLoading: isUpdating } =
    trpc.updateUser.useMutation({
      onSuccess: (data: any) => {
        router.push(`/admin/users/${data.id}`);
        utils.getUser.reset();
        toast({
          title: "Utilisateur modifié",
          description: "Redirection vers le profil ...",
        });
      },
    });
  const form = useForm<z.infer<typeof UserUpdateFormSchema>>({
    resolver: zodResolver(UserUpdateFormSchema),
  });

  function onSubmit(values: z.infer<typeof UserUpdateFormSchema>) {
    // console.log(values);

    updateUser({
      id: user?.id,
      ...values,
    });
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {`Modification de l'utilisateur : ${user?.name}`}
          </h2>
        </div>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="name"
                defaultValue={user?.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                defaultValue={user?.email}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="profileId"
                defaultValue={user?.profileId}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profil</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selectionner un profil" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {profiles &&
                            profiles.map((profile, index) => (
                              <SelectItem key={index} value={profile.id}>
                                {profile.label}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="isActive"
                defaultValue={user?.isActive}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Statut du compte</FormLabel>
                      <FormDescription>
                        Autorisation du compte à se connecter à Mayday.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex space-x-2 items-center">
              <Button type="submit" disabled={isUpdating}>
                Mettre à jour
              </Button>
              <Link
                href={`/admin/users/${user?.id}`}
                className={buttonVariants({ variant: "secondary" })}
              >
                Annuler
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
