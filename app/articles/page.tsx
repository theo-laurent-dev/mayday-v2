"use client";

import Link from "next/link";
import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";

export default function ArticlesPage() {
  const { data: articles, isLoading } = trpc.getArticles.useQuery();

  return (
    <div className="py-4 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-3xl">Articles</h1>
          <span className="text-gray-400">Liste des articles.</span>
        </div>
        <div>
          <Link href="/articles/new">
            <Button>Nouveau</Button>
          </Link>
        </div>
      </div>
      {isLoading && (
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="space-y-3">
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      )}
      {!isLoading && articles && articles?.length === 0 && (
        <span>Aucun article</span>
      )}
      {!isLoading && articles && articles?.length > 0 && (
        <ul>
          {articles.map((article) => (
            <Link href={`/articles/${article.id}`} key={article.id}>
              <li>{article.title}</li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
