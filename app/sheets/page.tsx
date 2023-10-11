"use client";

import { trpc } from "@/app/_trpc/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlignJustify, Columns, Files, List, Paperclip } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SheetsPage() {
  const { data: sheets, isLoading } = trpc.getSheets.useQuery();
  const [show, setShow] = useState("card");

  function toggleShow() {
    if (show === "card") setShow("list");
    if (show === "list") setShow("card");
  }

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
    <div className="py-4 space-y-8">
      <h1 className="text-xl font-bold tracking-tight sm:text-3xl">
        Procédures
      </h1>
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
      {show === "card" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sheets?.map((sheet) => (
            <Link key={sheet.id} href={`/sheets/${sheet.id}`}>
              <Card className="hover:shadow-lg transition-all ease-in-out">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-semibold leading-none tracking-tight lg:text-xl">
                      {sheet.title}
                    </CardTitle>
                    <Badge variant="destructive">Critique</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm truncate">{sheet.shortDescription}</p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs">4</span>
                    <Paperclip className="w-3 h-3 text-gray-500" />
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
      {show === "list" && (
        <div className="flex flex-col space-y-2">
          {sheets?.map((sheet) => (
            <Link key={sheet.id} href={`/sheets/${sheet.id}`}>
              <Card className="hover:shadow-lg transition-all ease-in-out">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-semibold leading-none tracking-tight lg:text-xl">
                      {sheet.title}
                    </CardTitle>
                    <Badge variant="destructive">Critique</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm truncate">{sheet.shortDescription}</p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs">4</span>
                    <Paperclip className="w-3 h-3 text-gray-500" />
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
