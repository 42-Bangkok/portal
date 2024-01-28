/**
 * This file contains functions for interacting with the tags collection in the database.
 * If the file is marked "use server", every functions here can be called from the client side
 * NEXT will automatically generate the API endpoints for these functions
 *
 * Schema for the tags collection
 * label: label of the tag
 * - label must be unique
 * - label must be at least 3 characters long
 * - label must be less than 50 characters long
 * - label must only be alphanumeric characters
 * createdBy: login of the user who created the tag, login can be changed but for simplicity we will use it instead of user id
 * updatedBy: login of the user who updated the tag, login can be changed but for simplicity we will use it instead of user id
 * createdAt: date when the tag was created
 * updatedAt: date when the tag was updated
 *
 * Usage:
 * - when creating a new tag, call createTag(data)
 * - when deleting a tag, call deleteTag(id)
 * - when getting all tags, call getTags(amt)
 */
"use server";

import { auth } from "@/auth";
import { getDb } from "@/lib/db/db";
import { ObjectId } from "mongodb";
import { SAResponse } from "@/lib/db/types";
import { CreateTagSchema, TagSchema, TCreateTag, TTag } from "./schema";

const COLLECTION_NAME = "appforum-tags";

export async function createTag(data: TCreateTag): Promise<SAResponse<TTag>> {
  if (!CreateTagSchema.safeParse(data).success) {
    return { data: null, error: "invalid tag data" };
  }

  const session = await auth();
  if (!session) {
    return { data: null, error: "not authenticated" };
  }
  // check if tag with same name already exists
  const db = await getDb();
  const tag = await db.collection(COLLECTION_NAME).findOne({ name: data.name });
  if (tag) {
    return { data: null, error: "tag already exists" };
  }

  const payload = {
    title: data.name,
    createdBy: session.user.login,
    updatedBy: session.user.login,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  const res = await db.collection(COLLECTION_NAME).insertOne(payload);

  if (!res.acknowledged) {
    return { data: null, error: "failed to create tag" };
  }

  return {
    data: TagSchema.parse({
      id: res.insertedId.toHexString(),
      title: data.name,
      createdBy: session.user.login,
      updatedBy: session.user.login,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }),
    error: null
  };
}

export async function deleteTag(id: string): Promise<SAResponse<boolean>> {
  const session = await auth();
  if (!session) {
    return { data: null, error: "not authenticated" };
  }

  const db = await getDb();
  const res = await db
    .collection(COLLECTION_NAME)
    .deleteOne({ _id: new ObjectId(id) });

  if (!res.acknowledged) {
    return { data: null, error: "failed to delete tag" };
  }

  return { data: true, error: null };
}

export async function getTags(amt: number): Promise<SAResponse<TTag[]>> {
  const db = await getDb();
  const tags = await db
    .collection(COLLECTION_NAME)
    .find({})
    .limit(amt)
    .toArray();

  return {
    data: tags.map((tag) =>
      TagSchema.parse({
        id: tag._id.toHexString(),
        title: tag.title,
        createdBy: tag.createdBy,
        updatedBy: tag.updatedBy,
        createdAt: tag.createdAt,
        updatedAt: tag.updatedAt
      })
    ),
    error: null
  };
}
