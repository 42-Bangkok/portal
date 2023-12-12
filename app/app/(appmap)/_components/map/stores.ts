import { TMarker } from "@/lib/db/appmap/schemas";
import { create } from "zustand";

type State = {
  position: [number, number];
  markers: TMarker[];
};

type Action = {
  setPosition: (position: [number, number]) => void;
  setMarkers: (markers: TMarker[]) => void;
};

export const useMapStore = create<State & Action>((set) => ({
  position: [13.7275902, 100.7783393],
  markers: [],
  setPosition: (position) => set({ position }),
  setMarkers: (markers) => set({ markers }),
}));
