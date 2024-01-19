/**
 * This file contains functions for interacting with the posts collection in the database.
 * If the file is marked "use server", every functions here can be called from the client side
 * NEXT will automatically generate the API endpoints for these functions
 *
 * Schema for the posts collection
 * title: title of the post
 * content: content of the post
 * tags: ids of the tags associated with the post
 * isActive: whether the post is active or not (post can only be truely deleted by staff)
 * isAnoynomous: whether the post is anonymous or not (we will still keep the login tho :p) (only allow on creation)
 * featured: whether the post is featured or not, only staff can feature posts
 * createdBy: login of the user who created the marker, login can be changed but for simplicity we will use it instead of user id
 * updatedBy: login of the user who updated the marker, login can be changed but for simplicity we will use it instead of user id
 * createdAt: date when the marker was created
 * updatedAt: date when the marker was updated
 *
 *
 * Usage:
 * - when creating a new post, call createPost(data)
 * - when updating a post, call updatePost(id, data)
 * - when deleting a post, call deletePost(id)
 * - when getting a post, call getPost(id)
 * - when getting all posts, call getPosts(amt)
 *
 * Features:
 * - isActive
 *  - when creating a post, isActive is automatically set to true (this cannot be changed during creation)
 *  - when deleting a post, isActive is set to false, however if user isStaff the post is deleted
 *  - when getting posts, only active posts are returned
 *
 * - isAnonymous
 *  - when creating a post, user can choose to be anonymous or not
 *  - if isAnonymous is true, createdBy and updatedBy will be set to "Anonymous" unless user is owner of post
 *  - if isAnonymous is false, createdBy and updatedBy will be set to user.login
 *
 *  TODO: add search by title
 *  TODO: add search by tags
 */
"use server";

import { auth } from "@/auth";
import { getDb } from "@/lib/db/db";
import { ObjectId } from "mongodb";
import { SAResponse, TPagination } from "@/lib/db/types";
import { TCreatePost, TPost, TUpdatePost } from "./schema";
import { redirect } from "next/navigation";

const COLLECTION_NAME = "appforum-posts";

export async function createPost(
  data: TCreatePost
): Promise<SAResponse<boolean>> {
  const session = await auth();
  if (!session) {
    return { data: null, error: "not authenticated" };
  }
  // TODO: validate tags
  const payload = {
    isActive: true,
    title: data.title,
    content: data.content,
    tags: data.tags,
    isAnoynomous: data.isAnonymous || false,
    createdBy: session.user.login,
    updatedBy: session.user.login,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  const db = await getDb();
  const res = await db.collection(COLLECTION_NAME).insertOne(payload);
  if (!res.acknowledged) {
    return { data: null, error: "failed to create post" };
  }
  const postHexId = res.insertedId.toHexString();
  redirect(`/forum/${postHexId}`);
}

export async function getPost(id: string): Promise<SAResponse<TPost>> {
  const session = await auth();
  if (!session) {
    return { data: null, error: "not authenticated" };
  }

  if (ObjectId.isValid(id) === false) {
    return { data: null, error: "invalid id" };
  }

  const db = await getDb();
  const res = await db
    .collection(COLLECTION_NAME)
    .findOne({ _id: new ObjectId(id), isActive: true });
  if (!res) {
    return { data: null, error: "post not found" };
  }
  return {
    data: {
      id: res._id.toHexString(),
      title: res.title,
      content: res.content,
      tags: res.tags,
      createdBy:
        !res.isAnoynomous || !(session.user.login == res.createdBy)
          ? res.createdBy
          : "Anonymous",
      updatedBy:
        !res.isAnoynomous || !(session.user.login == res.createdBy)
          ? res.updatedBy
          : "Anonymous",
      createdAt: res.createdAt,
      updatedAt: res.updatedAt
    },
    error: null
  };
}

export async function getPagePosts(
  title: string,
  amt: number,
  page: number
): Promise<SAResponse<null | TPagination<TPost>>> {
  const session = await auth();
  if (!session) {
    return { data: null, error: "not authenticated" };
  }
  const db = await getDb();
  page -= 1;
  const res = await db
    .collection(COLLECTION_NAME)
    .find({ isActive: true, title: { $regex: title, $options: "si" } })
    .sort({ createdAt: -1 })
    .skip(amt * page)
    .limit(amt)
    .toArray();
  const posts = res.map((post) => {
    return {
      id: post._id.toHexString(),
      title: post.title,
      content: post.content,
      tags: post.tags,
      createdBy:
        !post.isAnoynomous || !(session.user.login === post.createdBy)
          ? post.createdBy
          : "Anonymous",
      updatedBy:
        !post.isAnoynomous || !(session.user.login === post.createdBy)
          ? post.updatedBy
          : "Anonymous",
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    };
  });

  const total_page = Math.ceil(
    (await db.collection(COLLECTION_NAME).countDocuments()) / amt
  );
  return {
    data: {
      items: posts,
      total_page
    },
    error: null
  };
}

// export async function getPagePosts(
//   amt: number,
//   page: number
// ): Promise<SAResponse<null | TPagination<TPost>>> {
//   const session = await auth();
//   if (!session) {
//     return { data: null, error: "not authenticated" };
//   }
//   const db = await getDb();
//   const res = await db
//     .collection(COLLECTION_NAME)
//     .find({ isActive: true })
//     .sort({ createdAt: -1 })
//     .skip(amt * page)
//     .limit(amt)
//     .toArray();
//   const posts = res.map((post) => {
//     return {
//       id: post._id.toHexString(),
//       title: post.title,
//       content: post.content,
//       tags: post.tags,
//       isAnonymous: post.isAnonymous || false,
//       createdBy:
//         post.isAnoynomous && !(session.user.login == post.createdBy)
//           ? post.createdBy
//           : "Anonymous",
//       updatedBy:
//         post.isAnoynomous && !(session.user.login == post.createdBy)
//           ? post.updatedBy
//           : "Anonymous",
//       createdAt: post.createdAt,
//       updatedAt: post.updatedAt
//     };
//   });

//   const total_page = (await db.collection(COLLECTION_NAME).countDocuments()) / amt;

//   return {
//     data: {
//       items: posts,
//       total_page
//     },
//     error: null
//   };
// }

export async function getPosts(
  amt: number
): Promise<SAResponse<null | TPagination<TPost>>> {
  const session = await auth();
  if (!session) {
    return { data: null, error: "not authenticated" };
  }
  const db = await getDb();
  const res = await db
    .collection(COLLECTION_NAME)
    .find({ isActive: true })
    .sort({ createdAt: -1 })
    .limit(amt)
    .toArray();

  const posts = res.map((post) => {
    return {
      id: post._id.toHexString(),
      title: post.title,
      content: post.content,
      tags: post.tags,
      createdBy:
        !post.isAnoynomous || !(session.user.login === post.createdBy)
          ? post.createdBy
          : "Anonymous",
      updatedBy:
        !post.isAnoynomous || !(session.user.login === post.createdBy)
          ? post.updatedBy
          : "Anonymous",
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    };
  });

  const total_page = Math.ceil(
    (await db.collection(COLLECTION_NAME).countDocuments()) / amt
  );

  return {
    data: {
      items: posts,
      total_page
    },
    error: null
  };
}

export async function deletePost(id: string): Promise<SAResponse<boolean>> {
  const session = await auth();
  if (!session) {
    return { data: null, error: "not authenticated" };
  }
  if (ObjectId.isValid(id) === false) {
    return { data: null, error: "invalid id" };
  }
  const db = await getDb();
  const post = await db
    .collection(COLLECTION_NAME)
    .findOne({ _id: new ObjectId(id) });
  if (!post || (!post.isActive && !session.user.isStaff)) {
    return { data: null, error: "post not found" };
  }
  if (!session.user.isStaff && post.createdBy !== session.user.login) {
    return { data: null, error: "not authorized" };
  }
  if (session.user.isStaff) {
    const res = await db
      .collection(COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(id) });
    if (!res.acknowledged) {
      return { data: null, error: "failed to delete post" };
    }
  } else {
    const res = await db
      .collection(COLLECTION_NAME)
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { isActive: false, updatedBy: session.user.login } }
      );
    if (!res.acknowledged) {
      return { data: null, error: "failed to delete post" };
    }
  }
  return { data: true, error: null };
}

export async function updatePost(
  id: string,
  data: TUpdatePost
): Promise<SAResponse<TPost>> {
  const session = await auth();
  if (!session) {
    return { data: null, error: "not authenticated" };
  }
  const db = await getDb();
  const post = await db
    .collection(COLLECTION_NAME)
    .findOne({ _id: new ObjectId(id) });
  if (!post) {
    return { data: null, error: "post not found" };
  }
  if (!session.user.isStaff && post.createdBy !== session.user.login) {
    return { data: null, error: "not authorized" };
  }
  // TODO: validate tags

  const payload = {
    title: data.title,
    content: data.content,
    tags: data.tags,
    updatedBy: session.user.login,
    updatedAt: new Date().toISOString()
  };
  const res = await db
    .collection(COLLECTION_NAME)
    .updateOne({ _id: new ObjectId(id) }, { $set: payload });
  if (!res.acknowledged) {
    return { data: null, error: "failed to update post" };
  }
  return {
    data: {
      id: id,
      title: data.title as string,
      content: data.content as string,
      tags: data.tags as string[],
      createdBy:
        !post.isAnoynomous || !(session.user.login === post.createdBy)
          ? post.createdBy
          : "Anonymous",
      updatedBy:
        !post.isAnoynomous || !(session.user.login === post.createdBy)
          ? post.updatedBy
          : "Anonymous",
      createdAt: post.createdAt,
      updatedAt: new Date().toISOString()
    },
    error: null
  };
}
