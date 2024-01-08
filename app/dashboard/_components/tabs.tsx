"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SheetsWithUser } from "@/types/types";
import TabItemOverview from "@/app/dashboard/_components/tabitems/overview";
import TabItemFavorites from "@/app/dashboard/_components/tabitems/favorites";
import TabItemAccount from "@/app/dashboard/_components/tabitems/account";
import TabItemPassword from "@/app/dashboard/_components/tabitems/password";

interface TabsWrapperProps {
  userUnpublishedSheets: SheetsWithUser | undefined;
}

export default function TabsWrapper({
  userUnpublishedSheets,
}: TabsWrapperProps) {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="favorites">Favoris</TabsTrigger>
        <TabsTrigger value="account">Compte</TabsTrigger>
        <TabsTrigger value="password">Mot de passe</TabsTrigger>
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
