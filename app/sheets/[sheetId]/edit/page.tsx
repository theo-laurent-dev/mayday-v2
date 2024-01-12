"use client";

import { HasPermissionShield } from "@/app/_components/HasPermissionShield";
import { trpc } from "@/app/_trpc/client";
import EditSheetForm from "@/app/sheets/[sheetId]/edit/_components/EditSheetForm";
import { Breadcrumbs, BreadcrumbsSkeleton } from "@/components/ui/breadcrumbs";
import { Skeleton } from "@/components/ui/skeleton";

interface SheetEditPageProps {
  params: {
    sheetId: string;
  };
}

export default function SheetEditPage({ params }: SheetEditPageProps) {
  const { sheetId } = params;
  const { data: sheet, isLoading } = trpc.getSheet.useQuery({ id: sheetId });
  const breadcrumbLinks = [
    {
      label: "Dashboard",
      href: "/dashboard",
      current: false,
    },
    {
      label: "Fiches",
      href: "/sheets",
      current: false,
    },
    {
      label: sheet?.title,
      href: `/sheets/${sheet?.id}`,
      current: false,
    },
    {
      label: "Modification",
      href: `/sheets/${sheet?.id}/edit`,
      current: true,
    },
  ];

  if (isLoading) {
    return <SheetEditPage.Skeleton />;
  }

  return (
    <HasPermissionShield required="sheets.update">
      <Breadcrumbs breadcrumbLinks={breadcrumbLinks} className="py-8" />
      <div>
        <EditSheetForm sheet={sheet} />
      </div>
    </HasPermissionShield>
  );
}

SheetEditPage.Skeleton = function SheetEditPageSkeleton() {
  return (
    <div>
      <BreadcrumbsSkeleton className="py-8" />
      <div className="py-4 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-10 w-[300px]" />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div>
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-4 w-[300px] mt-1" />
          </div>
          <Skeleton className="h-1 rounded-full w-full" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-6 w-[300px] mt-1" />
        </div>
        <div className="flex flex-col space-y-4">
          <div>
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-4 w-[300px] mt-1" />
          </div>
          <Skeleton className="h-1 rounded-full w-full" />
          <div className="flex flex-col space-y-4">
            <div>
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-6 w-[300px] mt-1" />
            </div>
            <div>
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-6 w-[300px] mt-1" />
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div>
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-4 w-[300px] mt-1" />
          </div>
          <Skeleton className="h-1 rounded-full w-full" />
          <div className="flex flex-col space-y-4">
            <div>
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-6 w-[300px] mt-1" />
            </div>
            <div>
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-6 w-[300px] mt-1" />
            </div>
          </div>
          <div>
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-6 w-[300px] mt-1" />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div>
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-4 w-[300px] mt-1" />
          </div>
          <Skeleton className="h-1 rounded-full w-full" />
          <div>
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-6 w-[300px] mt-1" />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div>
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-4 w-[300px] mt-1" />
          </div>
          <Skeleton className="h-1 rounded-full w-full" />
          <div>
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-6 w-[300px] mt-1" />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div>
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-4 w-[300px] mt-1" />
          </div>
          <Skeleton className="h-1 rounded-full w-full" />
          <div>
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-6 w-[300px] mt-1" />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div>
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-4 w-[300px] mt-1" />
          </div>
          <Skeleton className="h-1 rounded-full w-full" />
          <div>
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-6 w-[300px] mt-1" />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div>
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-4 w-[300px] mt-1" />
          </div>
          <Skeleton className="h-1 rounded-full w-full" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
        <Skeleton className="h-8 w-[200px]" />
      </div>
    </div>
  );
};
