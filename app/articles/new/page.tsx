"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { toast } from "@/components/ui/use-toast";

import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
});

export default function ArticlesPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { mutate: addArticle, isLoading } = trpc.addArticle.useMutation({
    onSuccess: (data) => {
      router.push(`/articles/${data.id}/edit`);
      toast({
        title: "Article créé",
        description: "Redirection vers la configuration ...",
      });
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    addArticle({ title: data.title });
  }
  return (
    <div className="py-4 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-3xl">Nouvel article</h1>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is the public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            Suivant
          </Button>
        </form>
      </Form>
    </div>
  );
}
