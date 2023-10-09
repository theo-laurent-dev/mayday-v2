"use client";

import { useState } from "react";
import LoginForm from "@/app/_components/login/login";
import RegisterForm from "@/app/_components/register/register";

export default function Home() {
  const [form, setForm] = useState("login");

  return (
    <div className="py-4 space-y-8">
      {form === "login" && <LoginForm setForm={setForm} />}
      {form === "register" && <RegisterForm setForm={setForm} />}
    </div>
  );
}
