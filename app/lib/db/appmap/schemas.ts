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
  createdBy: z.string(),
})

export const UpdateMarkerSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  lat: z.number().refine(value => value >= -90 && value <= 90, {
    message: "Latitude must be between -90 and 90",
  }),
  lng: z.number().refine(value => value >= -180 && value <= 180, {
    message: "Longitude must be between -180 and 180",
  }),
  updatedBy: z.string(),
})

export const DeleteMarkerSchema = z.object({
  id: z.string(),
})

export const MarkerSchema = CreateMarkerSchema.extend({
  id: z.string(),
  updatedBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type TNewMarker = z.infer<typeof CreateMarkerSchema>
export type TUpdateMarker = z.infer<typeof UpdateMarkerSchema>
export type TDeleteMarker = z.infer<typeof DeleteMarkerSchema>
export type TMarker = z.infer<typeof MarkerSchema>
