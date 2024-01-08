"use client";

import { SheetsWithUser } from "@/types/types";
import Kpi from "../kpi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TabItemOverviewProps {
  userUnpublishedSheets: SheetsWithUser | undefined;
}

export default function TabItemOverview({
  userUnpublishedSheets,
}: TabItemOverviewProps) {
  return (
    <>
      <Kpi userUnpublishedSheets={userUnpublishedSheets} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">{/* <Overview /> */}</CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Fiches récentes</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>{/* <RecentSales /> */}</CardContent>
        </Card>
      </div>
    </>
  );
}
