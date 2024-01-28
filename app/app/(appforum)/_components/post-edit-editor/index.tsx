import { getTags } from "@/lib/db/appforum/tags";
import { PostEditEditor } from "./post-edit-editor";
import { Skeleton } from "@/components/ui/skeleton";
import { getPost } from "@/lib/db/appforum";

export const PostEdit = async (props: { postId: string }) => {
  const { postId } = props;

  // const { data: tags, error: tag_error } = await getTags(100);
  // const { data: post, error } = await getPost(postId);

  const [{ data: tags, error: tag_error }, { data: post, error: post_error }] =
    await Promise.all([getTags(100), getPost(postId)]);

  if (tag_error || post_error) {
    throw tag_error ?? post_error;
  }

  return <PostEditEditor post={post!} tags={tags!} />;
};

PostEdit.skeleton = () => (
  <div className="container space-y-2">
    <Skeleton className="w-full h-[60px]" />
    <Skeleton className="w-full h-[50px]" />
    <Skeleton className="w-full h-[250px]" />
    <div className="flex justify-between w-full">
      <Skeleton className="w-[100px] h-[40px]" />
      <div className="flex space-x-2 ">
        <Skeleton className="w-[100px] h-[40px]" />
        <Skeleton className="w-[100px] h-[40px]" />
      </div>
    </div>
  </div>
);
