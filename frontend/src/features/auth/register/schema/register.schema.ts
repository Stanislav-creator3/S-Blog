import { z } from 'zod'

export const registerSchema = z.object({
	email: z.string().email(),
	username: z
		.string()
		.min(1)
		.regex(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/),
	password: z.string().min(6)
})


export type TypeRegisterSchema = z.infer<typeof registerSchema>