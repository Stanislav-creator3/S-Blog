import { z } from "zod";

export const socialSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  url: z.string().url(),
});

export const socialFormSchema = socialSchema.omit({ id: true });

export type TypeSocialFormSchema = z.infer<typeof socialFormSchema>;

export type TypeSocialSchema = z.infer<typeof socialSchema>;
