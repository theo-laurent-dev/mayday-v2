"use client";

import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { AccountUpdatePasswordFormSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function TabItemPassword() {
  type AccountUpdatePasswordFormValues = z.infer<
    typeof AccountUpdatePasswordFormSchema
  >;

  const form = useForm<AccountUpdatePasswordFormValues>({
    resolver: zodResolver(AccountUpdatePasswordFormSchema),
  });

  const { mutate: updateAccountPassword, isLoading: updateAccountLoading } =
    trpc.updateAccountPassword.useMutation({
      onSuccess: () => {
        form.reset({ currentPassword: "", newPassword: "" });
        toast({
          title: "Succès !",
          description: "Votre mot de passe a bien été mis à jour.",
        });
      },
      onError: (error) => {
        toast({
          title: "Erreur",
          description: error.message === "FORBIDDEN" && "Mauvais mot de passe.",
          variant: "destructive",
        });
      },
    });

  function onSubmit(data: AccountUpdatePasswordFormValues) {
    updateAccountPassword(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Mot de passe</CardTitle>
            <CardDescription>
              Modification de votre mot de passe. Aucune reconnexion nécessaire.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ancien mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nouveau mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button disabled={updateAccountLoading}>Mettre à jour</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
