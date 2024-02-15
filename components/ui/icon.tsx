"use client";
import { LucideProps, icons } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconProps extends LucideProps {}

const Icon = ({ name, color, className }: IconProps) => {
  if (name === undefined) return <></>;
  const LucideIcon = icons[name];

  return <LucideIcon color={color} className={cn("w-4 h-4", className)} />;
};

export default Icon;
