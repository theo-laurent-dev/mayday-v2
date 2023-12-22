"use client";

import { trpc } from "@/app/_trpc/client";
import { HasPermissionShield } from "@/app/_components/HasPermissionShield";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Separator } from "@/components/ui/separator";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ProfileFormSchema } from "@/types/forms";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProfileEditPageProps {
  params: {
    profileId: string;
  };
}

export default function ProfileEditPage({ params }: ProfileEditPageProps) {
  const [permissions, setPermissions] = useState<Array<string>>();
  const router = useRouter();
  const { data, isLoading: profileLoading } = trpc.getProfile.useQuery({
    id: params.profileId,
  });

  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      name: data?.profile.name,
      label: data?.profile.label,
      permissions: data?.profile.permissions,
    },
  });

  useEffect(() => {
    if (!profileLoading && data) {
      const t = JSON.parse(data?.profile?.permissions);
      const a = Array.isArray(t);
      console.log(a);
      //   setPermissions(
      //     JSON.parse(data?.profile?.permissions.replaceAll(`'`, `"`))
      //   );
    }
  }, [profileLoading, data]);

  const { mutate: updateProfile, isLoading: isUpdating } =
    trpc.updateProfile.useMutation({
      onSuccess: (data) => {
        router.push(`/admin/profiles/${data.id}`);
        toast({
          title: "Profil modifié",
          description: "Redirection vers le profil ...",
        });
      },
    });

  function onSubmit(values: z.infer<typeof ProfileFormSchema>) {
    // updateProfile({
    //   id: params.profileId,
    //   ...values,
    // });
    console.log("values submitted:", values);
  }

  function handleApplicationChange(value: boolean, name: string) {
    console.log("value:", value);
    console.log("name:", name);

    if (value === false) {
      setPermissions((prev) => prev?.filter((p) => p !== name));
    }

    if (value === true) {
      setPermissions((prev) => [...(prev || []), name]);
    }
  }

  if (profileLoading) {
    return <div>Chargement ...</div>;
  }

  return (
    <HasPermissionShield required="profiles.update">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {`Modification du profil : ${data?.profile.label}`}
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
                  defaultValue={data?.profile.name}
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
                  defaultValue={data?.profile.label}
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
              {/* <div className="grid grid-cols-3 gap-4">
                {data?.applications.map((application: any) => {
                  const permissions = JSON.parse(data?.profile?.permissions);
                  const allPermissions =
                    permissions.indexOf(`${application.name}.*`) !== -1;
                  return (
                    <FormField
                      key={application.id}
                      control={form.control}
                      name="permissions"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <FormLabel className="font-semibold">
                            {application.label}
                          </FormLabel>
                          <FormControl>
                            <Switch
                              checked={allPermissions}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  );
                })}
              </div> */}

              <div className="grid grid-cols-3 gap-4">
                {permissions}
                {data?.applications.map((application: any) => {
                  const profilepermissions = JSON.parse(
                    data?.profile?.permissions
                  );
                  const allPermissions =
                    profilepermissions.indexOf(`${application.name}.*`) !== -1;
                  return (
                    <Card key={application.id} className="space-y-1">
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <h2 className="font-semibold">{application.label}</h2>
                          <Switch
                            name={`${application.name}.*`}
                            defaultChecked={allPermissions}
                            onCheckedChange={(e) =>
                              handleApplicationChange(
                                e,
                                `${application.name}.*`
                              )
                            }
                          />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul>
                          {application.roles.map((role: any) => {
                            const curPerm = `${application.name}.${role.name}`;
                            const hasPerm =
                              profilepermissions.indexOf(curPerm) !== -1;
                            return (
                              <li
                                key={role.id}
                                className="flex justify-between items-center"
                              >
                                <span>{role.label}</span>
                                <Checkbox
                                  id="permissions[]"
                                  name="permissions[]"
                                  value={curPerm}
                                  defaultChecked={hasPerm}
                                  disabled={allPermissions}
                                />
                              </li>
                            );
                          })}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              <Button type="submit" disabled={false}>
                Mettre à jour
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </HasPermissionShield>
  );
}
