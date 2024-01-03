"use client";

import { trpc } from "@/app/_trpc/client";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { HasPermissionShield } from "@/app/_components/HasPermissionShield";
import UserEditForm from "./_components/form";

interface ProfileEditPageProps {
  params: {
    userId: string;
  };
}

export default function ProfileEditPage({ params }: ProfileEditPageProps) {
  const { data, isLoading } = trpc.getUser.useQuery({
    id: params.userId,
  });
  const { data: profiles, isLoading: profilesLoading } =
    trpc.getProfiles.useQuery();

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
      current: false,
    },
    {
      label: "Modification",
      href: `/admin/users/${params.userId}/edit`,
      current: true,
    },
  ];

  if ((isLoading && data === undefined) || profilesLoading) {
    return <div>Chargement ...</div>;
  }

  return (
    <HasPermissionShield required="users.update">
      <Breadcrumbs breadcrumbLinks={breadcrumbLinks} className="py-8" />
      {data && <UserEditForm user={data} profiles={profiles} />}
    </HasPermissionShield>
  );
}
