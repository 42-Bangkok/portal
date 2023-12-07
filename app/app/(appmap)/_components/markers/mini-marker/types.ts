/**
 * Type mini marker on a map.
 *
 * @typedef {Object} TMiniMarker
 * @property {Array<number>} position - An array of two numbers representing the latitude and longitude of the marker.
 * @property {string} title - The title of the marker.
 * @property {string} description - The description of the marker.
 */
export type TMiniMarker = {
  position: [number, number]
  title: string
  description: string
}
