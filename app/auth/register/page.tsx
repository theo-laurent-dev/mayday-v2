"use client";

import RegisterForm from "@/app/auth/register/_components/form";

export default function RegisterPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="p-4 space-y-8">
        <RegisterForm />
      </div>
    </div>
  );
}
