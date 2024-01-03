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
import { Separator } from "@/components/ui/separator";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { AlertOctagon, Ban, CheckCircle, FileEdit } from "lucide-react";
import { HasPermissionShield } from "@/app/_components/HasPermissionShield";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { toast } from "@/components/ui/use-toast";

interface UserIdPageProps {
  params: {
    userId: string;
  };
}

export default function UserPage({ params }: UserIdPageProps) {
  const utils = trpc.useContext();
  const { data, isLoading: userLoading } = trpc.getUser.useQuery({
    id: params.userId,
  });
  const { mutate: updateStatusUser, isLoading: updateStatusUserLoading } =
    trpc.switchStatusUser.useMutation({
      onSuccess: (data) => {
        utils.getUser.invalidate({
          id: params.userId,
        });
        toast({
          title: "Succès !",
          description: `Utilisateur ${data.name} ${
            data.isActive ? "activé" : "désactivé"
          } !`,
        });
      },
    });

  const breadcrumbLinks = [
    {
      label: "Administration",
      href: "/admin",
      current: false,
    },
    {
      label: "Utilisateurs",
      href: "/admin/users",
      current: false,
    },
    {
      label: data?.name,
      href: `/admin/users/${params.userId}`,
      current: true,
    },
  ];

  const handleStatusUser = () => {
    updateStatusUser({ id: params.userId });
  };

  if (userLoading) {
    return <div>Chargement ...</div>;
  }

  return (
    <HasPermissionShield required="users.view">
      <Breadcrumbs breadcrumbLinks={breadcrumbLinks} className="py-8" />
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
                      className="space-x-2"
                    >
                      {data?.isActive ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <AlertOctagon className="w-3 h-3" />
                      )}
                      {data?.isActive ? (
                        <span>Actif</span>
                      ) : (
                        <span>Inactif</span>
                      )}
                    </Badge>
                  </div>
                </div>
                <Separator />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Profil</h3>
                    <p className="text-sm text-muted-foreground">
                      {`Profil de l'utilisateur`}
                    </p>
                  </div>
                  <div>
                    <Badge variant="secondary">{data?.profile?.label}</Badge>
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
                  disabled={updateStatusUserLoading}
                  onClick={handleStatusUser}
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
