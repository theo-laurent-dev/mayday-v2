"use client";

import { trpc } from "@/app/_trpc/client";
import { HasPermissionShield } from "@/app/_components/HasPermissionShield";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ProfileFormSchema } from "@/types/forms";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProfileForm from "./_components/form";

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
