import { RolesWithApplications } from "@/types/types";
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

// export function hasPerm({
//   required,
//   roles,
// }: {
//   required: string;
//   roles: RolesWithApplications;
// }) {
//   const filteredRoles = roles.filter(
//     (r) => `${r.application.name}.${r.name}` === required
//   );
//   return filteredRoles.length > 0;
// }

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

  // const results = roles.map((fr) => ({
  //   label: `${fr.application.name}.${fr.name}`,
  //   authorized: required.includes(`${fr.application.name}.${fr.name}`),
  // }));

  // const authorized = results.filter((r) => r.authorized === true);

  // return { results, authorized };
}
