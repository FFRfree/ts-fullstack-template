import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  nickName: z.string(),
  email: z.string().optional(),
  password: z.string(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
