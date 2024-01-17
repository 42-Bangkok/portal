import Link from "next/link";
import { ForumSearchBar } from "./forum-searchbar";
import { Button } from "@/components/ui/button";

export const ForumNavBar = () => {
  return (
    <div className="flex justify-center p-2 m-0 shadow gap-3">
      <ForumSearchBar />
      <Link href="/forum/create">
        <Button>Create Post</Button>
      </Link>
    </div>
  );
};
