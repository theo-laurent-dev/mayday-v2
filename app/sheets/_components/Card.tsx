"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Paperclip } from "lucide-react";

import { sheet } from "@/types/types";

interface CardSheetsProps {
  sheets: sheet[];
}

export default function CardSheets({ sheets }: CardSheetsProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {sheets?.map((sheet) => (
        <Link key={sheet.id} href={`/sheets/${sheet.id}`}>
          <Card className="hover:shadow-lg transition-all ease-in-out">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-semibold leading-none tracking-tight truncate lg:text-xl">
                  {sheet.title}
                </CardTitle>
                <Badge
                  variant={
                    sheet?.criticity === "critical" ||
                    sheet?.criticity === "high"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {sheet?.criticity === "critical" && "Critique"}
                  {sheet?.criticity === "high" && "Haute"}
                  {sheet?.criticity === "medium" && "Moyenne"}
                  {sheet?.criticity === "low" && "Basse"}
                </Badge>
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
  );
}
