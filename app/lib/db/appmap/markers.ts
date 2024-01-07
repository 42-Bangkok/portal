/**
 * This file contains server actions for managing markers
 * If the file is marked "use server", every functions here can be called from the client side
 * NEXT will automatically generate the API endpoints for these functions
 */
"use server";

import { SAResponse } from "../types";
import {
  CreateMarkerSchema,
  MarkerSchema,
  TCreateMarker,
  TMarker,
} from "./schemas";
import { getDb } from "../db";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { auth } from "@/auth";

export async function createMarker(
  data: TCreateMarker
): Promise<SAResponse<TMarker>> {
  const parsed = CreateMarkerSchema.safeParse(data);
  if (!parsed.success) {
    return { data: null, error: "invalid data" };
  }
  const session = await auth();
  if (!session) {
    return { data: null, error: "not authenticated" };
  }
  const payload = {
    title: parsed.data.title,
    description: parsed.data.description,
    position: {
      type: "Point",
      coordinates: [parsed.data.lng, parsed.data.lat],
    },
    createdBy: session.user.login,
    updatedBy: session.user.login,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const db = await getDb();
  const res = await db.collection("markers").insertOne(payload);
  if (!res.acknowledged) {
    return { data: null, error: "failed to create marker" };
  }
  revalidatePath("/map", "page");
  return {
    data: MarkerSchema.parse({
      id: res.insertedId.toHexString(),
      title: parsed.data.title,
      description: parsed.data.description,
      lat: parsed.data.lat,
      lng: parsed.data.lng,
      featured: false,
      createdBy: session.user.login,
      updatedBy: session.user.login,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }),
    error: null,
  };
}

export async function getMarkers(amt: number): Promise<TMarker[]> {
  const db = await getDb();
  const res = await db
    .collection("markers")
    .find()
    .sort({ createdAt: -1 })
    .limit(amt)
    .toArray();
  const markers = res.map((marker) => {
    const _ = MarkerSchema.parse({
      id: marker._id.toHexString(),
      title: marker.title,
      description: marker.description,
      lat: marker.position.coordinates[1] as number,
      lng: marker.position.coordinates[0] as number,
      featured: marker.featured,
      createdBy: marker.createdBy,
      updatedBy: marker.updatedBy,
      createdAt: marker.createdAt,
      updatedAt: marker.updatedAt,
    });
    return _;
  });
  return markers;
}

export async function deleteMarker(id: string): Promise<SAResponse<boolean>> {
  const session = await auth();
  if (!session) {
    return { data: null, error: "not authenticated" };
  }
  const db = await getDb();
  const marker = await db
    .collection("markers")
    .findOne({ _id: new ObjectId(id) });
  if (!marker) {
    return { data: null, error: "marker not found" };
  }
  if (!session.user.isStaff && marker.createdBy !== session.user.login) {
    return { data: null, error: "not authorized" };
  }
  const res = await db
    .collection("markers")
    .deleteOne({ _id: new ObjectId(id) });
  if (!res.acknowledged) {
    return { data: null, error: "failed to delete marker" };
  }
  revalidatePath("/map", "page");
  return { data: true, error: null } as SAResponse<boolean>;
}
