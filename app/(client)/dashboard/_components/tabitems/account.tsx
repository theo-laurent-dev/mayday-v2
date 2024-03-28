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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { AccountUpdateNameFormSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function TabItemAccount() {
  const { data, update: sessionUpdate } = useSession();

  type AccountUpdateNameFormValues = z.infer<
    typeof AccountUpdateNameFormSchema
  >;

  const form = useForm<AccountUpdateNameFormValues>({
    resolver: zodResolver(AccountUpdateNameFormSchema),
  });

  const { mutate: updateAccount, isLoading: updateAccountLoading } =
    trpc.updateAccount.useMutation({
      onSuccess: () => {
        sessionUpdate();
        toast({
          title: "Succès !",
          description: "Votre nom a bien été mis à jour.",
        });
      },
    });

  function onSubmit(data: AccountUpdateNameFormValues) {
    updateAccount(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Compte</CardTitle>
            <CardDescription>
              Modifiez vos informations personnelles.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              defaultValue={data?.user.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
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
