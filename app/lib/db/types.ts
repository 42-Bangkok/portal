export type SVAResponse<T> =
  | { data: T; error: null }
  | { data: null; error: string };
