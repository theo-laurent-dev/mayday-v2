"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { sheet } from "@/types/types";
import { Building, Download } from "lucide-react";
import parse from "html-react-parser";
import Link from "next/link";
import { categories, categoryTypes, subcategories } from "@/data/sheets";

interface SheetProps {
  sheet: sheet | undefined;
}

export default function Sheet({ sheet }: SheetProps) {
  const category = categories.find(
    (category) => category.value === sheet?.category
  );
  const subcategory = subcategories.find(
    (subcategory) => subcategory.value === sheet?.subcategory
  );
  const categoryType = categoryTypes.find(
    (categoryType) => categoryType.value === sheet?.categoryType
  );
  return (
    <div className="py-4">
      <div className="border border-slate-100 px-4 py-6 rounded-lg">
        <div className="flex flex-col space-y-8">
          <div>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold tracking-tight md:text-xl lg:text-2xl">
                {sheet?.title}
              </h3>
              <div className="flex justify-center items-center space-x-2">
                <Badge className="space-x-1">
                  <Building className="w-4 h-4" />
                  {sheet?.company === "all" && <span>Toutes</span>}
                  {sheet?.company === "aliaxis" && <span>Aliaxis</span>}
                  {sheet?.company === "nicoll" && <span>Nicoll</span>}
                  {sheet?.company === "girpi" && <span>Girpi</span>}
                  {sheet?.company === "aui" && <span>AUI</span>}
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

            <p className="text-sm text-muted-foreground">
              {sheet?.shortDescription}
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">
                Qualification ServiceNow
              </h3>
              <p className="text-sm text-muted-foreground">
                Toutes les informations relatives à la qualification des tickets
                dans ServiceNow.
              </p>
            </div>
            <Separator />
            <div className="grid grid-cols-3 gap-3">
              <div>
                <h5 className="text-md font-semibold tracking-tight">
                  Catégorie
                </h5>
                <p className="text-sm text-muted-foreground">
                  {category?.label}
                </p>
              </div>
              <div>
                <h5 className="text-md font-semibold tracking-tight">
                  Sous-catégorie
                </h5>
                <p className="text-sm text-muted-foreground">
                  {subcategory?.label}
                </p>
              </div>
              <div>
                <h5 className="text-md font-semibold tracking-tight">
                  Type de catégorie
                </h5>
                <p className="text-sm text-muted-foreground">
                  {categoryType?.label}
                </p>
              </div>
              <div>
                <h5 className="text-md font-semibold tracking-tight">
                  {`Groupe d'assignation`}
                </h5>
                <p className="text-sm text-muted-foreground">
                  {sheet?.assignmentGroup}
                </p>
              </div>
              <div>
                <h5 className="text-md font-semibold tracking-tight">
                  Criticité
                </h5>
                <p className="text-sm text-muted-foreground">
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
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">
                Pièces-jointes
              </h3>
              <p className="text-sm text-muted-foreground">
                Liste des pièces-jointes rattachées.
              </p>
            </div>
            <Separator />
            <div className="grid md:grid-cols-4 md:gap-4">
              <Link href={"/"}>
                <div className="w-fit flex items-center border-2 border-muted space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                  <Download className="mt-px h-5 w-5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Creation_du_compte_AX.pdf
                    </p>
                    <p className="text-sm text-muted-foreground">5 mo</p>
                  </div>
                </div>
              </Link>
              <Link href={"/"}>
                <div className="w-fit flex items-center border-2 border-muted space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                  <Download className="mt-px h-5 w-5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Creation_du_compte_AX.pdf
                    </p>
                    <p className="text-sm text-muted-foreground">5 mo</p>
                  </div>
                </div>
              </Link>
              <Link href={"/"}>
                <div className="w-fit flex items-center border-2 border-muted space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                  <Download className="mt-px h-5 w-5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Creation_du_compte_AX.pdf
                    </p>
                    <p className="text-sm text-muted-foreground">5 mo</p>
                  </div>
                </div>
              </Link>
              <Link href={"/"}>
                <div className="w-fit flex items-center border-2 border-muted space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                  <Download className="mt-px h-5 w-5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Creation_du_compte_AX.pdf
                    </p>
                    <p className="text-sm text-muted-foreground">5 mo</p>
                  </div>
                </div>
              </Link>
              <Link href={"/"}>
                <div className="w-fit flex items-center border-2 border-muted space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                  <Download className="mt-px h-5 w-5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Creation_du_compte_AX.pdf
                    </p>
                    <p className="text-sm text-muted-foreground">5 mo</p>
                  </div>
                </div>
              </Link>
              <Link href={"/"}>
                <div className="w-fit flex items-center border-2 border-muted space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                  <Download className="mt-px h-5 w-5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Creation_du_compte_AX.pdf
                    </p>
                    <p className="text-sm text-muted-foreground">5 mo</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">
                Description
              </h3>
              <p className="text-sm text-muted-foreground">
                Informations de la fiche.
              </p>
            </div>
            <Separator />
            <div className="text-sm">{parse(`${sheet?.description}`)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
