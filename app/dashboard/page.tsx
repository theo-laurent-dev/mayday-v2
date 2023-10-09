import getCurrentUser from "../_actions/getCurrentUser";

export default async function Dashboard() {
  const user = await getCurrentUser();

  return (
    <div className="py-4 space-y-8">
      <div>
        <h1 className="font-bold text-3xl">Dashboard</h1>
        <span className="text-gray-400">Bienvenue, {user?.name}.</span>
      </div>
    </div>
  );
}
