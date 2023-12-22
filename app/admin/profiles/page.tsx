"use client";

import { trpc } from "@/app/_trpc/client";
import { DataTable } from "@/app/admin/profiles/_components/data-table/data-table";
import { buttonVariants } from "@/components/ui/button";
import { columns } from "@/app/admin/profiles/_components/data-table/columns";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { HasPermissionShield } from "@/app/_components/HasPermissionShield";

export default function ProfilesPage() {
  const { data: profiles, isLoading: profilesLoading } =
    trpc.getProfiles.useQuery();

  if (profilesLoading) {
    return <ProfilesPage.Skeleton />;
  }

  return (
    <HasPermissionShield required="profiles.view">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Administration des profils
            </h2>
            <p className="text-muted-foreground">Liste des profils</p>
          </div>
          <Link href="/admin/profiles/new" className={buttonVariants()}>
            Nouveau profil
          </Link>
        </div>
        <DataTable data={profiles || []} columns={columns} />
      </div>
    </HasPermissionShield>
  );
}

ProfilesPage.Skeleton = function ProfilesSkeleton() {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px] mt-1" />
        </div>
        <div>
          <Skeleton className="h-10 w-[150px]" />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-8 w-[100px]" />
          <Skeleton className="h-8 w-[90px]" />
        </div>
        <div>
          <Skeleton className="h-8 w-[70px]" />
        </div>
      </div>
      <div>
        <Skeleton className="h-32 w-full" />
      </div>
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="h-8 w-[250px]" />
        </div>
        <div className="flex items- space-x-6">
          <div>
            <Skeleton className="h-8 w-[200px]" />
          </div>
          <div>
            <Skeleton className="h-8 w-[70px]" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-[30px]" />
            <Skeleton className="h-8 w-[30px]" />
            <Skeleton className="h-8 w-[30px]" />
            <Skeleton className="h-8 w-[30px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
