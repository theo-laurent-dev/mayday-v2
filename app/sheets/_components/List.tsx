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

import { GanttChart, Info, Paperclip, Wrench } from "lucide-react";

import { SheetsWithUser } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ListSheetsProps {
  sheets: SheetsWithUser;
}

export default function ListSheets({ sheets }: ListSheetsProps) {
  return (
    <div className="flex flex-col space-y-2">
      {sheets?.map((sheet) => (
        <Link key={sheet.id} href={`/sheets/${sheet.id}`}>
          <Card className="hover:shadow-lg transition-all ease-in-out">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-semibold leading-none tracking-tight lg:text-xl">
                  {sheet.title}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">
                    {sheet.type === "informative" && (
                      <div className="flex items-center space-x-2">
                        <Info className="w-4 h-4" />
                        <span>Informatif</span>
                      </div>
                    )}
                    {sheet.type === "procedure" && (
                      <div className="flex items-center space-x-2">
                        <GanttChart className="w-4 h-4" />
                        <span>Procédure</span>
                      </div>
                    )}
                    {sheet.type === "maintenance" && (
                      <div className="flex items-center space-x-2">
                        <Wrench className="w-4 h-4" />
                        <span>Maintenance</span>
                      </div>
                    )}
                  </Badge>
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
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm truncate">{sheet.shortDescription}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center space-x-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">
                  {sheet.user.name}
                </span>
              </div>
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
