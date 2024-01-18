import Link from "next/link";
import { ForumSearchBar } from "./forum-searchbar";
import { Button } from "@/components/ui/button";
import { HomeIcon, List } from "lucide-react";

export const ForumNavBar = () => {
  return (
    <div className="flex justify-center gap-3 p-2 m-0 shadow">
      <Link href="/">
        <Button size={"icon"} variant={"ghost"}>
          <HomeIcon />
        </Button>
      </Link>
      <ForumSearchBar />
      <Link href="/forum/create">
        <Button>Create Post</Button>
      </Link>
    </div>
  );
};
