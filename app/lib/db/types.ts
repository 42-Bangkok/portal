export type SAResponse<T> =
  | { data: T; error: null }
  | { data: null; error: string };

export type TPagination<T> = {
  items: T[];
  total_page: number;
};
