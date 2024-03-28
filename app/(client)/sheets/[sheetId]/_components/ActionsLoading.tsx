"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function ActionsLoading() {
  return (
    <div className="py-4">
      <div className="border border-slate-100 px-4 py-6 rounded-lg space-y-2">
        <Skeleton className="h-9 px-4 py-2 w-[190px]" />
        <Separator />
        <Skeleton className="h-9 px-4 py-2 w-[190px]" />
        <Skeleton className="h-9 px-4 py-2 w-[190px]" />
        <Skeleton className="h-9 px-4 py-2 w-[190px]" />
      </div>
    </div>
  );
}
