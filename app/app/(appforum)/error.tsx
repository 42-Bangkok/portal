"use client";

import { Button } from "@/components/ui/button";
import { EmptyThread } from "./_components/thread/empty-thread";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ErrorBird } from "./_components/error-bird";
import Link from "next/link";

export default function NotFound({ error, reset }: { error: any; reset: any }) {
  console.log(error);
  return (
    <Card className="container p-4 px-10 w-fit">
      <CardContent className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-3xl font-bold">
          Good job you cause an <span className="text-red-600">Error</span>
        </h1>
        <h1 className="text-3xl font-bold">Please open an issue on</h1>
        <Link href={"https://github.com/42-Bangkok/portal/issues"}>
          <h2 className="text-3xl font-bold hover:text-gray-400">Github</h2>
        </Link>
        <span className="rounded-xl p-4 text-red-600 text-md  border-zinc-400 border-2 w-[500px]">
          {error.stack}
        </span>
        <ErrorBird />
      </CardContent>
      <CardFooter className="flex justify-between w-full ">
        <Link href="/forum">
          <Button>Home</Button>
        </Link>
        <Button onClick={() => reset()} className="w-content">
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
}
