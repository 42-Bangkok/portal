"use client";

import Link from "next/link";

import { TPost } from "@/lib/db/appforum";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export const PostItem = (props: { post: TPost }) => {
  const { post } = props;
  return (
    <article className="border-2 border-slate-400 relative p-2 h-fit w-[800px] max-h-28 flex flex-col space-y-1 ">
      <Link
        href={`/forum/${post.id}`}
        className="absolute inset-0"
        slot="post-item"
      />

      <div className="flex flex-col">
        <p className="text-sm">{post.createdBy}</p>
        <p className="text-xs text-gray-500">
          {new Date(post.createdAt).toLocaleString()}
        </p>
      </div>

      <p className="w-full pr-4 font-semibold line-clamp-2 text-md">
        {post.title}
      </p>
      <div className="flex space-x-1">
        {post.tags.map((tag) => (
          <Badge key={tag.id} className="relative text-xs">
            {tag.label}
          </Badge>
        ))}
      </div>
    </article>
  );
};

PostItem.skeleton = () => (
  <Card className="container p-5 py-10 h-content w-[800px] flex space-x-4">
    <div className="items-center p-4 px-0">
      <Skeleton className="w-8 h-full" />
    </div>
    <div className="flex-grow space-y-4">
      <div className="flex items-center space-x-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <Skeleton className="w-full h-20" />
    </div>
  </Card>
);
