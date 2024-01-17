"use client";

import { Card } from "@/components/ui/card";
import { cx } from "class-variance-authority";
import { Bird } from "lucide-react";
import React from "react";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = React.useState({
    x: 0,
    y: 0
  });
  React.useEffect(() => {
    const updateMousePosition = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);
  return mousePosition;
};

export function EmptyThread() {
  const [isLeft, setIsLeft] = React.useState(false);
  const coords = useMousePosition();

  React.useEffect(() => {
    if (coords.x < window.innerWidth / 2) {
      setIsLeft(true);
    } else {
      setIsLeft(false);
    }
  }, [coords]);

  return (
    <Card className="container w-[800px] items-center justify-center flex flex-col p-10">
      <Bird size={300} className={cx({ "transform -scale-x-100": isLeft })} />
      <h1>Post not found</h1>
    </Card>
  );
}
