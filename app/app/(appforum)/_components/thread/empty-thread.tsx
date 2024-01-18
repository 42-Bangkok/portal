"use client";

import { Card } from "@/components/ui/card";
import { ErrorBird } from "../error-bird";

export function EmptyThread() {
  return (
    <Card className="container w-[800px] items-center justify-center flex flex-col p-10">
      <ErrorBird />
      <h1>Post not found</h1>
    </Card>
  );
}
