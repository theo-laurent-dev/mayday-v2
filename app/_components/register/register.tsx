"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import * as z from "zod";

import { trpc } from "@/app/_trpc/client";

import { useRouter } from "next/navigation";

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
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Le nom doit faire au moins 2 caractères.",
    })
    .max(30, "Le nom ne doit pas excéder 30 caractères."),
  email: z
    .string()
    .min(2, {
      message: "L'email doit faire au moins 2 caractères.",
    })
    .email("Ce n'est pas un mail valide."),
  password: z
    .string()
    .min(6, {
      message: "Le mot de passe doit faire au minimum 6 caractères.",
    })
    .max(30, {
      message: "Le mot de passe ne doit pas excéder 30 caractères.",
    }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;
interface RegisterFormProps {
  setForm: Dispatch<SetStateAction<string>>;
}

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  // email: "Your name",
  // date: new Date("2023-01-23"),
  // password: "test",
};

const RegisterForm: React.FC<RegisterFormProps> = ({ setForm }) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  function onSubmit(data: AccountFormValues) {
    onRegister({ name: data.name, email: data.email, password: data.password });
  }

  const { mutate: onRegister, isLoading } = trpc.register.useMutation({
    onSuccess: () => {
      setForm("login");
      toast({
        title: "Bienvenue !",
        description: "Tu peux désormais te connecter.",
      });
    },
  });

  return (
    <Form {...form}>
      <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Inscription
      </h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Votre nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Votre email" {...field} />
              </FormControl>
              <FormDescription>
                Exemple : prénom.nom@aliaxis.com
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormDescription>
                Le mot de passe doit faire minimum 6 caractères et ne doit pas
                excéder 30 caractères.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          Inscription
        </Button>
      </form>
      <Separator />
      <div className="text-center">
        <Label>
          Déjà un compte ?{" "}
          <Button variant="link" onClick={() => setForm("login")}>
            {"Me connecter"}
          </Button>
        </Label>
      </div>
    </Form>
  );
};

export default RegisterForm;
