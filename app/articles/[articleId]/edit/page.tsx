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
import { Textarea } from "@/components/ui/textarea";

import { trpc } from "@/app/_trpc/client";

import { useRouter } from "next/navigation";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

interface ArticleEditPageProps {
  params: {
    articleId: string;
  };
}

export default function ArticleEditPage({ params }: ArticleEditPageProps) {
  const router = useRouter();
  const { articleId } = params;

  const { data: article, isLoading } = trpc.getArticle.useQuery({
    id: articleId.toString(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { mutate: updateArticle, isLoading: isUpdating } =
    trpc.updateArticle.useMutation({
      onSuccess: (data) => {
        router.push(`/articles/${data.id}`);
        toast({
          title: "Article modifié",
          description: "Redirection vers l'article ...",
        });
      },
    });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    updateArticle({
      id: articleId,
      title: data.title,
      description: data.description,
    });
  }

  if (isLoading) {
    return <div>Chargement</div>;
  }

  return (
    <div className="py-4 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-3xl">{"Edition d'un article"}</h1>
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
            defaultValue={article?.title}
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
          <FormField
            control={form.control}
            name="description"
            defaultValue={article?.description || ""}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can <span>@mention</span> other users and organizations.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isUpdating}>
            Mettre à jour
          </Button>
        </form>
      </Form>
    </div>
  );
}
