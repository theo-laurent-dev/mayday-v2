"use client";

import { trpc } from "@/app/_trpc/client";
import { HasPermissionShield } from "@/app/_components/HasPermissionShield";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ApplicationWithRoles, role } from "@/types/types";
import { Skeleton } from "@/components/ui/skeleton";

interface ProfileIdPageProps {
  params: {
    profileId: string;
  };
}

export default function ProfilePage({ params }: ProfileIdPageProps) {
  const { data, isLoading } = trpc.getProfile.useQuery({
    id: params.profileId,
  });

  if (isLoading) {
    return <ProfilePage.Skeleton />;
  }

  return (
    <HasPermissionShield required="profiles.view">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {data && data?.profile.label}
            </h2>
            <p className="text-muted-foreground">
              {data && data?.profile.name}
            </p>
          </div>
          <Link
            className={buttonVariants({ variant: "secondary" })}
            href={`/admin/profiles/${params.profileId}/edit`}
          >
            Modifier
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {data &&
            data?.applications.map((application: ApplicationWithRoles) => {
              const permissions = data?.profile.permissions;
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
                      {application.roles.map((role: role) => {
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

ProfilePage.Skeleton = function ProfileSkeleton() {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px] mt-1" />
        </div>
        <div>
          <Skeleton className="h-10 w-[110px]" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Card className="space-y-1">
          <CardHeader>
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-[100px]" />
              <Skeleton className="h-6 rounded-full w-[50px]" />
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 rounded w-[20px]" />
              </li>
              <li className="flex justify-between items-center">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 rounded w-[20px]" />
              </li>
              <li className="flex justify-between items-center">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 rounded w-[20px]" />
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="space-y-1">
          <CardHeader>
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-[100px]" />
              <Skeleton className="h-6 rounded-full w-[50px]" />
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 rounded w-[20px]" />
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="space-y-1">
          <CardHeader>
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-[100px]" />
              <Skeleton className="h-6 rounded-full w-[50px]" />
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 rounded w-[20px]" />
              </li>
              <li className="flex justify-between items-center">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 rounded w-[20px]" />
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
