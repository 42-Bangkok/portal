import { Skeleton } from "@/components/ui/skeleton";
import { TComment } from "@/lib/db/appforum";

export const CommentItem = (props: { comment: TComment }) => {
  const { comment } = props;
  return (
    <div className="overflow-hidden shadow ">
      <div className="px-2 py-3 sm:px-6">
        <p className="text-xs font-medium text-gray-900">{comment.createdBy}</p>
        <p className="text-xs font-medium text-gray-400">
          {new Date(comment.createdAt).toLocaleString()}
        </p>
        <p className="max-w-2xl mt-1 text-sm text-gray-500">
          {comment.content}
        </p>
      </div>
    </div>
  );
};

CommentItem.skeleton = () => (
  <div className="shadow overflow-hidde sm:rounded-lg">
    <div className="px-4 py-5 space-y-1 sm:px-6">
      <Skeleton className="w-24 h-4" />
      <Skeleton className="w-40 h-4" />
      <Skeleton className="w-full h-12" />
    </div>
  </div>
);
