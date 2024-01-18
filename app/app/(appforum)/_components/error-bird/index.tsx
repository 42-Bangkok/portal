"use client";
import { useMouseWindowisLeft } from "@/lib/hooks/mouse-position";
import { cx } from "class-variance-authority";
import { Bird } from "lucide-react";

export const ErrorBird = () => {
  const isLeft = useMouseWindowisLeft();

  return (
    <Bird size={300} className={cx({ "transform -scale-x-100": isLeft })} />
  );
};
