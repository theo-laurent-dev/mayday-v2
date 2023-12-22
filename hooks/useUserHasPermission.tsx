import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function useUserHasPermission(role: string) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
  const router = useRouter();
  const { mutate: onCheckHasPerm } = trpc.hasPermission.useMutation({
    onSuccess: () => {
      setIsAllowed(true);
      setIsLoading(false);
    },
    onError: () => {
      router.push("/not-found");
      setIsAllowed(false);
      setIsLoading(false);
    },
  });
  //   console.log(role);
  useEffect(() => {
    onCheckHasPerm({ role });
  }, [onCheckHasPerm, role]);

  return { isLoading, isAllowed };
}
