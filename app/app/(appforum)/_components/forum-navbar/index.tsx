import Link from "next/link";
import { ForumSearchBar } from "./forum-searchbar";
import { Button } from "@/components/ui/button";
import { HomeIcon, List } from "lucide-react";
import { APPFORUM_VERSION } from "@/version";

export const ForumNavBar = () => {
  return (
    <div className="flex justify-between gap-3 p-2 m-0 shadow">
      <Link href="/">
        <Button size={"icon"} variant={"ghost"}>
          <HomeIcon />
        </Button>
      </Link>
      <div className="flex gap-2">
        <Link href="/forum">
          <Button size={"icon"} variant={"ghost"}>
            <HomeIcon />
          </Button>
        </Link>
        <ForumSearchBar />
      </div>
      <Link href="/forum/create">
        <Button>Create Post</Button>
      </Link>
      <p className="fixed bottom-0 right-0 p-1 text-xs text-slate-500">
        v{APPFORUM_VERSION}
      </p>
    </div>
  );
};
