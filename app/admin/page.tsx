"use client";

import { HasPermissionShield } from "@/app/_components/HasPermissionShield";

function Dashboard() {
  return (
    <HasPermissionShield required="admin.view">
      <main className="p-3">
        <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
      </main>
    </HasPermissionShield>
  );
}

export default Dashboard;
