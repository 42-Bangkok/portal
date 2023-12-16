/**
 * This file contains functions for interacting with the comments collection in the database.
 * If the file is marked "use server", every functions here can be called from the client side
 * NEXT will automatically generate the API endpoints for these functions
 *
 * Schema for the comments collection
 * content: content of the comment
 * postId: id of the post the comment belongs to
 * isActive: whether the comment is active or not
 * isAnonymous: whether the comment is anonymous or not (we will still keep the login tho :p) (only allow on creation)
 * createdBy: login of the user who created the marker, login can be changed but for simplicity we will use it instead of user id
 * updatedBy: login of the user who updated the marker, login can be changed but for simplicity we will use it instead of user id
 * createdAt: date when the marker was created
 * updatedAt: date when the marker was updated
 *
 * Usage:
 * - when creating a new comment, call createComment(postId, data)
 * - when updating a comment, call updateComment(id, data)
 * - when deleting a comment, call deleteComment(id)
 * - when getting all comments, call getComments(postId, amt)
 *
 * Features:
 * - isActive
 *  - when creating a comment, isActive is automatically set to true (this cannot be changed during creation)
 *  - when deleting a comment, isActive is set to false, however if user isStaff the comment is deleted
 *  - when getting comments, only active comments are returned
 *
 * - isAnonymous
 *  - when creating a comment, user can choose to be anonymous or not
 *  - if isAnonymous is true, createdBy and updatedBy will be set to "Anonymous" unless user is owner of post
 *  - if isAnonymous is false, createdBy and updatedBy will be set to user.login
 *
 *
 */
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../..//auth/auth-options";
import { getDb } from "../db";
import { ObjectId } from "mongodb";
import z from "zod";
import { SAResponse } from "../types";

export const CreateCommentSchema = z.object({
  content: z.string(),
  isAnonymous: z.boolean().optional(),
});

export const UpdateCommentSchema = z.object({
  content: z.string().optional(),
});

export const CommentSchema = CreateCommentSchema.extend({
  id: z.string(),
  createdBy: z.string(),
  updatedBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type TCreateComment = z.infer<typeof CreateCommentSchema>;
export type TUpdateComment = z.infer<typeof UpdateCommentSchema>;
export type TComment = z.infer<typeof CommentSchema>;

const COLLECTION_NAME = "appforum-comments";

export async function createComment(
  postId: string,
  data: TCreateComment
): Promise<SAResponse<TComment>> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { data: null, error: "not authenticated" };
  }
  const payload = {
    isActive: true,
    postId: postId,
    content: data.content,
    isAnoynomous: data.isAnonymous || false,
    createdBy: session.user.login,
    updatedBy: session.user.login,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const db = await getDb();
  const res = await db.collection(COLLECTION_NAME).insertOne(payload);
  if (!res.acknowledged) {
    return { data: null, error: "failed to create comment" };
  }
  return {
    data: CommentSchema.parse({
      id: res.insertedId.toHexString(),
      content: data.content,
      isAnoyomous: data.isAnonymous || false,
      createdBy: session.user.login,
      updatedBy: session.user.login,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }),
    error: null,
  };
}

export async function getComments(
  postId: string,
  amt: number
): Promise<SAResponse<null> | TComment[]> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { data: null, error: "not authenticated" };
  }
  const db = await getDb();
  const res = await db
    .collection(COLLECTION_NAME)
    .find({ postId: postId, isActive: true })
    .sort({ createdAt: -1 })
    .limit(amt)
    .toArray();
  const comments = res.map((comment) => {
    const _ = CommentSchema.parse({
      id: comment._id.toHexString(),
      content: comment.content,
      isAnoyomous: comment.isAnoynomous,
      createdBy:
        comment.isAnoynomous && !(session.user.login == comment.createdBy)
          ? comment.createdBy
          : "Anonymous",
      updatedBy:
        comment.isAnoynomous && !(session.user.login == comment.createdBy)
          ? comment.updatedBy
          : "Anonymous",
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    });
    return _;
  });
  return comments;
}

export async function deleteComment(id: string): Promise<SAResponse<boolean>> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { data: null, error: "not authenticated" };
  }
  const db = await getDb();
  const comment = await db
    .collection(COLLECTION_NAME)
    .findOne({ _id: new ObjectId(id) });
  if (!comment || (!comment.isActive && !session.user.isStaff)) {
    return { data: null, error: "comment not found" };
  }
  if (!session.user.isStaff && comment.createdBy !== session.user.login) {
    return { data: null, error: "not authorized" };
  }
  if (session.user.isStaff) {
    const res = await db
      .collection(COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(id) });
    if (!res.acknowledged) {
      return { data: null, error: "failed to delete comment" };
    }
  } else {
    const res = await db.collection(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          isActive: false,
          updatedBy: session.user.login,
        },
      }
    );
    if (!res.acknowledged) {
      return { data: null, error: "failed to delete comment" };
    }
  }
  return { data: true, error: null };
}

export async function updateComment(
  id: string,
  data: TUpdateComment
): Promise<SAResponse<TComment>> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { data: null, error: "not authenticated" };
  }
  const db = await getDb();
  const comment = await db
    .collection(COLLECTION_NAME)
    .findOne({ _id: new ObjectId(id), isActive: true });
  if (!comment) {
    return { data: null, error: "comment not found" };
  }
  if (!session.user.isStaff && comment.createdBy !== session.user.login) {
    return { data: null, error: "not authorized" };
  }
  const res = await db.collection(COLLECTION_NAME).updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        content: data.content,
        updatedBy: session.user.login,
        updatedAt: new Date().toISOString(),
      },
    }
  );
  if (!res.acknowledged) {
    return { data: null, error: "failed to update comment" };
  }
  return {
    data: CommentSchema.parse({
      id: id,
      content: data.content,
      createdBy:
        comment.isAnoynomous && !(session.user.login == comment.createdBy)
          ? comment.createdBy
          : "Anonymous",
      updatedBy:
        comment.isAnoynomous && !(session.user.login == comment.createdBy)
          ? comment.updatedBy
          : "Anonymous",
      createdAt: comment.createdAt,
      updatedAt: new Date().toISOString(),
    }),
    error: null,
  };
}
