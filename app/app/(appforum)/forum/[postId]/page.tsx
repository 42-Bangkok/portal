import { Suspense } from "react";
import { Post } from "../../_components/post";

export default async function PostPage({
  params
}: {
  params: { postId: string };
}) {
  const { postId } = params;
  return (
    <Suspense fallback={<Post.skeleton />}>
      <Post postId={postId} />
    </Suspense>
  );
}
