import { GroupedItems, RolesWithApplications } from "@/types/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`;
  return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}

export function hasPerm({
  required,
  roles,
}: {
  required: string;
  roles: RolesWithApplications;
}) {
  const requiredIsInclude = roles.filter(
    (r) => `${r.application.name}.${r.name}` === required
  );

  return requiredIsInclude.length > 0;
}

export function groupItems<T extends { group: string }>(
  listOfItems: T[]
): Record<string, GroupedItems> {
  return listOfItems.reduce((acc, curr) => {
    acc[curr.group]
      ? acc[curr.group].items.push(curr)
      : (acc[curr.group] = {
          name: curr.group,
          items: [curr],
        });
    return acc;
  }, {} as Record<string, GroupedItems>);
}
