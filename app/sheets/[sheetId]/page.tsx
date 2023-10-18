"use client";

import { trpc } from "@/app/_trpc/client";

import LoadingSheet from "@/app/sheets/[sheetId]/_components/Loading";
import Sheet from "./_components/Sheet";

interface SheetIdPageProps {
  params: {
    sheetId: string;
  };
}

export default function SheetIdPage({ params }: SheetIdPageProps) {
  //TRPC
  const { data: sheet, isLoading } = trpc.getSheet.useQuery({
    id: params.sheetId,
  });

  if (isLoading) {
    return <LoadingSheet />;
  }

  return <Sheet sheet={sheet} />;
}
