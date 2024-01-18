"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ErrorBird } from "./_components/error-bird";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();
  return (
    <Card className="container p-4 px-10 w-fit">
      <CardContent className="flex flex-col items-center justify-center ">
        <h1 className="text-6xl font-bold">404</h1>
        <ErrorBird />
        <h2 className="text-xl font-bold">Chip Chip where're you going ?</h2>
      </CardContent>
      <CardFooter className="flex justify-between w-full">
        <Link href="/forum">
          <Button>Home</Button>
        </Link>
        <Button onClick={() => router.back()}>Back</Button>
      </CardFooter>
    </Card>
  );
}
