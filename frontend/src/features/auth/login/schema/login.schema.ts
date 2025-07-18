import { z } from 'zod'

export const loginAccountSchema = z.object({
	login: z.string().min(1),
	password: z.string().min(6),
})

export type TypeLoginAccountSchema = z.infer<typeof loginAccountSchema>
