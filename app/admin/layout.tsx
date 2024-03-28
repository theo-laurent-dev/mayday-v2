import type { Metadata } from "next";
import AdminNavbar from "@/app/admin/_components/nav";

export const metadata: Metadata = {
  title: "Mayday - Administration",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-screen w-full pl-[53px]">
      <AdminNavbar />
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[54px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Mayday - Administration</h1>
        </header>
        <>{children}</>
      </div>
    </div>
  );
}