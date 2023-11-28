/**
* Schemas for the appmap collection
* tite: title of the marker
* description: description of the marker
* lat: latitude of the marker
* lng: longitude of the marker
* featured: whether the marker is featured or not, only staff can feature markers
* createdBy: login of the user who created the marker
* updatedBy: login of the user who updated the marker
* createdAt: date when the marker was created
* updatedAt: date when the marker was updated
* _id: id of the marker
*/

import z from 'zod';

export const CreateMarkerSchema = z.object({
  title: z.string(),
  description: z.string(),
  lat: z.number().refine(value => value >= -90 && value <= 90, {
    message: "Latitude must be between -90 and 90",
  }),
  lng: z.number().refine(value => value >= -180 && value <= 180, {
    message: "Longitude must be between -180 and 180",
  }),
  featured: z.boolean(),
  createdBy: z.string(),
})

export const UpdateMarkerSchema = z.object({
  _id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  lat: z.number().refine(value => value >= -90 && value <= 90, {
    message: "Latitude must be between -90 and 90",
  }).optional(),
  lng: z.number().refine(value => value >= -180 && value <= 180, {
    message: "Longitude must be between -180 and 180",
  }).optional(),
  featured: z.boolean().optional(),
  updatedBy: z.string(),
})

export const DeleteMarkerSchema = z.object({
  _id: z.string(),
})

export const MarkerSchema = CreateMarkerSchema.extend({
  _id: z.string(),
  updatedBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type TNewMarker = z.infer<typeof CreateMarkerSchema>
export type TUpdateMarker = z.infer<typeof UpdateMarkerSchema>
export type TDeleteMarker = z.infer<typeof DeleteMarkerSchema>
export type TMarker = z.infer<typeof MarkerSchema>
