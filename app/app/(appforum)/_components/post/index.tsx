import { notFound } from "next/navigation";
import { getPost } from "@/app/(appforum)/_actions/posts";
import { Skeleton } from "@/components/ui/skeleton";
import { PostContent } from "./post-content";

export const Post = async (props: { postId: string }) => {
  const { postId } = props;
  const { data, error } = await getPost(postId);
  if (error) notFound();

  return (
    <>
      <PostContent post={data!} />
      {/* <Skeleton className="w-1/2 h-[600px]" /> */}
    </>
  );
};

Post.skeleton = () => <Skeleton className=" container w-1/2 h-[600px]" />;
