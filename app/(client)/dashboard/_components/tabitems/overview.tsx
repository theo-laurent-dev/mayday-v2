"use client";

import { SheetsWithUser } from "@/types/types";
import Kpi from "@/app/(client)/dashboard/_components/kpi";
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
  return <Kpi userUnpublishedSheets={userUnpublishedSheets} />;
}
