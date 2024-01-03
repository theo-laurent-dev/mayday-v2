"use client";

import { trpc } from "@/app/_trpc/client";
import { HasPermissionShield } from "@/app/_components/HasPermissionShield";
import ProfileForm from "@/app/admin/profiles/[profileId]/edit/_components/form";

interface ProfileEditPageProps {
  params: {
    profileId: string;
  };
}

export default function ProfileEditPage({ params }: ProfileEditPageProps) {
  const { data, isLoading } = trpc.getProfile.useQuery({
    id: params.profileId,
  });

  if (isLoading && data === undefined) {
    return <div>Chargement ...</div>;
  }

  return (
    <HasPermissionShield required="profiles.update">
      {data && (
        <ProfileForm
          profile={data?.profile}
          isLoading={isLoading}
          applications={data?.applications || []}
        />
      )}
    </HasPermissionShield>
  );
}
