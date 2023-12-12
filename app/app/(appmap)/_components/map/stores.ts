/*
 * Stores for map component
 **/

import { TMarker } from "@/lib/db/appmap/schemas";
import { create } from "zustand";
import { FT_BKK_LOC } from "../../constants";

type State = {
  position: [number, number];
  markers: TMarker[];
};

type Action = {
  setPosition: (position: [number, number]) => void;
  setMarkers: (markers: TMarker[]) => void;
};

export const useMapStore = create<State & Action>((set) => ({
  position: FT_BKK_LOC,
  markers: [],
  setPosition: (position) => set({ position }),
  setMarkers: (markers) => set({ markers }),
}));
