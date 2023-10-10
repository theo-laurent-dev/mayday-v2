"use client";

import { trpc } from "@/app/_trpc/client";

export default function SheetsPage() {
  const { data: sheets, isLoading } = trpc.getSheets.useQuery();

  if (isLoading) {
    return (
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="space-y-3">
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {sheets?.map((sheet) => (
        <div key={sheet.id}>{sheet.title}</div>
      ))}
    </div>
  );
}
