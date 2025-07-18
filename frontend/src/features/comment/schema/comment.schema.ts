import { z } from "zod";

export const commentCreateSchema = z.object({
  content: z.string().min(1),
});

export const commentUpdateSchema = z
  .object({
    oldContent: z.string(),
    content: z.string().min(1),
  })
  .refine((data) => data.oldContent !== data.content);

export type TypeCommentCreateSchema = z.infer<typeof commentCreateSchema>;
export type TypeCommentUpdateSchema = z.infer<typeof commentUpdateSchema>;
