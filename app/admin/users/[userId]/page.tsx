"use client";

import { trpc } from "@/app/_trpc/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { AlertOctagon, FileEdit } from "lucide-react";
import { HasPermissionShield } from "@/app/_components/HasPermissionShield";

interface UserIdPageProps {
  params: {
    userId: string;
  };
}

export default function UserPage({ params }: UserIdPageProps) {
  const { data, isLoading: userLoading } = trpc.getUser.useQuery({
    id: params.userId,
  });

  if (userLoading) {
    return <div>Chargement ...</div>;
  }

  return (
    <HasPermissionShield required="users.view">
      <div className="flex space-x-2">
        <div className="w-5/6">
          <div className="py-4 space-y-8">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <h1 className="text-3xl font-bold tracking-tight">
                        {data?.name}
                      </h1>
                      <span className="text-muted-foreground ml-2">
                        {data?.email}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Badge
                      variant={data?.isActive ? "secondary" : "destructive"}
                    >
                      {data?.isActive ? "Actif" : "Inactif"}
                    </Badge>
                  </div>
                </div>
                <Separator />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Groupes</h3>
                    <p className="text-sm text-muted-foreground">
                      {`Liste des groupes de l'utilisateur`}
                    </p>
                  </div>
                  <div>
                    <Accordion type="single" collapsible className="w-full">
                      ...
                    </Accordion>
                  </div>
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </div>
        </div>
        <div className="w-1/6">
          <div className="py-4">
            <div className="border border-slate-100 px-4 py-6 rounded-lg">
              <div className="flex flex-col space-y-2">
                <Link
                  href={`/admin/users/${params.userId}/edit`}
                  className={buttonVariants({ variant: "secondary" })}
                >
                  <FileEdit className="w-4 h-4 mr-2" />
                  Modifier
                </Link>

                <Button
                  variant={data?.isActive ? "destructive" : "default"}
                  // disabled={reportSheetLoading || obsolete}
                  // onClick={handleReport}
                >
                  <AlertOctagon className="w-4 h-4 mr-2" />
                  {data?.isActive ? "Désactiver" : "Activer"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HasPermissionShield>
  );
}
