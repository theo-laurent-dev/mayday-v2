"use client";

import { trpc } from "@/app/_trpc/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertOctagon, GanttChart, Users } from "lucide-react";

export default function Kpi() {
  const { data: sheets, isLoading: isLoadingSheets } =
    trpc.getSheets.useQuery();
  const { data: users, isLoading: isLoadingUsers } = trpc.getUsers.useQuery();
  const reportedSheets = sheets?.filter((sheet) => sheet.obsolete === true);

  const newSheetsThisMonth = sheets?.filter(
    (sheet) => new Date(sheet.createdAt).getMonth() === new Date().getMonth()
  );
  const newUsersThisMonth = users?.filter(
    (user) => new Date(user.createdAt).getMonth() === new Date().getMonth()
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Fiches</CardTitle>
          <GanttChart className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoadingSheets ? (
            <div className="flex flex-col space-y-1">
              <Skeleton className="w-12 h-7" />
              <Skeleton className="w-64 h-4" />
            </div>
          ) : (
            <>
              <div className="text-2xl font-bold">
                {isLoadingSheets ? "0" : sheets?.length}
              </div>
              <p className="text-xs text-muted-foreground">
                {`${
                  newSheetsThisMonth?.length || "0"
                } nouvelles fiches ce-mois`}
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
          <Users className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoadingUsers ? (
            <div className="flex flex-col space-y-1">
              <Skeleton className="w-12 h-7" />
              <Skeleton className="w-64 h-4" />
            </div>
          ) : (
            <>
              <div className="text-2xl font-bold">
                {isLoadingUsers ? "0" : users?.length}
              </div>
              <p className="text-xs text-muted-foreground">
                {`${
                  newUsersThisMonth?.length || "0"
                } nouveaux utilisateurs ce mois`}
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Obsolètes</CardTitle>
          <AlertOctagon className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoadingSheets ? (
            <div className="flex flex-col space-y-1">
              <Skeleton className="w-12 h-7" />
              <Skeleton className="w-64 h-4" />
            </div>
          ) : (
            <>
              <div className="text-2xl font-bold">
                {reportedSheets?.length || "0"}
              </div>
              <p className="text-xs text-muted-foreground">{`${Math.floor(
                (Number(reportedSheets?.length) * 100) / Number(sheets?.length)
              )}% des fiches`}</p>
            </>
          )}
        </CardContent>
      </Card>
      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Now</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+573</div>
          <p className="text-xs text-muted-foreground">+201 since last hour</p>
        </CardContent>
      </Card> */}
    </div>
  );
}
