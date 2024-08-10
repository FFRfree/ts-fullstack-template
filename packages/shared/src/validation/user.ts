import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  nickname: z.string(),
  email: z.string().optional(),
  password: z.string().min(6).max(16),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
