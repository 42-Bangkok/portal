import { getTags } from "@/lib/db/appforum/tags";
import { PostCreateEditor } from "./post-editor";
import { Skeleton } from "@/components/ui/skeleton";

export const PostEditor = async () => {
  const { data, error } = await getTags(100);

  if (error) throw error;

  return <PostCreateEditor tags={data!} />;
};

PostEditor.skeleton = () => (
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
