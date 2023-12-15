import { TMarker } from "@/lib/db/appmap/schemas";

/**
 * Map types
 * @typedef {Object} TMap
 * @property {Array<number>} position - Initial map position in [lat, lng] format
 * @property {number} zoom - Map zoom
 */
export type TMap = {
  initialPosition: [number, number];
  initialZoom: number;
  markers: TMarker[];
};
