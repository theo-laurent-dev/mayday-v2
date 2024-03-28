"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { HasPermissionShield } from "@/app/_components/HasPermissionShield";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { trpc } from "@/app/_trpc/client";
import { AccountUpdatePasswordFormSchema } from "@/types/schemas";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";

const Account = () => {
  const { data, update: sessionUpdate } = useSession();

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
    <HasPermissionShield required="account.view">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Compte</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Email</CardTitle>
              <CardDescription>
                Used to identify your store in the marketplace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <Input
                  placeholder="johndoe@outlook.com"
                  defaultValue={data?.user?.email}
                />
              </form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Modifier</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Nom</CardTitle>
              <CardDescription>
                Used to identify your store in the marketplace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <Input placeholder="John DOE" defaultValue={data?.user?.name} />
              </form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Modifier</Button>
            </CardFooter>
          </Card>
          <Card>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                  <CardTitle>Mot de passe</CardTitle>
                  <CardDescription>
                    Used to identify your store in the marketplace.
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
                          <Input
                            type="password"
                            placeholder="*********"
                            {...field}
                          />
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
                          <Input
                            type="password"
                            placeholder="*********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button disabled={updateAccountLoading}>Modifier</Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </HasPermissionShield>
  );
};

export default Account;
