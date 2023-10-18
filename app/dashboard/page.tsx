"use client";

import Kpi from "@/app/dashboard/_components/kpi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/app/_trpc/client";
import Link from "next/link";

export default function Dashboard() {
  const { data, isLoading } = trpc.getArticles.useQuery();

  return (
    <div className="py-4 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Link href={"/sheets/new"}>
          <Button>Nouvelle fiche</Button>
        </Link>
      </div>
      <Kpi />
    </div>
  );
}
