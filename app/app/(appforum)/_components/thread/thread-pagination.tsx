"use client";
import { TPost } from "@/app/(appforum)/_actions/schema";
import { TPagination } from "@/lib/db/types";
import { PostItem } from "./post-item";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import React from "react";
import { cx } from "class-variance-authority";
import { EmptyThread } from "./empty-thread";

function calculatePagination(page: number, total_page: number) {
  const start = Math.max(1, page - 1);
  const end = Math.min(page + 1, total_page);

  return { start, end };
}

export const PostPagination = (
  props: TPagination<TPost> & { page: number; search: string }
) => {
  const { items, total_page, page, search } = props;

  const { start, end } = React.useMemo(
    () => calculatePagination(page, total_page),
    [page, total_page]
  );

  // if (items.length === 0) return <EmptyThread />;

  const pageNumbers = [page - 1, page, page + 1].filter(
    (value) => value > 0 && value <= total_page
  );

  return (
    <>
      <div className="container">
        {items.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          {
            <PaginationPrevious
              href={`/forum?page=${page - 1}&search=${search}`}
            />
          }
          {pageNumbers.map((pg) => (
            <PaginationLink
              key={pg}
              href={`/forum?page=${pg}&search=${search}`}
              isActive={pg === page}
            >
              {pg}
            </PaginationLink>
          ))}

          {page > 1 && total_page > 3 && (
            <>
              <PaginationEllipsis />
              <PaginationLink
                href={`/forum?page=${total_page}&search=${search}`}
              >
                {total_page}
              </PaginationLink>
            </>
          )}
          {<PaginationNext href={`/forum?page=${page + 1}&search=${search}`} />}
        </PaginationContent>
      </Pagination>
    </>
  );
};
