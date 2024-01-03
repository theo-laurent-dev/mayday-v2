"use client";

import { trpc } from "@/app/_trpc/client";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ProfileFormSchema } from "@/types/forms";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ApplicationsWithRoles, ProfileWithRole } from "@/types/types";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

interface ProfileFormProps {
  profile: ProfileWithRole | undefined;
  isLoading: boolean;
  applications: ApplicationsWithRoles;
}

export default function ProfileForm({
  profile,
  isLoading,
  applications,
}: ProfileFormProps) {
  const router = useRouter();
  const utils = trpc.useContext();
  const { mutate: updateProfile, isLoading: isUpdating } =
    trpc.updateProfile.useMutation({
      onSuccess: (data: any) => {
        router.push(`/admin/profiles/${data.id}`);
        utils.getProfile.reset();
        toast({
          title: "Profil modifié",
          description: "Redirection vers le profil ...",
        });
      },
    });

  const breadcrumbLinks = [
    {
      label: "Administration",
      href: "/admin",
      current: false,
    },
    {
      label: "Profils",
      href: "/admin/profiles",
      current: false,
    },
    {
      label: profile?.label,
      href: `/admin/profiles/${profile?.id}`,
      current: false,
    },
    {
      label: "Modification",
      href: `/admin/profiles/${profile?.id}/edit`,
      current: true,
    },
  ];

  type ProfileFormValues = z.infer<typeof ProfileFormSchema>;

  const defaultValues: Partial<ProfileFormValues> = {
    name: profile?.name,
    label: profile?.label,
  };

  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!isLoading) form.setValue("permissions", profile?.permissions);
  }, [profile?.permissions, form, isLoading]);

  function onSubmit(values: z.infer<typeof ProfileFormSchema>) {
    // console.log(values);

    updateProfile({
      id: profile?.id,
      ...values,
    });
  }

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <Breadcrumbs breadcrumbLinks={breadcrumbLinks} />
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {`Modification du profil : ${profile?.label}`}
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
                defaultValue={profile?.name}
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
                name="label"
                defaultValue={profile?.label}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
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
                name="permissions"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Permissions</FormLabel>
                      <FormDescription>
                        Séléctionnez les permissions à attribuer à ce profil.
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {applications.map((app: any) => {
                        return (
                          <FormField
                            key={app.id}
                            control={form.control}
                            name="permissions"
                            render={({ field }) => {
                              const hasFullPerm = field.value?.includes(
                                `${app.name}.*`
                              );
                              return (
                                <Card>
                                  <CardHeader>
                                    <div className="flex justify-between items-center">
                                      <FormLabel className="font-semibold">
                                        {app.label}
                                      </FormLabel>
                                      <FormItem
                                        key={app.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Switch
                                            checked={field.value?.includes(
                                              `${app.name}.*`
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...field.value,
                                                    `${app.name}.*`,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !==
                                                        `${app.name}.*`
                                                    )
                                                  );
                                            }}
                                          />
                                        </FormControl>
                                      </FormItem>
                                    </div>
                                  </CardHeader>
                                  <CardContent className="space-y-2">
                                    {app.roles.map((role: any) => (
                                      <FormField
                                        key={role.id}
                                        control={form.control}
                                        name="permissions"
                                        render={({ field }) => {
                                          return (
                                            <FormItem
                                              key={role.id}
                                              className="flex flex-row items-start space-x-3 space-y-0"
                                            >
                                              <FormControl>
                                                <Checkbox
                                                  checked={
                                                    field.value?.includes(
                                                      `${app.name}.${role.name}`
                                                    ) || hasFullPerm
                                                  }
                                                  onCheckedChange={(
                                                    checked
                                                  ) => {
                                                    return checked
                                                      ? field.onChange([
                                                          ...field.value,
                                                          `${app.name}.${role.name}`,
                                                        ])
                                                      : field.onChange(
                                                          field.value?.filter(
                                                            (value) =>
                                                              value !==
                                                              `${app.name}.${role.name}`
                                                          )
                                                        );
                                                  }}
                                                  disabled={hasFullPerm}
                                                />
                                              </FormControl>
                                              <FormLabel className="font-normal">
                                                {role.label}
                                              </FormLabel>
                                            </FormItem>
                                          );
                                        }}
                                      />
                                    ))}
                                  </CardContent>
                                </Card>
                              );
                            }}
                          />
                        );
                      })}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex space-x-2 items-center">
              <Button type="submit" disabled={isUpdating}>
                Mettre à jour
              </Button>
              <Link
                href={`/admin/profiles/${profile?.id}`}
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
