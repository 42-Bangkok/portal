"use client";
import MDEditor from "@uiw/react-md-editor";

import { TPost } from "@/lib/db/appforum";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const PostContent = (props: { post: TPost }) => {
  const { post } = props;

  return (
    <Card className="container flex flex-col justify-center w-1/2 gap-6 p-4">
      <h1 className="text-4xl font-bold text-center">{post.title}</h1>
      {post.tags.map((tag) => (
        <Badge key={tag.id} className="text-xs w-fit">
          {tag.label}
        </Badge>
      ))}
      <MDEditor.Markdown source={post.content} className="truncate" />
    </Card>
  );
};
