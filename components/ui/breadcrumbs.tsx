import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

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
