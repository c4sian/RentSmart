import { z } from "zod";

export const registerSchema = z.object({
    email: z.email(),
    displayName: z.string().min(1),
    password: z.string().min(6)
});

export type RegisterSchema = z.infer<typeof registerSchema>;