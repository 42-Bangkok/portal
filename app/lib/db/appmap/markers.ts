"use server";

import { getServerSession } from "next-auth";
import { SAResponse } from "../types";
import {
  CreateMarkerSchema,
  MarkerSchema,
  TCreateMarker,
  TMarker,
} from "./schemas";
import { authOptions } from "@/lib/auth/auth-options";
import { getDb } from "../db";
import { revalidatePath } from "next/cache";

export async function createMarker(
  data: TCreateMarker
): Promise<SAResponse<TMarker>> {
  const parsed = CreateMarkerSchema.safeParse(data);
  if (!parsed.success) {
    return { data: null, error: "invalid data" };
  }
  const session = await getServerSession(authOptions);
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
  revalidatePath("/map");
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
