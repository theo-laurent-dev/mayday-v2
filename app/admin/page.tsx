"use client";

import Kpi from "@/app/admin/_components/kpi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/app/admin/_components/overview";
import { RecentUsers } from "@/app/admin/_components/recent-users";
import Options from "@/app/admin/_components/options";
import { HasPermissionShield } from "@/app/_components/HasPermissionShield";

export default function AdminPage() {
  //TODO: ADD LOADING SKELETON FUNCTION
  return (
    <HasPermissionShield required="admin.view">
      <div className="py-4 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Administration</h1>
          <Options />
        </div>
        <Kpi />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-4 sm:col-span-3">
            <CardHeader>
              <CardTitle>Utilisateurs récents</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentUsers />
            </CardContent>
          </Card>
        </div>
      </div>
    </HasPermissionShield>
  );
}
