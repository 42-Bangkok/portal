import { Suspense } from "react";
import { Post } from "../../_components/post";
import { CommentBox } from "../../_components/comment";

export default async function PostPage({
  params
}: {
  params: { postId: string };
}) {
  const { postId } = params;
  return (
    <div className="container w-1/2 space-y-2">
      <Suspense fallback={<Post.skeleton />}>
        <Post postId={postId} />
      </Suspense>
      <Suspense fallback={<CommentBox.skeleton />}>
        <CommentBox postId={postId} />
      </Suspense>
    </div>
  );
}
