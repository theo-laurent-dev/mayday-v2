"use client";

import Kpi from "@/app/dashboard/_components/kpi";
import { Button } from "@/components/ui/button";
import { trpc } from "@/app/_trpc/client";
import Link from "next/link";
import { HasPermissionShield } from "@/app/_components/HasPermissionShield";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const { data: userUnpublishedSheets, isLoading } =
    trpc.getUnpublishedUserSheets.useQuery();

  if (isLoading) {
    return <Dashboard.Skeleton />;
  }

  return (
    <HasPermissionShield required="dashboard.view">
      <div className="py-4 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Link href={"/sheets/new"}>
            <Button>Nouvelle fiche</Button>
          </Link>
        </div>
        <Kpi userUnpublishedSheets={userUnpublishedSheets} />
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
