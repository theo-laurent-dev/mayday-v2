"use client";

import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";

import { Frown, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function NoSheets() {
  return (
    <div className="flex items-center justify-center">
      <div className="py-12 px-20 bg-slate-50 border border-slate-100 space-y-4 rounded-lg">
        <div className="flex justify-center">
          <Frown className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-medium text-center">Aucune fiche</h3>
        <Link
          href={`/sheets/new`}
          className={cn(buttonVariants({ variant: "default" }), "w-full")}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Ajouter une fiche
        </Link>
      </div>
    </div>
  );
}
