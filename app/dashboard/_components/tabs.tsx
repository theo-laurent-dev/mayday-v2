"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SheetsWithUser } from "@/types/types";
import TabItemOverview from "@/app/dashboard/_components/tabitems/overview";
import TabItemFavorites from "@/app/dashboard/_components/tabitems/favorites";
import TabItemAccount from "@/app/dashboard/_components/tabitems/account";
import TabItemPassword from "@/app/dashboard/_components/tabitems/password";
import { useSession } from "next-auth/react";
import { hasPerm } from "@/lib/utils";

interface TabsWrapperProps {
  userUnpublishedSheets: SheetsWithUser | undefined;
}

export default function TabsWrapper({
  userUnpublishedSheets,
}: TabsWrapperProps) {
  const session = useSession();

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger
          value="favorites"
          disabled={
            !hasPerm({
              required: "sheets.favorite",
              roles: session?.data?.user.profile.roles,
            })
          }
        >
          Favoris
        </TabsTrigger>
        <TabsTrigger
          value="account"
          disabled={
            !hasPerm({
              required: "account.update",
              roles: session?.data?.user.profile.roles,
            })
          }
        >
          Compte
        </TabsTrigger>
        <TabsTrigger
          value="password"
          disabled={
            !hasPerm({
              required: "password.update",
              roles: session?.data?.user.profile.roles,
            })
          }
        >
          Mot de passe
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <TabItemOverview userUnpublishedSheets={userUnpublishedSheets} />
      </TabsContent>
      <TabsContent value="favorites" className="space-y-4">
        <TabItemFavorites />
      </TabsContent>
      <TabsContent value="account" className="space-y-4">
        <TabItemAccount />
      </TabsContent>
      <TabsContent value="password" className="space-y-4">
        <TabItemPassword />
      </TabsContent>
    </Tabs>
  );
}
