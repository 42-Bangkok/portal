"use server";

import { SVAResponse } from "../types";
import { TNewMarker, CreateMarkerSchema } from "./schemas";

export async function createMarker(
  data: TNewMarker
): Promise<SVAResponse<boolean>> {
  const parsed = CreateMarkerSchema.parse(data);
  console.log(parsed);
  return { data: true, error: null };
  return { data: null, error: "test error" };
}
