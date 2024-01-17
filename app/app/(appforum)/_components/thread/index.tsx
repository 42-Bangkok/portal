import { getPagePosts, getPosts } from "@/app/(appforum)/_actions/posts";
import { PostPagination } from "./thread-pagination";
import { PostItem } from "./post-item";
import { redirect } from "next/navigation";

export const Thread = async (props: { page: number; search: string }) => {
  const { page, search } = props;
  const { data, error } = await getPagePosts(search, 20, page);

  if (!!error) throw error;

  if (data!.total_page < page && data!.total_page !== 0)
    redirect(`/forum?page=${data!.total_page}`);

  return <PostPagination {...data!} page={page} search={search} />;
};

Thread.skeleton = (props: { amt?: number }) => {
  const { amt = 3 } = props;
  return (
    <div className="space-y-3">
      {[...Array(amt).map((_, i) => <PostItem.skeleton key={i} />)]}
    </div>
  );
};
