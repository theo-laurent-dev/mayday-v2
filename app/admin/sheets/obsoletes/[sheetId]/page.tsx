"use client";

import { HasPermissionShield } from "@/app/_components/HasPermissionShield";
import { trpc } from "@/app/_trpc/client";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

interface AdminSheetsObsoletesIdPageProps {
  params: {
    sheetId: string;
  };
}

export default function AdminSheetsObsoletesIdPage({
  params,
}: AdminSheetsObsoletesIdPageProps) {
  const { data, isLoading } = trpc.getSheet.useQuery({ id: params.sheetId });
  const breadcrumbLinks = [
    {
      label: "Administration",
      href: "/admin",
      current: false,
    },
    {
      label: "Fiches",
      href: "/admin/sheets",
      current: false,
    },
    {
      label: "Obsolètes",
      href: "/admin/sheets/obsoletes",
      current: false,
    },
    {
      label: data?.title,
      href: `/admin/sheets/obsoletes/${data?.id}`,
      current: true,
    },
  ];

  if (isLoading) {
    return "Chargement ...";
  }

  return (
    <HasPermissionShield required="admin.*">
      <div className="flex-col space-y-8 p-8">
        <Breadcrumbs breadcrumbLinks={breadcrumbLinks} />
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold">{data?.title}</h1>
          <Link
            href={`/admin/sheets/obsoletes/${data?.id}/edit`}
            className={buttonVariants({ variant: "secondary" })}
          >
            Modifier
          </Link>
        </div>
      </div>
    </HasPermissionShield>
  );
}
