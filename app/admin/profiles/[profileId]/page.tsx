"use client";

import { trpc } from "@/app/_trpc/client";
import { HasPermissionShield } from "@/app/_components/HasPermissionShield";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

interface UserIdPageProps {
  params: {
    profileId: string;
  };
}

export default function UserPage({ params }: UserIdPageProps) {
  const { data, isLoading: profileLoading } = trpc.getProfile.useQuery({
    id: params.profileId,
  });

  if (profileLoading) {
    return <div>Chargement ...</div>;
  }

  return (
    <HasPermissionShield required="profiles.view">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {data?.profile.label}
            </h2>
            <p className="text-muted-foreground">{data?.profile.name}</p>
          </div>
          <Link
            className={buttonVariants({ variant: "secondary" })}
            href={`/admin/profiles/${params.profileId}/edit`}
          >
            Modifier
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {data?.applications.map((application: any) => {
            const permissions = JSON.parse(data?.profile?.permissions);
            const allPermissions =
              permissions.indexOf(`${application.name}.*`) !== -1;
            return (
              <Card key={application.id} className="space-y-1">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold">{application.label}</h2>
                    <Switch
                      name="permissions[]"
                      value={`${application.name}.*`}
                      defaultChecked={allPermissions}
                      disabled
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <ul>
                    {application.roles.map((role: any) => {
                      const curPerm = `${application.name}.${role.name}`;
                      const hasPerm = permissions.indexOf(curPerm) !== -1;
                      return (
                        <li
                          key={role.id}
                          className="flex justify-between items-center"
                        >
                          <span>{role.label}</span>
                          <Checkbox
                            name="permissions[]"
                            value={curPerm}
                            defaultChecked={hasPerm}
                            disabled
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
      </div>
    </HasPermissionShield>
  );
}
