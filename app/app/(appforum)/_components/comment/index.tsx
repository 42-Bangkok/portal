import { getComments } from "@/lib/db/appforum";
import { CommentItem } from "./comment-item";
import { CommentInput } from "./comment-input";

export const CommentBox = async (props: { postId: string }) => {
  const { postId } = props;
  const { data, error } = await getComments(postId, 20);

  if (!!error) throw error;
  return (
    <div className="space-y-2">
      <CommentInput postId={postId} />
      <div className="">
        {data!.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

CommentBox.skeleton = () => (
  <div className="space-y-3">
    {[...Array(3).map((_, i) => <CommentItem.skeleton key={i} />)]}
  </div>
);
