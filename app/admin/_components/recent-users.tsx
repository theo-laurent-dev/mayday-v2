import { trpc } from "@/app/_trpc/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export function RecentUsers() {
  const { data: users, isLoading } = trpc.getUsers.useQuery();
  const last5Users = users?.slice(0, 5);

  if (isLoading) {
    return <RecentUsers.Skeleton />;
  }

  return (
    <div className="space-y-10">
      {last5Users?.map((user) => (
        <div key={user.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/02.png" alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="ml-auto font-medium">
            {new Date(user.createdAt).toLocaleDateString("fr")}
          </div>
        </div>
      ))}
    </div>
  );
}

RecentUsers.Skeleton = function RecentUsersSkeleton() {
  return (
    <div className="space-y-10">
      <div className="flex items-center">
        <div>
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
        <div className="ml-4 space-y-1">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-32 h-4" />
        </div>
        <div className="ml-auto">
          <Skeleton className="w-24 h-4" />
        </div>
      </div>
      <div className="flex items-center">
        <div>
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
        <div className="ml-4 space-y-1">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-32 h-4" />
        </div>
        <div className="ml-auto">
          <Skeleton className="w-24 h-4" />
        </div>
      </div>
      <div className="flex items-center">
        <div>
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
        <div className="ml-4 space-y-1">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-32 h-4" />
        </div>
        <div className="ml-auto">
          <Skeleton className="w-24 h-4" />
        </div>
      </div>
      <div className="flex items-center">
        <div>
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
        <div className="ml-4 space-y-1">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-32 h-4" />
        </div>
        <div className="ml-auto">
          <Skeleton className="w-24 h-4" />
        </div>
      </div>
      <div className="flex items-center">
        <div>
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
        <div className="ml-4 space-y-1">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-32 h-4" />
        </div>
        <div className="ml-auto">
          <Skeleton className="w-24 h-4" />
        </div>
      </div>
    </div>
  );
};
