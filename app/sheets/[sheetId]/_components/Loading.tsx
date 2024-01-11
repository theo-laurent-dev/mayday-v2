"use client";

import { BreadcrumbsSkeleton } from "@/components/ui/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSheet() {
  return (
    <div>
      <BreadcrumbsSkeleton className="py-8" />
      <div className="flex space-x-2">
        <div className="w-5/6">
          <div className="py-4">
            <div className="border border-slate-100 px-4 py-6 rounded-lg">
              <div className="flex flex-col space-y-8">
                <div>
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-9 px-4 py-2 w-[800px]" />
                    <div className="flex justify-center items-center space-x-2">
                      <Skeleton className="h-6 px-4 py-2 w-[100px]" />
                      <Skeleton className="h-6 px-4 py-2 w-[100px]" />
                    </div>
                  </div>
                  <Skeleton className="h-4 px-4 py-2 w-[800px] mt-1" />
                </div>
                <div className="flex flex-col space-y-4">
                  <div>
                    <Skeleton className="h-5 px-4 py-2 w-[800px]" />
                    <Skeleton className="h-4 px-4 py-2 w-[800px] mt-1" />
                  </div>
                  <Skeleton className="h-1 px-4 py-2 w-full" />
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col">
                      <Skeleton className="h-4 px-4 py-2 w-[300px]" />
                      <Skeleton className="h-4 px-4 py-2 w-[300px] mt-1" />
                    </div>
                    <div className="flex flex-col">
                      <Skeleton className="h-4 px-4 py-2 w-[300px]" />
                      <Skeleton className="h-4 px-4 py-2 w-[300px] mt-1" />
                    </div>
                    <div className="flex flex-col">
                      <Skeleton className="h-4 px-4 py-2 w-[300px]" />
                      <Skeleton className="h-4 px-4 py-2 w-[300px] mt-1" />
                    </div>
                    <div className="flex flex-col">
                      <Skeleton className="h-4 px-4 py-2 w-[300px]" />
                      <Skeleton className="h-4 px-4 py-2 w-[300px] mt-1" />
                    </div>
                    <div className="flex flex-col">
                      <Skeleton className="h-4 px-4 py-2 w-[300px]" />
                      <Skeleton className="h-4 px-4 py-2 w-[300px] mt-1" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-4">
                  <div>
                    <Skeleton className="h-5 px-4 py-2 w-[800px]" />
                    <Skeleton className="h-4 px-4 py-2 w-[800px] mt-1" />
                  </div>
                  <Skeleton className="h-1 px-4 py-2 w-full" />
                  <div className="grid grid-cols-4 gap-4">
                    <div className="flex items-center">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2 ml-2">
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2 ml-2">
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2 ml-2">
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2 ml-2">
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2 ml-2">
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-4">
                  <div>
                    <Skeleton className="h-5 px-4 py-2 w-[800px]" />
                    <Skeleton className="h-4 px-4 py-2 w-[800px] mt-1" />
                  </div>
                  <Skeleton className="h-1 px-4 py-2 w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/6">
          <div className="py-4">
            <div className="border border-slate-100 px-4 py-6 rounded-lg space-y-2">
              <Skeleton className="h-9 px-4 py-2 w-[190px]" />
              <Separator />
              <Skeleton className="h-9 px-4 py-2 w-[190px]" />
              <Skeleton className="h-9 px-4 py-2 w-[190px]" />
              <Skeleton className="h-9 px-4 py-2 w-[190px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
