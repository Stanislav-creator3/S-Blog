import { z } from "zod";

export const postSchema = z.object({
    id: z.string().uuid(),
    title: z.string(),
    content: z.string(),
    imageUrl: z.string().url().optional(),
    viewsCount: z.number(),
    tags: z.string().array(),
    user: z.any(),
    createdAt: z.date(),
    updatedAt: z.date()
  })