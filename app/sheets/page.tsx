"use client";

import { useState } from "react";
import { trpc } from "@/app/_trpc/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { AlignJustify, Columns } from "lucide-react";

import NoSheets from "@/app/sheets/_components/NoSheets";
import LoadingSheets from "@/app/sheets/_components/Loading";
import CardSheets from "@/app/sheets/_components/Card";
import ListSheets from "@/app/sheets/_components/List";

export default function SheetsPage() {
  const { data: sheets, isLoading } = trpc.getSheets.useQuery();
  const [show, setShow] = useState("card");

  function toggleShow() {
    if (show === "card") setShow("list");
    if (show === "list") setShow("card");
  }

  if (isLoading) {
    return <LoadingSheets />;
  }

  return (
    <div className="py-4 space-y-8">
      <h1 className="text-xl font-bold tracking-tight sm:text-3xl">Fiches</h1>
      {sheets && sheets.length !== 0 ? (
        <>
          <Input placeholder="Rechercher ..." />
          <div className="flex justify-end space-x-2">
            <Button
              size="sm"
              variant={show === "list" ? "default" : "secondary"}
              onClick={toggleShow}
            >
              <AlignJustify className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={show === "card" ? "default" : "secondary"}
              onClick={toggleShow}
            >
              <Columns className="w-4 h-4" />
            </Button>
          </div>
          {show === "card" && <CardSheets sheets={sheets} />}
          {show === "list" && <ListSheets sheets={sheets} />}
        </>
      ) : (
        <NoSheets />
      )}
    </div>
  );
}
