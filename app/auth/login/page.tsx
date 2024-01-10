"use client";

import LoginForm from "@/app/auth/login/_components/form";

export default function LoginPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="p-4 space-y-8">
        <LoginForm />
      </div>
    </div>
  );
}
