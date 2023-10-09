"use client";

import Link from "next/link";
import { trpc } from "@/app/_trpc/client";

import { Button } from "@/components/ui/button";

import DeleteDialog from "@/app/articles/[articleId]/_components/DeleteDialog";

interface ArticleIdPageProps {
  params: {
    articleId: string;
  };
}

export default function ArticleIdPage({ params }: ArticleIdPageProps) {
  const { articleId } = params;

  const { data: article, isLoading } = trpc.getArticle.useQuery({
    id: articleId.toString(),
  });

  return (
    <div className="py-4 space-y-8">
      {isLoading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="space-y-3">
              <div className="h-12 bg-slate-200 rounded"></div>
            </div>
            <div className="h-6 bg-slate-200 rounded"></div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {article?.title}
          </h1>
          <p className="text-gray-400">{article?.description}</p>
          <div className="flex items-center space-x-4">
            <Link href={`/articles/${article?.id}/edit`}>
              <Button variant="secondary">Modifier</Button>
            </Link>

            <DeleteDialog articleId={articleId} />
          </div>
        </div>
      )}
    </div>
  );
}
