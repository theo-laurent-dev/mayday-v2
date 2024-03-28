"use client";

import { buttonVariants } from "@/components/ui/button";
import { trpc } from "@/app/_trpc/client";
import Link from "next/link";
import { HasPermissionShield } from "@/app/_components/HasPermissionShield";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import TabsWrapper from "@/app/(client)/dashboard/_components/tabs";
import { hasPerm } from "@/lib/utils";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const session = useSession();
  const { data: userUnpublishedSheets, isLoading } =
    trpc.getUnpublishedUserSheets.useQuery();

  if (isLoading) {
    return <Dashboard.Skeleton />;
  }

  return (
    <HasPermissionShield required="dashboard.view">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          {hasPerm({
            required: "sheets.create",
            roles: session?.data?.user.profile.roles,
          }) && (
            <div className="flex items-center space-x-2">
              <Link href={"/sheets/new"} className={buttonVariants()}>
                Nouvelle fiche
              </Link>
            </div>
          )}
        </div>
        <TabsWrapper userUnpublishedSheets={userUnpublishedSheets} />
      </div>
    </HasPermissionShield>
  );
}

Dashboard.Skeleton = function DashboardSkeleton() {
  return (
    <div className="py-4 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="h-8 w-[200px]" />
        </div>
        <div>
          <Skeleton className="h-8 w-[200px]" />
        </div>
      </div>
      <div>
        <Skeleton className="h-8 w-[300px]" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-[50px]" />
            <Skeleton className="h-4 w-[100px] mt-1" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-[50px]" />
            <Skeleton className="h-4 w-[100px] mt-1" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-[50px]" />
            <Skeleton className="h-4 w-[100px] mt-1" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-[50px]" />
            <Skeleton className="h-4 w-[100px] mt-1" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
