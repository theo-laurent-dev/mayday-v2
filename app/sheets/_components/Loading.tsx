"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function LoadingSheets() {
  return (
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1 space-y-6 py-1">
        <div className="space-y-3">
          <div className="h-8 bg-slate-200 rounded mt-4" />
        </div>
        <div className="h-10 bg-slate-200 rounded mt-7" />
        <div className="flex justify-end space-x-2">
          <div className="h-8 bg-slate-200 rounded mt-4 w-10" />
          <div className="h-8 bg-slate-200 rounded mt-4 w-10" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="mt-2">
            <CardHeader>
              <div className="h-6 bg-slate-200 rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-6 bg-slate-200 rounded" />
            </CardContent>
            <CardFooter>
              <div className="h-6 bg-slate-200 rounded" />
            </CardFooter>
          </Card>
          <Card className="mt-2">
            <CardHeader>
              <div className="h-6 bg-slate-200 rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-6 bg-slate-200 rounded" />
            </CardContent>
            <CardFooter>
              <div className="h-6 bg-slate-200 rounded" />
            </CardFooter>
          </Card>
          <Card className="mt-2">
            <CardHeader>
              <div className="h-6 bg-slate-200 rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-6 bg-slate-200 rounded" />
            </CardContent>
            <CardFooter>
              <div className="h-6 bg-slate-200 rounded" />
            </CardFooter>
          </Card>
          <Card className="mt-2">
            <CardHeader>
              <div className="h-6 bg-slate-200 rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-6 bg-slate-200 rounded" />
            </CardContent>
            <CardFooter>
              <div className="h-6 bg-slate-200 rounded" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
