import { Suspense } from "react";
import { Thread } from "../_components/thread";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ForumPage({
  params,
  searchParams
}: {
  params: any;
  searchParams: { page: string; search: string };
}) {
  const { page = "1", search = "" } = searchParams;
  const page_number = Number(page);

  if (isNaN(page_number) || page_number < 1) redirect("/forum");

  return (
    <>
      <Suspense fallback={<Thread.skeleton />}>
        <Thread page={page_number} search={search} />
      </Suspense>
    </>
  );
}
