"use client";

import { TMarker } from "@/lib/db/appmap/schemas";
import { useMapStore } from "../map/stores";

export const StoreHandler = ({ markers }: { markers: TMarker[] }) => {
  const [setMarkers] = useMapStore((state) => [state.setMarkers]);
  setMarkers(markers);
  return null;
};
