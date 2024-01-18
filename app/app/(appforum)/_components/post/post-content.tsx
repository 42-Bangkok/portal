"use client";
import MDEditor from "@uiw/react-md-editor";

import { TPost } from "@/app/(appforum)/_actions/schema";
import { Card } from "@/components/ui/card";

export const PostContent = (props: { post: TPost }) => {
  const { post } = props;

  return (
    <Card className="container flex flex-col justify-center w-1/2 gap-6 p-4">
      <h1 className="text-4xl font-bold text-center">{post.title}</h1>
      <MDEditor.Markdown source={post.content} className="truncate" />
    </Card>
  );
};
