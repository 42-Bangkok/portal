import z from "zod";

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
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
  isAnonymous: z.boolean().optional()
});

export const UpdatePostSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  tags: z.array(z.string()).optional()
});

export const PostSchema = CreatePostSchema.extend({
  id: z.string(),
  createdBy: z.string(),
  updatedBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export type TCreatePost = z.infer<typeof CreatePostSchema>;
export type TUpdatePost = z.infer<typeof UpdatePostSchema>;
export type TPost = z.infer<typeof PostSchema>;
