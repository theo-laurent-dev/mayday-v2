import { HasPermissionShield } from "@/app/_components/HasPermissionShield";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { GanttChart, Tag, Tags, Users } from "lucide-react";
import Link from "next/link";

export default function AdminSheetsPage() {
  return (
    <HasPermissionShield required="admin.*">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Administration</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Fiches</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Administration des fiches
            </h2>
            <p className="text-muted-foreground">
              Ajouter ou supprimer des catégories, des sous-catégories ou des
              types de catégorie.
            </p>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-4 gap-4">
          <Link href="/admin/sheets/servicenow/categories">
            <div className="p-6 bg-gray-50 rounded-md space-y-2">
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4" />
                <h3 className="font-bold tracking-tight">Catégories</h3>
              </div>
              <p className="text-muted-foreground">
                Ajouter, modifier ou supprimer.
              </p>
            </div>
          </Link>
          <Link href="/admin/sheets/servicenow/subcategories">
            <div className="p-6 bg-gray-50 rounded-md space-y-2">
              <div className="flex items-center space-x-2">
                <Tags className="w-4 h-4" />
                <h3 className="font-bold tracking-tight">Sous-catégories</h3>
              </div>
              <p className="text-muted-foreground">
                Ajouter, modifier ou supprimer.
              </p>
            </div>
          </Link>
          <Link href="/admin/sheets/servicenow/categorytypes">
            <div className="p-6 bg-gray-50 rounded-md space-y-2">
              <div className="flex items-center space-x-2">
                <GanttChart className="w-4 h-4" />
                <h3 className="font-bold tracking-tight">Types de catégorie</h3>
              </div>
              <p className="text-muted-foreground">
                Ajouter, modifier ou supprimer.
              </p>
            </div>
          </Link>
          <Link href="/admin/sheets/servicenow/assignmentgroups">
            <div className="p-6 bg-gray-50 rounded-md space-y-2">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <h3 className="font-bold tracking-tight">{`Groupes d'assignation`}</h3>
              </div>
              <p className="text-muted-foreground">
                Ajouter, modifier ou supprimer.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </HasPermissionShield>
  );
}
