import { signIn, useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const accountFormSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .email("This is not an email adress."),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;
interface LoginFormProps {
  setForm: Dispatch<SetStateAction<string>>;
}

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
};

const LoginForm: React.FC<LoginFormProps> = ({ setForm }) => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session.status, router]);

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  function onSubmit(data: AccountFormValues) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        toast({
          title: "Connecté !",
          description: "Redirection vers le Dashboard ...",
        });
        router.push("/dashboard");
        router.refresh();
      }
      if (callback?.error) {
        toast({
          title: "Erreur !",
          description: callback?.error,
        });
      }
    });
  }

  return (
    <Form {...form}>
      <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Connexion
      </h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-96">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="prénom.nom@aliaxis.com" {...field} />
              </FormControl>
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
                <Input type="password" placeholder="*********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Connexion
        </Button>
      </form>
      <Separator />
      <div className="text-center">
        <Label>
          Pas encore de compte ?{" "}
          <Button variant="link" onClick={() => setForm("register")}>
            {"M'inscrire"}
          </Button>
        </Label>
      </div>
    </Form>
  );
};

export default LoginForm;
