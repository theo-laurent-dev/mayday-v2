"use client";

import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function App() {
  const router = useRouter();

  useEffect(() => {
    return router.push("/dashboard");
  }, [router]);
  return (
    <div className="h-screen flex justify-center items-center">
      <RefreshCw className="animate-spin" />
    </div>
  );
}
