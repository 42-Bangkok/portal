import z from "zod";

// Tag schema

export const TagSchema = z.object({
  id: z.string(),
  label: z
    .string()
    .min(3, "tag need at least 3 letters")
    .max(50, "tag can't be longer than 20 letters")
    .refine((value) => /^[a-zA-Z0-9]+$/.test(value), {
      message: "Tag name can only contain alphanumeric characters."
    }),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const CreateTagSchema = z.object({
  name: z.string()
});

export type TTag = z.infer<typeof TagSchema>;
export type TCreateTag = z.infer<typeof CreateTagSchema>;

// Comment schema
export const CreateCommentSchema = z.object({
  content: z.string(),
  isAnonymous: z.boolean().optional()
});

export const UpdateCommentSchema = z.object({
  content: z.string().optional()
});

export const CommentSchema = CreateCommentSchema.extend({
  id: z.string(),
  createdBy: z.string(),
  updatedBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export type TCreateComment = z.infer<typeof CreateCommentSchema>;
export type TUpdateComment = z.infer<typeof UpdateCommentSchema>;
export type TComment = z.infer<typeof CommentSchema>;

// Post schema
export const CreatePostSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 character long.")
    .max(
      500,
      "Title must be less than 500 characters. This is because I don't want to deal with long titles."
    ),
  content: z.string().min(1, "Post must have content. Please write something."),
  tags: z.array(TagSchema),
  isAnonymous: z.boolean()
});

export const UpdatePostSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  tags: z.array(TagSchema)
});

export const PostSchema = CreatePostSchema.extend({
  upvotes: z.array(z.string()),
  featured: z.boolean(),
  id: z.string(),
  isActive: z.boolean(),
  createdBy: z.string(),
  updatedBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export type TPostCollection = Omit<TPost, "id">;
export type TPostOut = Omit<TPost, "isAnonymous" | "isActive">;
export type TPost = z.infer<typeof PostSchema>;
export type TCreatePost = z.infer<typeof CreatePostSchema>;
export type TUpdatePost = z.infer<typeof UpdatePostSchema>;
