import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "./skeleton";

export type BreadcrumbLink = {
  label: string | undefined;
  href: string | undefined;
  current: boolean;
};

interface Breadcrumbs extends React.HTMLAttributes<HTMLDivElement> {
  breadcrumbLinks: BreadcrumbLink[];
}

export function Breadcrumbs({ breadcrumbLinks, className }: Breadcrumbs) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {breadcrumbLinks &&
        Array.isArray(breadcrumbLinks) &&
        breadcrumbLinks.map((breadcrumbLink, index) => (
          <span key={index} className="flex items-center space-x-2">
            {index > 0 && <ChevronRight className="text-black h-4 w-4" />}
            <Link
              href={breadcrumbLink.href || ""}
              className={cn(
                "text-muted-foreground hover:text-black transition-all ease-in-out",
                breadcrumbLink.current && "text-black"
              )}
            >
              {breadcrumbLink.label}
            </Link>
          </span>
        ))}
    </div>
  );
}

interface BreadcrumbsSkeleton extends React.HTMLAttributes<HTMLDivElement> {}

export function BreadcrumbsSkeleton({ className }: BreadcrumbsSkeleton) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Skeleton className="h-4 w-[100px]" />
      <ChevronRight className="text-black h-4 w-4" />
      <Skeleton className="h-4 w-[100px]" />
      <ChevronRight className="text-black h-4 w-4" />
      <Skeleton className="h-4 w-[100px]" />
    </div>
  );
}
