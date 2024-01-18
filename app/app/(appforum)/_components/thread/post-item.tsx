"use client";
import { TPost } from "@/app/(appforum)/_actions/schema";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import MDEditor from "@uiw/react-md-editor";

export const PostItem = (props: { post: TPost }) => {
  const { post } = props;
  return (
    <Card className="container p-5 py-10 h-fit w-[800px] flex space-x-4">
      <div className="items-center p-4 px-0">
        <Skeleton className="w-8 h-full" />
      </div>
      <Link href={`/forum/${post.id}`}>
        <div className="flex-grow space-y-4">
          <div className="flex items-center space-x-4">
            <div>
              <p>{post.createdBy}</p>
              <p className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <p className="text-xl text-ellipsis ">{post.title}</p>
        </div>
      </Link>
    </Card>
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
