import { TPost } from "@/app/(appforum)/_actions/schema";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const PostItem = (props: { post: TPost }) => {
  const { post } = props;
  return <></>;
};

PostItem.skeleton = () => (
  <Card className="container p-5 py-10 h-content w-[800px] flex space-x-4">
    <div className="p-4 px-0 items-center">
      <Skeleton className="h-full w-8" />
    </div>
    <div className="space-y-4 flex-grow">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <Skeleton className="w-full h-20" />
    </div>
  </Card>
);
